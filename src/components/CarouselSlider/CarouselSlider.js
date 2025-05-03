import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { BASE_URL, CAROUSEL_API } from "../../api/api"; 
import "./CarouselSlider.css";

const CarouselSlider = () => {
  const [slides, setSlides] = useState([]);


  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const res = await fetch(CAROUSEL_API.GET_ALL);
        const data = await res.json();
        if (data.statusCode === 200) {
          const formattedSlides = data.carousels.map((item) => ({
            // img: `${BASE_URL}${item.carousel_image}`,
            img: `${BASE_URL.replace(/\/$/, "")}/${item.carousel_image.replace(/^\//, "")}`,
            description: "Product Liability & Personal Injury",
            title: "The Greatest & Strongest Firm You Can Trust",
          }));
          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error("Failed to fetch carousel data:", error);
      }
    };

    fetchCarouselData();
  }, []);

  return (
    <Carousel fade controls={false} indicators={true} interval={4000} pause={false} className="carousel-slider">
      {slides.map((slide, i) => (
        <Carousel.Item key={i} className="carousel-item">
          <img src={slide.img} alt={`Slide ${i + 1}`} className="carousel-image" />
          <Carousel.Caption className="carousel-content">
            <p className="carousel-desc">{slide.description}</p>
            <h2 className="carousel-title">{slide.title}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselSlider;
