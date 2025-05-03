import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Table,
  Spinner,
  Modal,
} from "react-bootstrap";
import { BsCloudUpload } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BASE_URL, CASES_API } from "../../../api/api";
import { toast } from "react-toastify";
import "./AdminCases.css";

const AdminCases = () => {
  const [formData, setFormData] = useState({
    case_id: "",
    caseTitle: "",
    lawyerName: "",
    caseDescription: "",
    howIWorkDescription: "",
    analyzingCaseDescription: "",
    researchInvestigationDescription: "",
    courtSuccessDescription: "",
    caseCategory: "",
    image: null,
  });

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const imageInputRef = useRef(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(CASES_API.GET_ALL_CASES);
        const data = await response.json();

        if (data.statusCode === 200) {
          setCases(data.case);
        } else {
          toast.error("Failed to fetch cases");
        }
      } catch (error) {
        toast.error("Error fetching cases");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      case_id: "",
      caseTitle: "",
      lawyerName: "",
      caseDescription: "",
      howIWorkDescription: "",
      analyzingCaseDescription: "",
      researchInvestigationDescription: "",
      courtSuccessDescription: "",
      caseCategory: "",
      image: null,
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }

    setIsEditing(false);
  };

  const handleAddCase = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled in
    if (!formData.caseTitle || !formData.lawyerName || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("case_title", formData.caseTitle);
    formDataToSend.append("lawyer_name", formData.lawyerName);
    formDataToSend.append("case_description", formData.caseDescription);
    formDataToSend.append("work_description", formData.howIWorkDescription);
    formDataToSend.append(
      "analyzing_description",
      formData.analyzingCaseDescription
    );
    formDataToSend.append(
      "investigation_description",
      formData.researchInvestigationDescription
    );
    formDataToSend.append(
      "court_law_sucess_description",
      formData.courtSuccessDescription || ""
    ); // Use empty string if null
    formDataToSend.append("case_category", formData.caseCategory);
    formDataToSend.append("case_image", formData.image);

    // console.log("formDataToSend", formDataToSend);

    try {
      const response = await fetch(CASES_API.ADD_CASES, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.status === 200) {
        // toast.success("Case added successfully!");
        toast.success(data.message);

        setCases([...cases, data.case]);

        resetForm();
      } else {
        toast.error(data.message || "Failed to add case");
      }
    } catch (error) {
      toast.error("Error submitting case");
    }
  };

  const handleUpdateCase = async (e) => {
    e.preventDefault();

    if (!formData.case_id || !formData.caseTitle || !formData.lawyerName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("case_id", formData.case_id);
    formDataToSend.append("case_title", formData.caseTitle);
    formDataToSend.append("lawyer_name", formData.lawyerName);
    formDataToSend.append("case_description", formData.caseDescription);
    formDataToSend.append("work_description", formData.howIWorkDescription);
    formDataToSend.append(
      "analyzing_description",
      formData.analyzingCaseDescription
    );
    formDataToSend.append(
      "investigation_description",
      formData.researchInvestigationDescription
    );
    formDataToSend.append(
      "court_law_sucess_description",
      formData.courtSuccessDescription || ""
    );
    formDataToSend.append("case_category", formData.caseCategory);

    if (formData.image instanceof File) {
      formDataToSend.append("case_image", formData.image);
    }

    try {
      const response = await fetch(CASES_API.UPDATE_CASES, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();

      if (response.status === 200) {
        // toast.success("Case updated successfully!");
        toast.success(data.message);
        setCases((prev) =>
          prev.map((c) => (c.case_id === formData.case_id ? data.case : c))
        );
        resetForm();
      } else {
        toast.error(data.message || "Failed to update case");
      }
    } catch (error) {
      toast.error("Error updating case");
    }
  };

  const handleEdit = (caseId) => {
    const selected = cases.find((item) => item.case_id === caseId);
    if (selected) {
      setFormData({
        case_id: selected.case_id,
        caseTitle: selected.case_title,
        lawyerName: selected.lawyer_name,
        caseDescription: selected.case_description,
        howIWorkDescription: selected.work_description,
        analyzingCaseDescription: selected.analyzing_description,
        researchInvestigationDescription: selected.investigation_description,
        courtSuccessDescription: selected.court_law_sucess_description || "",
        caseCategory: selected.case_category,
        image: selected.case_image,
      });
      setIsEditing(true);
    }
  };

  const handleDelete = async (caseId) => {
    try {
      const response = await fetch(CASES_API.DELETE_CASES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ case_id: caseId }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setCases(cases.filter((item) => item.case_id !== caseId));
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to delete case");
      }
    } catch (error) {
      toast.error("Error deleting case");
    }
  };

  const toggleExpand = (caseId, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [caseId]: {
        ...prev[caseId],
        [field]: !prev[caseId]?.[field],
      },
    }));
  };

  return (
    <Container className="mt-1">
      <h2 className="mb-4 admin-carousel-heading">
        <span className="admin-heading-bg mb-4">Cases Management</span>
      </h2>
      <Form onSubmit={isEditing ? handleUpdateCase : handleAddCase}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="caseCategory">
              <Form.Label className="input-names-12">Case Category:</Form.Label>
              <Form.Select
                name="caseCategory"
                value={formData.caseCategory}
                onChange={handleChange}
                required
                className="cases-input-field"
              >
                <option value="">-- Select Case Category --</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Business Law">Business Law</option>
                <option value="Finance Law">Finance Law</option>
                <option value="Real Estate Law">Real Estate Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Labour Law">Labour Law</option>
                <option value="Personal Law">Personal Law</option>
                <option value="Drug Offence">Drug Offence</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="caseTitle">
              <Form.Label className="input-names-12">Case Title:</Form.Label>
              <Form.Control
                type="text"
                name="caseTitle"
                value={formData.caseTitle}
                onChange={handleChange}
                placeholder="Enter Case Title"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="image">
              <Form.Label className="input-names-12">
                Image <BsCloudUpload />
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                required={!isEditing}
                className="cases-input-field"
                ref={imageInputRef}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="lawyerName">
              <Form.Label className="input-names-12">Lawyer Name:</Form.Label>
              <Form.Control
                type="text"
                name="lawyerName"
                value={formData.lawyerName}
                onChange={handleChange}
                placeholder="Enter Lawyer Name"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="caseDescription">
              <Form.Label className="input-names-12">
                Case Description:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="caseDescription"
                value={formData.caseDescription}
                onChange={handleChange}
                placeholder="Enter case description"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="howIWorkDescription">
              <Form.Label className="input-names-12">
                How I Work Description:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="howIWorkDescription"
                value={formData.howIWorkDescription}
                onChange={handleChange}
                placeholder="Enter How I Work Description"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="analyzingCaseDescription">
              <Form.Label className="input-names-12">
                Analyzing Case Description:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="analyzingCaseDescription"
                value={formData.analyzingCaseDescription}
                onChange={handleChange}
                placeholder="Enter Analyzing Description"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="researchInvestigationDescription">
              <Form.Label className="input-names-12">
                Research & Investigation:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="researchInvestigationDescription"
                value={formData.researchInvestigationDescription}
                onChange={handleChange}
                placeholder="Enter Research & Investigation"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="courtSuccessDescription">
              <Form.Label className="input-names-12">
                Court Success Description:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="courtSuccessDescription"
                value={formData.courtSuccessDescription || ""}
                onChange={handleChange}
                placeholder="Enter Court Success"
                required
                className="cases-input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="success"
          type="submit"
          className="cases-update-button mb-3"
        >
          {isEditing ? "Update Case" : "Add Case"}
        </Button>
        {isEditing && (
          <Button
            variant="secondary"
            onClick={resetForm}
            className="cases-cancel-button mb-3 ms-2"
          >
            Cancel
          </Button>
        )}
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body>
          <h2 className="cases-delete-model-title">
            Are you sure you want to delete this case?
          </h2>
        </Modal.Body>
        <Modal.Footer className="cases-delete-model-buttons">
          <Button
            className="cases-yes-delete-model-button"
            onClick={() => {
              handleDelete(deleteId);
              setShowConfirm(false);
            }}
          >
            Yes, Delete
          </Button>
          <Button
            className="cases-cancel-delete-model-button"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ overflowX: "auto" }}>
        <Table bordered responsive className="cases-bordered mt-3">
          <thead>
            <tr className="text-center">
              <th>S.No</th>
              <th>Category</th>
              <th>Title</th>
              <th>Image</th>
              <th>Lawyer</th>
              <th>Description</th>
              <th>How I Work</th>
              <th>Analyzing</th>
              <th>Research</th>
              <th>Success</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center">
                  <Spinner animation="border" size="sm" /> Loading...
                </td>
              </tr>
            ) : (
              cases.map((caseItem, index) => (
                <tr key={caseItem.case_id}>
                  <td>{index + 1}</td>
                  <td>{caseItem.case_category}</td>
                  <td>{caseItem.case_title}</td>
                  <td>
                    {caseItem.case_image ? (
                      <img
                        src={`${BASE_URL}/${caseItem.case_image}`}
                        alt={caseItem.case_title}
                        className="case-item-img"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{caseItem.lawyer_name}</td>
                  <td>
                    <div
                      className={`description-content ${
                        expandedRows[caseItem.case_id]?.case_description
                          ? "expanded"
                          : "clamped"
                      }`}
                    >
                      {caseItem.case_description}
                    </div>
                    {caseItem.case_description.length > 50 && (
                      <button
                        className="description-toggle-btn"
                        onClick={() =>
                          toggleExpand(caseItem.case_id, "case_description")
                        }
                      >
                        {expandedRows[caseItem.case_id]?.case_description
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </td>
                  <td>
                    <div
                      className={`description-content ${
                        expandedRows[caseItem.case_id]?.work_description
                          ? "expanded"
                          : "clamped"
                      }`}
                    >
                      {caseItem.work_description}
                    </div>
                    {caseItem.work_description.length > 50 && (
                      <button
                        className="description-toggle-btn"
                        onClick={() =>
                          toggleExpand(caseItem.case_id, "work_description")
                        }
                      >
                        {expandedRows[caseItem.case_id]?.work_description
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </td>

                  <td>
                    <div
                      className={`description-content ${
                        expandedRows[caseItem.case_id]?.analyzing_description
                          ? "expanded"
                          : "clamped"
                      }`}
                    >
                      {caseItem.analyzing_description}
                    </div>
                    {caseItem.analyzing_description.length > 50 && (
                      <button
                        className="description-toggle-btn"
                        onClick={() =>
                          toggleExpand(
                            caseItem.case_id,
                            "analyzing_description"
                          )
                        }
                      >
                        {expandedRows[caseItem.case_id]?.analyzing_description
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </td>
                  <td>
                    <div
                      className={`description-content ${
                        expandedRows[caseItem.case_id]
                          ?.investigation_description
                          ? "expanded"
                          : "clamped"
                      }`}
                    >
                      {caseItem.investigation_description}
                    </div>
                    {caseItem.investigation_description.length > 50 && (
                      <button
                        className="description-toggle-btn"
                        onClick={() =>
                          toggleExpand(
                            caseItem.case_id,
                            "investigation_description"
                          )
                        }
                      >
                        {expandedRows[caseItem.case_id]
                          ?.investigation_description
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </td>
                  <td>
                    <div
                      className={`description-content ${
                        expandedRows[caseItem.case_id]
                          ?.court_law_sucess_description
                          ? "expanded"
                          : "clamped"
                      }`}
                    >
                      {caseItem.court_law_sucess_description}
                    </div>
                    {caseItem.court_law_sucess_description.length > 50 && (
                      <button
                        className="description-toggle-btn"
                        onClick={() =>
                          toggleExpand(
                            caseItem.case_id,
                            "court_law_sucess_description"
                          )
                        }
                      >
                        {expandedRows[caseItem.case_id]
                          ?.court_law_sucess_description
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </td>
                  <td className="d-flex mt-4">
                    <Button
                      size="sm"
                      className="edit-btn1 me-2"
                      onClick={() => handleEdit(caseItem.case_id)}
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      size="sm"
                      className="delete-btn1"
                      onClick={() => {
                        setDeleteId(caseItem.case_id);
                        setShowConfirm(true);
                      }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminCases;
