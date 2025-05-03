import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaQuoteRight } from "react-icons/fa";

import { ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";
import "./HomeReview.css";


import ReviewImg from "../../assets/review-pic.png";
import { toast } from "react-toastify";


const reviews = [
  {
    id: 1,
    name: "Ravi Kumar",
    profession: "Profession",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have",
    img: ReviewImg,
  },
  {
    id: 2,
    name: "Ibrahim",
    profession: "Profession",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have",
    img: ReviewImg,
  },
  {
    id: 3,
    name: "Harish",
    profession: "Profession",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have",
    img: ReviewImg,
  },
  {
    id: 4,
    name: "Sitharam",
    profession: "Profession",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have",
    img: ReviewImg,
  },
  {
    id: 5,
    name: "Rahul",
    profession: "Profession",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have",
    img: ReviewImg,
  },
];

const HomeReview = () => {
  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [ads, setAds] = useState([]);

  // Fetch ads using fetch()
  useEffect(() => {
    fetch(ADS_API.GET_ALL_ADS)
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads.slice(4, 5));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  // Responsive adjustments
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 991) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="homereview-container p-5">
      <h2 className="text-center mb-4 fw-bold">Review From Client</h2>
      <Row className="justify-content-center">
        {/* Review Section */}
        <Col lg={10} md={12}>
          <div className="homereview-slider">
            <div
              className="homereview-track"
              style={{
                transform: `translateX(-${index * (100 / slidesToShow)}%)`,
              }}
            >
              {reviews.concat(reviews.slice(0, slidesToShow - 1)).map(
                (
                  item,
                  idx // Duplicate items for infinite scroll
                ) => (
                  <div key={idx} className="homereview-slide">
                    <Card className="homereview-card">
                      <Card.Body>
                        <div className="homereview-user">
                          <img src={item.img} alt={item.name} />
                          <div>
                            <h5 className="homereview-name">{item.name}</h5>
                            <p className="homereview-profession">
                              {item.profession}
                            </p>
                          </div>
                          <FaQuoteRight className="homereview-quote" />
                        </div>
                        <p className="homereview-text">{item.text}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Dots Below Reviews */}
          <div className="homereview-dots">
            {reviews.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === index ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </Col>

        {/* Right Side Ad Banner */}
        <Col
          lg={2}
          md={3}
          sm={12}
          className="d-flex flex-column align-items-center"
        >
          {ads.map((ad) => (
            <AdBanner
              key={ad.ads_id}
              ad={ad}
              className="homereview-ad-img mb-4"
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeReview;
