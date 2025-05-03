import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Contact.css";

// Dummy Images
import LatestNewsPic from "../../assets/latestnewsincontact.png";
import CalendarHighCourt from "../../assets/calendar_highcourt.jpg";

const Contact = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      setDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(prevDate.getDate() + 1);
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
    <>
      {/* Banner Section */}
      <div className="contactpage-banner"></div>

      <Container fluid className="contactpage-container">
        <Row className="p-5">
          {/* Left Side: Contact Form & Get in Touch */}
          <Col lg={9} md={8} sm={12}>
            {/* Contact Form */}
            <div className="contactpage-form">
              <h3>Let's Talk About Your Business</h3>
              <Form>
                <Form.Group>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control type="email" placeholder="Email Id" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Subject" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Control as="textarea" rows={4} placeholder="Message" />
                </Form.Group>
                <Button className="contactpage-submit-btn">Send Message</Button>
              </Form>
            </div>

            {/* Get in Touch Section */}
            <div className="contactpage-getintouch mt-4">
              <h4>Get in Touch</h4>
              <p className="contactpage-getintouch-text">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum
              </p>
              <ul className="contactpage-details ">
                <li>📍 123 Street, Vijayawada, AP</li>
                <li>📞 +91-9999-44-2222</li>
                <li>📧 info@example.com</li>
              </ul>
            </div>
          </Col>

          {/* Right Side: Calendar & Latest News */}
          <Col lg={3} md={4} sm={12} className="contactpage-sidebar">
            {/* Calendar Section */}
            <div className="contactpage-calendar">
              <h4>High Court Calendar</h4>
              <div
                className="calendar-container"
                onClick={() => setShowModal(true)}
              >
                <Calendar value={date} className="custom-calendar" />
              </div>
            </div>

            {/* Latest News Section */}
            <div className="contactpage-news mt-4">
              <h4 className="mb-4">Latest News</h4>
              <div className="news-blogs mt-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="news-item d-flex align-items-start">
                  <div className="news-icon">
                    <img src={LatestNewsPic} alt="News Icon" />
                  </div>
                  <div className="news-content">
                    <p>
                    Even the all-powerful pointing has no control about the blind texts
                    </p>
                    <div className="news-meta">
                      <small>📅 Mar 11, 2025</small>
                      {/* <span className="news-comments">💬 10</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </Col>
        </Row>

        {/* Modal for Full Calendar Image */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Body className="text-center">
            <Button
              className="contactpage-close-btn"
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
    </>
  );
};

export default Contact;
