import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Image,
  Modal,
} from "react-bootstrap";
import { BASE_URL, CAROUSEL_API } from "../../../api/api";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AdminCarousel.css";

const AdminCarousel = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carouselIdToDelete, setCarouselIdToDelete] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image input
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      carousel_id: Math.random(),
      src: URL.createObjectURL(file),
      file: file, // <-- Keep this!
    }));
    setSelectedFiles(newImages);
  };

  // Remove selected preview
  const removeSelectedFile = (carousel_id) => {
    setSelectedFiles(
      selectedFiles.filter((file) => file.carousel_id !== carousel_id)
    );
  };

  // Add carousel images
  const addCarouselImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please fill the fields.");
      return;
    }

    const formData = new FormData();

    selectedFiles.forEach((fileObj) => {
      formData.append("carousel_image", fileObj.file);
    });

    try {
      const response = await fetch(CAROUSEL_API.ADD, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        const uploadedImage = {
          carousel_id: result.carousel.carousel_id,
          src: `${BASE_URL}/${result.carousel.carousel_image}`,
        };

        setImages([...images, uploadedImage]);
        toast.success(result.message);
        resetForm();
      } else {
        toast.error(`Upload failed:, ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const response = await fetch(CAROUSEL_API.GET_ALL);
      const result = await response.json();

      if (result.statusCode === 200) {
        const formattedImages = result.carousels.map((item) => ({
          carousel_id: item.carousel_id,
          src: `${BASE_URL}/${item.carousel_image}`,
        }));
        setImages(formattedImages);
      } else {
        toast.error(`fetch images:, ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const editCarouselImage = async () => {
    if (selectedFiles.length === 0 || !currentEditId) return;

    const formData = new FormData();
    formData.append("carousel_image", selectedFiles[0].file);
    formData.append("carousel_id", currentEditId);

    try {
      const response = await fetch(CAROUSEL_API.UPDATE, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        const updatedImage = {
          carousel_id: result.carousel.carousel_id,
          src: `${BASE_URL}/${result.carousel.carousel_image}`,
        };

        setImages(
          images.map((img) =>
            img.carousel_id === currentEditId ? updatedImage : img
          )
        );
        toast.success(result.message);
        resetForm();
      } else {
        toast.error(`Edit failed:, ${result.message}`);
      }
    } catch (error) {
      console.error("Error editing image:", error);
    }
  };

  const handleEdit = (carousel_id) => {
    const imageToEdit = images.find((img) => img.carousel_id === carousel_id);
    setSelectedFiles([{ carousel_id, src: imageToEdit.src }]);
    setEditMode(true);
    setCurrentEditId(carousel_id);
  };

  const confirmDelete = (carousel_id) => {
    setCarouselIdToDelete(carousel_id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(CAROUSEL_API.DELETE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carousel_id: carouselIdToDelete }),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        setImages(
          images.filter((img) => img.carousel_id !== carouselIdToDelete)
        );
        resetForm();
        toast.success(result.message);
      } else {
        toast.error(`Delete failed:, ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting carousel image:", error);
    } finally {
      setShowDeleteModal(false);
      setCarouselIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCarouselIdToDelete(null);
  };

  // Reset all inputs
  const resetForm = () => {
    setSelectedFiles([]);
    setEditMode(false);
    setCurrentEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 admin-carousel-heading">
        <span className="admin-heading-bg">Carousel Management</span>
      </h2>

      {/* File Upload */}
      <Row className="mb-3">
        <Col md={4}>
          <label htmlFor="carouselImages" className="carousel-label mb-2">
            Carousel Images:
          </label>
          <input
            id="carouselImages"
            type="file"
            className="form-control file-upload carousel-input-field"
            accept="image/*"
            multiple={!editMode}
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          <small className="text-muted mt-2 d-block">
            Note: You can upload up to <strong>5 banner images</strong> at a
            time. Each image should be <strong>300px × 300px</strong> for
            optimal display.
          </small>
        </Col>
        <Col md={6}>
          <Button
            className="carousel-button"
            onClick={editMode ? editCarouselImage : addCarouselImages}
          >
            {editMode ? "Update Carousel" : "Add Carousel"}
          </Button>
          {editMode && (
            <Button className="carousel-cancel-button ms-2" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Col>
      </Row>

      {/* Selected Preview */}
      {selectedFiles.length > 0 && (
        <Row className="mt-3">
          <Col>
            <h4 className="mb-3">
              Selected Image{selectedFiles.length > 1 ? "s" : ""}
            </h4>
            <div className="d-flex flex-wrap gap-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.carousel_id}
                  className="selected-file position-relative"
                >
                  <img
                    src={file.src}
                    alt="Selected"
                    className="selected-img-preview"
                  />
                  <button
                    className="selected-img-icon-remove"
                    onClick={() => removeSelectedFile(file.carousel_id)}
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* Images Table */}
      <Row className="mt-4">
        <Col>
          <div className="table-responsive">
            <Table bordered className="carousel-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {images.map((item, index) => (
                  <tr key={item.carousel_id} className="carousel-row">
                    <td className="pt-3 fw-bold">{index + 1}</td>
                    <td>
                      <Image
                        src={item.src}
                        alt="Uploaded"
                        thumbnail
                        className="carousel-table-img"
                      />
                    </td>
                    <td className="pt-3">
                      <FiEdit
                        className="admin-carousel-action-icon admin-carousel-edit-icon me-3"
                        onClick={() => handleEdit(item.carousel_id)}
                      />
                      <FaTrashAlt
                        className="admin-carousel-action-icon admin-carousel-delete-icon"
                        onClick={() => confirmDelete(item.carousel_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Body>
          <h2 className="carousel-delete-model">
            Are you sure you want to delete this category?
          </h2>
        </Modal.Body>
        <Modal.Footer className="carousel-delete-model-buttons">
          <Button
            className="carousel-yes-delete-model-button"
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
          <Button
            className="carousel-cancel-delete-model-button"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminCarousel;
