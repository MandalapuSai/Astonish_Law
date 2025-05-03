import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./AdminSideBar.css";
import logo from "../../../assets/admin-law.png";
import { toast } from "react-toastify";
import { FaUserShield, FaImages, FaBriefcase, FaPen, FaCalendarAlt, FaAddressBook, FaBullhorn } from 'react-icons/fa';

const AdminSideBar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(false);
    toast.success("Logged out successfully!!");
    navigate("/admin-login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container fluid className="admindashboard-container">
      <Row>
        {/* Sidebar */}
        <Col
          md={isSidebarOpen ? 3 : 0}
          lg={isSidebarOpen ? 2 : 0}
          className={`admindashboard-sidebar ${isSidebarOpen ? "open" : "closed"
            }`}
        >
          <h2 className="fw-bold p-1 dash-board-title mt-4">Astonish Laws</h2>
          <div className="sidebar-header">
            <div>
              {isSidebarOpen && (
                <img src={logo} alt="Admin Logo" className="sidebar-logo mb-3" />
              )}
            </div>
            <div>
              <h4 className="fw-bold text-center admin-name12">Ramesh</h4>
            </div>
          </div>
          {isSidebarOpen && (
            <FaTimes className="sidebar-close-icon" onClick={toggleSidebar} />
          )}
          {isSidebarOpen && (
            <ul className="sidebar-menu">

              <li>
                <Link
                  className="sidebar-menu-link"
                  to="/admin-side-bar/dashboard"
                >
                <div className="icon-container">
                  <FaUserShield size={23}/>
                  </div>
                  Dash Board
                </Link>
              </li>
              <li>
                <Link
                  className="sidebar-menu-link"
                  to="/admin-side-bar/carousel"
                >
                <div className="icon-container">
                  <FaImages size={23} />
                  </div>
                  Carousel
                </Link>
              </li>
              <li>
                <Link className="sidebar-menu-link" to="/admin-side-bar/cases">
                <div className="icon-container">
                  <FaBriefcase size={23} />
                  </div>
                  Cases
                </Link>
              </li>
              <li>
                <Link className="sidebar-menu-link" to="/admin-side-bar/blog">
                <div className="icon-container">
                  <FaPen size={23} />
                  </div>
                  Blog
                </Link>
              </li>
              <li>
                <Link className="sidebar-menu-link" to="/admin-side-bar/event">
                <div className="icon-container">
                  <FaCalendarAlt size={23} />
                  </div>
                  Event
                </Link>
              </li>
              <li>
                <Link
                  className="sidebar-menu-link"
                  to="/admin-side-bar/contact"
                >
                <div className="icon-container">
                  <FaAddressBook size={23}/>
                  </div>
                  Contact
                </Link>
              </li>
              <li>
                <Link className="sidebar-menu-link" to="/admin-side-bar/ads">
                <div className="icon-container">
                  <FaBullhorn size={23} />
                  </div>
                  Ads
                </Link>
              </li>
              {/* <li>
                <Link className="sidebar-menu-link" to="">
                  <div className="icon-container">
                    <FaUser size={23} />
                  </div>
                  Profile
                </Link>
              </li> */}
            </ul>
          )}
          {isSidebarOpen && (
            <div className="logout-button">
              <Button onClick={() => setShowLogoutModal(true)} className="logout-button1">
                <FaSignOutAlt /> Logout
              </Button>
            </div>
          )}
        </Col>

        {/* Main Content */}
        <Col
          md={isSidebarOpen ? 9 : 12}
          lg={isSidebarOpen ? 10 : 12}
          className="admindashboard-content"
        >
          {!isSidebarOpen && (
            <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
          )}

          {/* Show child routes */}
          <Outlet />
        </Col>
      </Row>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Body>
          <h2
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
            className="mt-3"
          >
            Do you want to Logout ?
          </h2>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0px",
            border: "none",
          }}
        >
          <Button
            style={{ backgroundColor: "#ED1D1D", border: "none" }}
            onClick={handleLogout}
          >
            Yes,Logout
          </Button>
          <Button
            style={{ backgroundColor: "#304D30", border: "none" }}
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminSideBar;