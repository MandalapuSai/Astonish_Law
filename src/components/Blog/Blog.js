import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { toast } from "react-toastify";
import { ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";

import blogimg1 from "../../assets/card-blog-1.png";
import blogimg2 from "../../assets/card-blog-2.png";
import blogimg3 from "../../assets/card-blog-3.png";
import blogimg4 from "../../assets/card-blog-4.png";
import blogimg5 from "../../assets/card-blog-5.png";
import blogimg6 from "../../assets/card-blog-6.png";

import CalendarHighCourt from "../../assets/calendar_highcourt.jpg";

import "./Blog.css";

const Blog = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();


  // Fetch ads using fetch()
  useEffect(() => {
    fetch(ADS_API.GET_ALL_ADS)
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads.slice(3, 4));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  const cardsData = [
    {
      id: 1,
      image: blogimg1,
      title: "Legal Insights",
      content:
        "Stay updated with the latest legal trends, case studies, and expert opinions to navigate the complexities of the law with confidence. Our in-depth articles cover key legal developments, policy changes, and landmark rulings that impact individuals and businesses alike. Whether you're a legal professional or someone seeking clarity on legal matters, our insights will help you stay informed and empowered.",
    },
    {
      id: 2,
      image: blogimg2,
      title: "Client Rights",
      content:
        "Understand your legal rights and how to protect them in various situations, from contracts to disputes and beyond. Knowing your rights is the first step toward safeguarding your interests, whether in employment, consumer protection, property matters, or legal agreements. Our expert-driven content provides clarity on legal frameworks, practical steps to handle disputes, and ways to ensure fair treatment law.",
    },
    {
      id: 3,
      image: blogimg3,
      title: "Business Law Guide",
      content:
        "Helping businesses stay legally compliant with expert tips on contracts, regulations, and corporate legal strategies. From company formation to contract negotiations and regulatory compliance, our insights provide entrepreneurs and businesses with the knowledge they need to operate smoothly within the legal framework. Stay ahead of legal challenges, mitigate risks, and ensure your business thrives legal guidance.",
    },
    {
      id: 4,
      image: blogimg4,
      title: "Courtroom Strategies",
      content:
        "Explore key courtroom tactics, legal precedents, and litigation insights that shape the justice system. Whether you're a legal professional or an individual involved in a case, understanding trial strategies, evidentiary rules, and successful argument techniques can make a significant difference. Learn from real cases, expert analyses, and time-tested litigation approaches to strengthen your legal knowledge.",
    },
    {
      id: 5,
      image: blogimg5,
      title: "Law & Everyday Life",
      content:
        "Practical legal advice for everyday issues, from property disputes to consumer rights and family law matters. Legal challenges can arise in daily life, whether dealing with rental agreements, workplace issues, or personal disputes. Our expert insights help you understand your rights, navigate legal procedures, and make informed decisions to protect yourself and your loved ones. Stay legally aware in every aspect of life!",
    },
    {
      id: 6,
      image: blogimg6,
      title: "Expert Opinions",
      content:
        "Get insights from experienced legal professionals on emerging laws, landmark cases, and justice reforms. Stay informed with in-depth analyses from legal experts who break down complex legal matters into clear, actionable insights. From policy changes to groundbreaking court decisions, our expert opinions help you understand the evolving legal landscape and its impact on individuals, businesses, and society.",
    },
  ];

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
    <Container fluid className="p-0 overflow-hidden">
      {/* Banner Section */}
      <Row className="justify-content-center">
        <div className="blog-banner">
          {/* <h2 className="blog-banner-title">Blog</h2> */}
        </div>
      </Row>

      {/* First Row: Side Image + 3 Cards */}
      <Row className="align-items-start px-5">
        <Col lg={9} md={12}>
          <Row>
            {cardsData.map((card, index) => (
              <Col lg={4} md={6} sm={12} key={index} className="mb-3">
                <Card className="card-data-section h-100 text-center">
                  <Card.Img variant="top" src={card.image} />
                  <Card.Body className="card-section">
                    <Card.Title className="card-title-section">
                      {card.title}
                    </Card.Title>
                    <Card.Text className="blog-cart-content">
                      {card.content}
                    </Card.Text>
                    <Button
                      variant="dark"
                      className="blog-button"
                      onClick={() => {
                        // console.log(`Navigating to /blog/${encodeURIComponent(card.title)}/${card.id}`);
                        navigate(
                          `/blog/${encodeURIComponent(card.title)}/${card.id}`
                        );
                      }}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col lg={3} md={12} className="text-center mb-3">
          <h3 className="homepageabout-calendar-title text-center w-100 mb-0">
            High Court Calendar
          </h3>
          <div
            className="homepageabout-calendar-container w-100 mb-4 p-3 "
            onClick={() => setShowModal(true)}
          >
            <Calendar value={date} className="custom-calendar" />
          </div>
          <div className="mt-4">
            {ads.map((ad) => (
              <AdBanner key={ad.ads_id} ad={ad} className="homeblog-ad-img" />
            ))}
          </div>
        </Col>
      </Row>

      {/* Modal for Full Calendar Image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Button
            className="blog-highcourt-close-btn"
            onClick={() => setShowModal(false)}
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

export default Blog;
