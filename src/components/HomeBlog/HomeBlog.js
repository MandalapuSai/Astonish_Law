import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import { ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";
import "./HomeBlog.css";

import BlogImg1 from "../../assets/home-blog-1.png";
import BlogImg2 from "../../assets/home-blog-2.png";
import BlogImg3 from "../../assets/home-blog-3.png";

const blogPosts = [
  {
    id: 1,
    title: "Blog Title",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum....",
    img: BlogImg1,
  },
  {
    id: 2,
    title: "Blog Title",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum....",
    img: BlogImg2,
  },
  {
    id: 3,
    title: "Blog Title",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum....",
    img: BlogImg3,
  },
  {
    id: 4,
    title: "Blog Title",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum....",
    img: BlogImg1,
  },
  {
    id: 5,
    title: "Blog Title",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum....",
    img: BlogImg2,
  },
  {
    id: 6,
    title: "Blog Title",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum....",
    img: BlogImg3,
  },
];

const HomeBlog = () => {
  const [index, setIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [ads, setAds] = useState([]);

  // Fetch ads using fetch()
  useEffect(() => {
    fetch(ADS_API.GET_ALL_ADS)
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads.slice(6, 7));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  // Function to update visible slides based on screen width
  const updateSlides = useCallback(() => {
    if (window.innerWidth <= 768) {
      setVisibleSlides(1);
    } else if (window.innerWidth <= 1024) {
      setVisibleSlides(2);
    } else {
      setVisibleSlides(3);
    }
  }, []);

  // Automatically change slides every 4 seconds
  useEffect(() => {
    const nextSlide = () => {
      setIndex((prevIndex) =>
        prevIndex === blogPosts.length - visibleSlides ? 0 : prevIndex + 1
      );
    };

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [visibleSlides]);

  // Update slides when resizing window
  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [updateSlides]);

  return (
    <Container fluid className="homeblog-container p-5">
      <h2 className="text-center fw-bold mb-4">Latest Blogs</h2>
      <Row className="justify-content-center align-items-start">
        <Col lg={10} md={12}>
          <div className="homeblog-slider">
            <div
              className="homeblog-track"
              style={{
                transform: `translateX(-${index * (100 / visibleSlides)}%)`,
              }}
            >
              {blogPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="homeblog-slide"
                  style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                >
                  <Card className="homeblog-card">
                    <Card.Img
                      variant="top"
                      src={post.img}
                      className="homeblog-img"
                    />
                    <Card.Body>
                      <Card.Title className="homeblog-title">
                        {post.title}
                      </Card.Title>
                      <Card.Text className="homeblog-text">
                        {post.text}
                      </Card.Text>
                      <Button variant="dark" className="homepageBlog-button">
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="homeblog-dots">
            {Array.from({ length: blogPosts.length - visibleSlides + 1 }).map(
              (_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === index ? "active" : ""}`}
                ></span>
              )
            )}
          </div>
        </Col>

        {/* Right Side Ad Banner */}
        <Col lg={2} md={3} sm={12} className="d-flex justify-content-center">
          {ads.map((ad) => (
            <AdBanner key={ad.ads_id} ad={ad} className="homeblog-ad-img" />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBlog;
