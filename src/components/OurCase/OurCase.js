import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { CASES_API } from "../../api/api";
import "./OurCase.css";

import LatestNewsPic from "../../assets/latest_news_cases_1.png";
import OurCasesPic from "../../assets/case_down_banner.png";
import iconGun from "../../assets/icon_gun.png";
import familyLaw from "../../assets/icon_family.png";
import businessLaw from "../../assets/icon_business.png";
import financeLaw from "../../assets/icon_finance.png";
import realEstateLaw from "../../assets/icon_real_estate.png";
import propertyLaw from "../../assets/icon_property.png";
import labourLaw from "../../assets/icon_labour.png";
import personalLaw from "../../assets/icon_personal.png";
import drugOffence from "../../assets/icon_drug.png";

import CalendarHighCourt from "../../assets/calendar_highcourt.jpg";
import { toast } from "react-toastify";

const OurCase = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
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

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(
          CASES_API.GET_ALL_CASES
        );
        const data = await response.json();
        setCases(data.case);
      } catch (error) {
        toast.error("Error fetching cases: " + error.message);
      }
    };

    fetchCases();
  }, []);

  const caseCategories = [
    { title: "Criminal Law", image: iconGun },
    { title: "Family Law", image: familyLaw },
    { title: "Business Law", image: businessLaw },
    { title: "Finance Law", image: financeLaw },
    { title: "Real estate Law", image: realEstateLaw },
    { title: "Property Law", image: propertyLaw },
    { title: "Labour Law", image: labourLaw },
    { title: "Personal Law", image: personalLaw },
    { title: "Drug Offence", image: drugOffence },
  ];

  const handleCardClick = (title) => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/our-case-details/${formattedTitle}`);
  };

  return (
    <Container fluid className="ourcasesection-wrapper p-0">
      <div className="ourcasesection-banner"></div>
      <Row className="p-5">
        {/* Left Side - Case Categories & Banner (9 grids) */}
        <Col lg={9} md={12}>
          <Row>
            {cases.map((item, index) => {
              // Find the matching icon for the case category
              const category = caseCategories.find(
                (cat) => cat.title.toLowerCase() === item.case_category.toLowerCase()
              );

              return (
                <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                  <Card
                    className="ourcasesection-card text-center"
                    onClick={() => handleCardClick(item.case_category)}
                  >
                    <Card.Body>
                      {category && (
                        <img
                          src={category.image}
                          alt={item.case_category}
                          className="case-icon img-fluid"
                        />
                      )}
                      <Card.Title className="ourcasesection_title_1">
                        {item.case_category}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Banner Image Below Case Categories */}
          <div className="ourcasesection-down-banner">
            <img src={OurCasesPic} alt="Banner Section" className="img-fluid" />
          </div>
        </Col>

        {/* Right Side - Latest News & Calendar (3 grids) */}
        <Col lg={3} md={12} className="text-center mb-3">
          <h3 className="homepageabout-calendar-title w-100 mb-0">
            High Court Calendar
          </h3>
          <div
            onClick={() => setShowModal(true)}
            className="homepageabout-calendar-container w-100 mb-4 p-3"
          >
            <Calendar value={date} className="custom-calendar" />
          </div>

          <Card className="border-0">
            <h4 className="text-start">Latest News</h4>
            <div className="ourcasesection-news mt-3">
              {[1, 2, 3].map((news, index) => (
                <div key={index} className="news-item d-flex align-items-start">
                  <div className="news-icon">
                    <img src={LatestNewsPic} alt="News Icon" />
                  </div>
                  <div className="news-content">
                    <p>
                      Even the all-powerful pointing has no control about the
                      blind texts
                    </p>
                    <div className="news-meta">
                      <small>📅 Mar 11, 2025</small>
                      {/* <span className="news-comments ms-3">💬 10</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal for Calendar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Button
            onClick={() => setShowModal(false)}
            className="our-case-highcourt-close-btn"
            aria-label="Close calendar modal"
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

export default OurCase;
