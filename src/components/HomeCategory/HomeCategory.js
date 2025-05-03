import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaBriefcase,
  FaMoneyBill,
  FaGavel,
  FaBuilding,
  FaHardHat,
  FaUsers,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";
import "./HomeCategory.css";

import categorypic1 from "../../assets/category-1.png";
import categorypic2 from "../../assets/category-2.png";
import categorypic3 from "../../assets/category-3.png";
import categorypic4 from "../../assets/category-4.png";
import categorypic5 from "../../assets/category-5.png";
import categorypic6 from "../../assets/category-6.png";

const categories = [
  { id: 1, title: "Family Cases", icon: <FaUsers />, img: categorypic1 },
  { id: 2, title: "Business Cases", icon: <FaBriefcase />, img: categorypic2 },
  { id: 3, title: "Finance Cases", icon: <FaMoneyBill />, img: categorypic3 },
  { id: 4, title: "Criminal Cases", icon: <FaGavel />, img: categorypic4 },
  {
    id: 5,
    title: "Real Estate Cases",
    icon: <FaBuilding />,
    img: categorypic5,
  },
  { id: 6, title: "Labour Cases", icon: <FaHardHat />, img: categorypic6 },
];

const HomeCategory = () => {
  const [ads, setAds] = useState([]);

  // Fetch ads using fetch()
  useEffect(() => {
    fetch(ADS_API.GET_ALL_ADS)
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads.slice(0, 1));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  return (
    <Container fluid className="category-container p-5">
      <h2 className="text-center fw-bold mb-5">Category Of Cases</h2>
      <Row className="align-items-start">
        {/* Category Cards (10-column) */}
        <Col lg={10}>
          <Row>
            {categories.map((category) => (
              <Col
                key={category.id}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="category-col"
              >
                <Card className="category-card">
                  <div className="category-image">
                    <Card.Img
                      variant="top"
                      src={category.img}
                      alt={category.title}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <div className="category-icon">{category.icon}</div>
                    <Card.Title>{category.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Ad Section (2-column) */}
        <Col lg={2} className="ads-section">
          <div className="ad-box">
            {ads.map((ad) => (
              <AdBanner key={ad.ads_id} ad={ad} className="ad-logo" />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeCategory;
