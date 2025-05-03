import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "./HomeAboutSection.css";

import CalendarHighCourt from "../../assets/calendar_highcourt.jpg";

const HomeAboutSection = ({
  title,
  content = [],
  buttonText,
  showButton = true,
  image,
}) => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      setDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(prevDate.getDate() + 1);

        if (newDate.getMonth() !== prevDate.getMonth()) {
          newDate.setDate(1);
        }
        return newDate;
      });
    };

    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) -
      now;

    const timeout = setTimeout(() => {
      updateDate();
      setInterval(updateDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container fluid className="homepageabout-section">
      <Row className="homepageabout-row">
        {/* Image Section */}
        <Col lg={4} md={12} className="homepageabout-image">
          <img src={image} alt="About Us" className="img-fluid" />
        </Col>

        {/* Content Section */}
        <Col
          lg={5}
          md={12}
          className="homepageabout-content d-flex justify-content-center"
        >
          <h2 className="homepageabout-title fw-bold">{title}</h2>
          {content.length > 0 ? (
            content.map((para, index) => (
              <p key={index} className="homepageabout-text">
                {para}
              </p>
            ))
          ) : (
            <p>No content available.</p> // Fallback
          )}
          {showButton && (
            <Link to="/about-us">
              <Button className="homepageabout-button">{buttonText}</Button>
            </Link>
          )}
        </Col>

        {/* Calendar Section */}
        <Col lg={3} md={12} className="homepageabout-calendar">
          <h3 className="homepageabout-calendar-title">High Court Calendar</h3>
          <div
            className="homepageabout-calendar-container"
            onClick={() => setShowModal(true)}
          >
            <Calendar value={date} className="custom-calendar" />
          </div>
        </Col>
      </Row>

      {/* Modal for Full Calendar Image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Button
            className="homepageabout-close-btn"
            onClick={() => setShowModal(false)}
          >
            <FaTimes size={16} color="#000" />
          </Button>
          <img
            src={CalendarHighCourt}
            alt="Holiday Calendar"
            className="img-fluid"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HomeAboutSection;
