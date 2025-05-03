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
import { BASE_URL, ADS_API } from "../../../api/api";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AdminAds.css"; // <-- Custom styling file

const AdminAds = () => {
  const [ads, setAds] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adIdToDelete, setAdIdToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      ads_id: Math.random(),
      src: URL.createObjectURL(file),
      file: file,
    }));
    setSelectedFiles(newImages);
  };

  const removeSelectedFile = (ads_id) => {
    setSelectedFiles(selectedFiles.filter((file) => file.ads_id !== ads_id));
  };

  const addAdImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select ad images.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((fileObj) => {
      formData.append("ads_image", fileObj.file);
    });

    try {
      const response = await fetch(ADS_API.ADD_ADS, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        const uploadedAd = {
          ads_id: result.ads.ads_id,
          src: `${BASE_URL}/${result.ads.ads_image}`,
        };
        setAds([...ads, uploadedAd]);
        toast.success(result.message);
        resetForm();
      } else {
        toast.error(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading ad image:", error);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await fetch(ADS_API.GET_ALL_ADS);
      const result = await response.json();

      if (result.statusCode === 200) {
        const formattedAds = result.ads.map((item) => ({
          ads_id: item.ads_id,
          src: `${BASE_URL}/${item.ads_image}`,
        }));
        setAds(formattedAds);
      } else {
        toast.error(`Failed to fetch ads: ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error("Something went wrong while fetching ads.");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const editAdImage = async () => {
    if (selectedFiles.length === 0 || !currentEditId) return;

    const formData = new FormData();
    formData.append("ads_image", selectedFiles[0].file);
    formData.append("ads_id", currentEditId);

    try {
      const response = await fetch(ADS_API.UPDATE_ADS, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        const updatedAd = {
          ads_id: result.ads.ads_id,
          src: `${BASE_URL}/${result.ads.ads_image}`,
        };

        setAds(
          ads.map((img) => (img.ads_id === currentEditId ? updatedAd : img))
        );
        toast.success(result.message);
        resetForm();
      } else {
        toast.error(`Update failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating ad:", error);
      toast.error("Something went wrong during update.");
    }
  };

  const handleEdit = (ads_id) => {
    const adToEdit = ads.find((img) => img.ads_id === ads_id);
    setSelectedFiles([{ ads_id, src: adToEdit.src }]);
    setEditMode(true);
    setCurrentEditId(ads_id);
  };

  const confirmDelete = (ads_id) => {
    setAdIdToDelete(ads_id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(ADS_API.DELETE_ADS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ads_id: adIdToDelete }),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        setAds(ads.filter((img) => img.ads_id !== adIdToDelete));
        resetForm();
        toast.success(result.message);
      } else {
        toast.error(`Delete failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Something went wrong during deletion.");
    } finally {
      setShowDeleteModal(false);
      setAdIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAdIdToDelete(null);
  };

  const resetForm = () => {
    setSelectedFiles([]);
    setEditMode(false);
    setCurrentEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 admin-ads-heading">
        <span className="admin-ads-title-bg">Ad Management</span>
      </h2>

      <Row className="mb-3">
        <Col md={4}>
          <label htmlFor="adImages" className="ads-label mb-2">
            Ad Images:
          </label>
          <input
            id="adImages"
            type="file"
            className="form-control ads-input"
            accept="image/*"
            multiple={!editMode}
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          <small className="text-muted mt-2 d-block">
            Upload up to <strong>5 ads</strong>. Size should be optimal for
            display.
          </small>
        </Col>
        <Col md={6}>
          <Button
            className="ads-button"
            onClick={editMode ? editAdImage : addAdImages}
          >
            {editMode ? "Update Ad" : "Add Ad"}
          </Button>
          {editMode && (
            <Button className="ads-cancel-button ms-2" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Col>
      </Row>

      {selectedFiles.length > 0 && (
        <Row className="mt-3">
          <Col>
            <h4 className="mb-3">
              Selected Ad{selectedFiles.length > 1 ? "s" : ""}
            </h4>
            <div className="d-flex flex-wrap gap-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.ads_id}
                  className="ads-selected-file position-relative"
                >
                  <img
                    src={file.src}
                    alt="Selected"
                    className="ads-preview-img"
                  />
                  <button
                    className="ads-preview-remove-icon"
                    onClick={() => removeSelectedFile(file.ads_id)}
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        <Col>
          <div className="table-responsive">
            <Table bordered className="ads-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Ad Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((item, index) => (
                  <tr key={item.ads_id} className="ads-row">
                    <td className="pt-3 fw-bold">{index + 1}</td>
                    <td>
                      <Image
                        src={item.src}
                        alt="Ad"
                        thumbnail
                        className="ads-img"
                      />
                    </td>
                    <td className="pt-3">
                      <FiEdit
                        className="ads-edit-icon me-3"
                        onClick={() => handleEdit(item.ads_id)}
                      />
                      <FaTrashAlt
                        className="ads-delete-icon"
                        onClick={() => confirmDelete(item.ads_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Body>
          <h2 className="ads-delete-title">
            Are you sure you want to delete this ad?
          </h2>
        </Modal.Body>
        <Modal.Footer className="ads-delete-footer">
          <Button className="ads-confirm-delete-btn" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button
            className="ads-cancel-delete-btn"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminAds;
