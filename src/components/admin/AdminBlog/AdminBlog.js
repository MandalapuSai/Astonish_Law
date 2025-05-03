import React, { useState } from 'react';
import { Button, Form, Table, Row, Col, Container, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { BsCloudUpload } from 'react-icons/bs';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

import './AdminBlog.css';

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    blogTitle: '',
    case_title: '',
    blogContent: '',
    blogImage: null,
  });

  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShow = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter(blog => blog.id !== selectedId));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, blogImage: URL.createObjectURL(e.target.files[0]) });
  };

  // const handleEditorChange = (content) => {
  //   setFormData({ ...formData, blogContent: content });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: isEditing ? editId : Date.now(),
      blog_title: formData.blogTitle,
      case_title: formData.case_title,
      blog_content: formData.blogContent,
      blog_image: formData.blogImage,
    };

    if (isEditing) {
      setBlogs(blogs.map(blog => blog.id === editId ? newBlog : blog));
      setIsEditing(false);
    } else {
      setBlogs([...blogs, newBlog]);
    }

    setFormData({
      blogTitle: '',
      case_title: '',
      blogContent: '',
      blogImage: null,
    });
  };

  const handleEdit = (id) => {
    const blogToEdit = blogs.find(blog => blog.id === id);
    if (blogToEdit) {
      setFormData({
        blogTitle: blogToEdit.blog_title,
        case_title: blogToEdit.case_title,
        blogContent: blogToEdit.blog_content,
        blogImage: blogToEdit.blog_image,
      });
      setEditId(id);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      blogTitle: '',
      case_title: '',
      blogContent: '',
      blogImage: null,
    });
  };

  return (
    <div className="admin-blogpage-wrapper">
      <h2 className="mb-4 admin-carousel-heading">
        <span className="admin-heading-bg mb-4">Blog Management</span>
      </h2>
      <Container className="p-0 mb-4 admin-blogpage-card">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label className="input-names-12">Case Title</Form.Label>
              <Form.Select
                name="case_title"
                value={formData.case_title}
                onChange={handleChange}
                required
                className="blogs-input-field">
                <option value="">Select a case title</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Treatment">Family Law</option>
                <option value="Family Law">Business Law</option>
                <option value="Finance Law">Finance Law</option>
                <option value="Realstate Law">Realstate Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Labour Law">Labour Law</option>
                <option value="Personal Law">Personal Law</option>
                <option value="Drug Offence Law">Drug Offence Law</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="input-names-12">Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  name="blogTitle"
                  value={formData.blogTitle}
                  onChange={handleChange}
                  placeholder="Enter blog Title"
                  required
                  className="blogs-input-field"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="admin-blogpage-title">Image <BsCloudUpload /></Form.Label>
                <Form.Control
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChange}
                  required={!isEditing}
                  className="blogs-input-field"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label className="admin-blogpage-title">Blog Description</Form.Label>
            {/* <ReactQuill
              theme="snow"
              value={formData.blogContent}
              onChange={handleEditorChange}
              placeholder="Write blog content here..."
            /> */}
          </Form.Group>

          <Button variant="success" type="submit" className="carousel-update-button mb-4 mt-4">
            {isEditing ? 'Update Blog' : 'Add Blog'}
          </Button>
          {isEditing && (
            <Button variant="secondary" onClick={handleCancel} className="carousel-cancel-button mb-4 mt-4 ms-2">
              Cancel
            </Button>
          )}
        </Form>
      </Container>

      <div style={{ overflowX: 'auto' }}>
        <Table bordered responsive className="admin-blogpage-table">
          <thead>
            <tr className="text-center">
              <th>S.No</th>
              <th>Title</th>
              <th>Image</th>
              <th>Blog Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>{blog.blog_title}</td>
                <td>
                  {blog.blog_image ? (
                    <img src={blog.blog_image} alt="Blog" width="80" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.blog_content }}
                    style={{ maxHeight: '150px', overflow: 'auto' }}
                  />
                </td>
                <td className="d-flex gap-2">
                  <Button variant="info" size="sm" onClick={() => handleEdit(blog.id)}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleShow(blog.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBlog;