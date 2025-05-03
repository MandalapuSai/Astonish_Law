import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { CONTACT_API } from "../../../api/api";
import "./AdminContact.css";
import { toast } from "react-toastify";

const AdminContactPage = () => {
  const [contact, setContact] = useState({ phone: "", email: "", address: "" });
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDeleteIndex, setContactToDeleteIndex] = useState(null);


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(CONTACT_API.GET_ALL_CONTACT);
        const data = await response.json();
  
        if (data.statusCode === 200) {
          const formatted = data.contact.map((item) => ({
            contact_id: item.contact_id,
            email: item.email,
            phone: item.ph_number,
            address: item.address,
          }));
          setContacts(formatted);
        } else {
          toast.error("Failed to fetch contacts:", data.message);
        }
      } catch (error) {
        toast.error("Error fetching contacts:", error);
      }
    };
  
    fetchContacts();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setContact({ phone: "", email: "", address: "" });
    setEditIndex(null);
  };

  const isFormValid = () =>
    contact.phone.trim() && contact.email.trim() && contact.address.trim();

  const handleAddContact = async () => {
    if (!isFormValid()) return;

    try {
      const response = await fetch(CONTACT_API.ADD_CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: contact.email,
          ph_number: contact.phone,
          address: contact.address,
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        const newContact = {
          email: data.contact.email,
          phone: data.contact.ph_number,
          address: data.contact.address,
          contact_id: data.contact.contact_id,
        };
        setContacts((prev) => [...prev, newContact]);
        resetForm();
        toast.success(data.message);
      } else {
        toast.error("Failed to add contact: " + data.message);
      }
    } catch (error) {
      toast.error("Error adding contact:", error);
      toast.error("Error adding contact.");
    }
  };


   //  Edit: Fill form with existing data
  const handleEdit = (index) => {
    setContact(contacts[index]);
    setEditIndex(index);
  };

  const handleUpdateContact = async () => {
    if (!isFormValid() || editIndex === null) return;
  
    try {
      const response = await fetch(CONTACT_API.UPDATE_CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_id: contact.contact_id,
          email: contact.email,
          ph_number: contact.phone,
          address: contact.address,
        }),
      });
  
      const data = await response.json();
  
      if (data.statusCode === 200) {
        const updated = {
          contact_id: data.contact.contact_id,
          email: data.contact.email,
          phone: data.contact.ph_number,
          address: data.contact.address,
        };
  
        const updatedContacts = [...contacts];
        updatedContacts[editIndex] = updated;
  
        setContacts(updatedContacts);
        toast.success(data.message);
        resetForm();
      } else {
        toast.error("Failed to update contact: " + data.message);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Error updating contact.");
    }
  };
  

    // Delete: With confirmation + API
  const confirmDelete = (index) => {
    setContactToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    const contactToDelete = contacts[contactToDeleteIndex];
    if (!contactToDelete) return;

    try {
      const response = await fetch(CONTACT_API.DELETE_CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact_id: contactToDelete.contact_id }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        setContacts((prev) =>
          prev.filter((c) => c.contact_id !== contactToDelete.contact_id)
        );
        toast.success(data.message);
      } else {
        toast.error("Failed to delete contact: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact.");
    }

    if (editIndex === contactToDeleteIndex) resetForm();
    setShowDeleteModal(false);
    setContactToDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setContactToDeleteIndex(null);
  };

  return (
    <Container className="admin-contact-container mt-4">
      <h2 className="mb-4 admin-contact-heading">
        <span className="admin-contact-title-bg">Contact</span>
      </h2>

      <Form className="contact-form mb-4 w-75">
        <Row>
          <Col md={4}>
            <Form.Group className="form-group-phone mb-3">
              <Form.Label className="contact-label mb-2">
                Phone Number:
              </Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                className="form-control-phone"
                placeholder="Enter phone number"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="form-group-email mb-3">
              <Form.Label className="contact-label mb-2">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                className="form-control-email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="form-group-address mb-3">
              <Form.Label className="contact-label mb-2">Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={contact.address}
                onChange={handleChange}
                className="form-control-address"
                placeholder="Enter address"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center gap-2">
          <Button
            onClick={
              editIndex !== null ? handleUpdateContact : handleAddContact
            }
            className="add-contact-button"
            variant={editIndex !== null ? "warning" : "primary"}
            disabled={!isFormValid()}
          >
            {editIndex !== null ? "Update Contact" : "Add Contact"}
          </Button>

          {editIndex !== null && (
            <Button className="update-cancel-contact" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </Form>

      <Table bordered className="contact-table">
        <thead>
          <tr>
            <th className="table-header-phone">Phone</th>
            <th className="table-header-email">Email</th>
            <th className="table-header-address">Address</th>
            <th className="table-header-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No contacts added yet.
              </td>
            </tr>
          ) : (
            contacts.map((c, index) => (
              <tr key={c.contact_id || index} className="contact-row">
                <td className="contact-phone">{c.phone}</td>
                <td className="contact-email">{c.email}</td>
                <td className="contact-address">{c.address}</td>
                <td className="contact-actions">
                  <FiEdit
                    onClick={() => handleEdit(index)}
                    className="contact-edit-icon me-2"
                  />

                  <FaTrashAlt
                    onClick={() => confirmDelete(index)}
                    className="contact-delete-icon"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Body>
          <h2 className="contact-delete-title">
            Are you sure you want to delete this contact?
          </h2>
        </Modal.Body>
        <Modal.Footer className="contact-delete-footer">
          <Button
            className="contact-confirm-delete-btn"
            onClick={handleDeleteConfirmed}
          >
            Yes, Delete
          </Button>
          <Button
            className="contact-cancel-delete-btn"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminContactPage;
