import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { BASE_URL, EVENT_API, ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";
import { toast } from "react-toastify";

import CalendarHighCourt from "../../assets/calendar_highcourt.jpg";
import recentBlog from "../../assets/recent-blog.png";
import ourGaller1 from "../../assets/our-galler-1.png";
import ourGaller2 from "../../assets/our-galler-2.png";

import "./Event.css";

const EventPage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [date, setDate] = useState(today);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [countdowns, setCountdowns] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const galleryImages = [
    ourGaller1,
    ourGaller2,
    ourGaller1,
    ourGaller2,
    ourGaller1,
    ourGaller2,
    ourGaller1,
    ourGaller2,
    ourGaller1,
    ourGaller2,
  ];

  const categories = [
    "Even the all-powerful pointing has no control about the blind texts",
    "Even the all-powerful pointing has no control about the blind texts",
    "Even the all-powerful pointing has no control about the blind texts",
    "Even the all-powerful pointing has no control about the blind texts",
  ];

  useEffect(() => {
    fetch(ADS_API.GET_ALL_ADS)
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads.slice(5, 6));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch event data from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch(EVENT_API.GET_ALL_EVENT);
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        setError("Failed to load events. Please try again later.");
        toast.error("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const updatedCountdowns = events.map((event) => {
        if (!event.event_start_date || !event.event_start_time) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const startDate = event.event_start_date.split("T")[0]; // 'YYYY-MM-DD'
        const dateTimeString = `${startDate}T${event.event_start_time}:00`; // 'YYYY-MM-DDTHH:mm:00'
        const eventStart = new Date(dateTimeString);
        const now = new Date();

        const diff = eventStart - now;

        if (isNaN(eventStart.getTime()) || diff <= 0) {
          return { ended: true };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return { days, hours, minutes, seconds, ended: false };
      });

      setCountdowns(updatedCountdowns);
    };

    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    const updateDate = () => {
      setDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(prev.getDate() + 1);
        if (newDate.getMonth() !== prev.getMonth()) {
          newDate.setDate(1);
        }
        return newDate;
      });
    };

    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      updateDate();
      setInterval(updateDate, 86400000);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const handleEventClick = (eventTitle) => {
    const formattedEventTitle = eventTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/events/${formattedEventTitle}`);
  };

  return (
    <Container fluid className="p-0 overflow-hidden">
      {/* Banner */}
      <Row className="justify-content-center">
        <div className="event-banner">
          {/* <h2 className="event-banner-title">Events</h2> */}
        </div>
      </Row>

      {/* First Row: Side Image + 3 Cards */}
      <Row className="align-items-start px-5">
        <Col lg={9} md={12}>
          <Row>
            {loading ? (
              <div className="text-center my-4">Loading events...</div>
            ) : error ? (
              <div className="text-danger text-center my-4">{error}</div>
            ) : (
              events.map((event, index) => (
                <Card
                  className="event-detail-card mb-4"
                  key={event._id || index}
                  // onClick={() => handleEventClick(event.event_title)}
                >
                  {/* Top Image */}
                  <div className="image-container">
                    <Card.Img
                      variant="top"
                      src={`${BASE_URL}/${event.event_image}`}
                      alt={`Banner for ${event.event_title}`}
                      className="event-image"
                    />

                    {/* Countdown Overlay */}
                    {countdowns[index] && !countdowns[index].ended ? (
                      <div className="countdown-wrapper">
                        <div className="countdown-grid">
                          {["days", "hours", "minutes", "seconds"].map(
                            (unit, i) => (
                              <React.Fragment key={i}>
                                <div className="countdown-box">
                                  <div className="count-number">
                                    {String(countdowns[index][unit]).padStart(
                                      2,
                                      "0"
                                    )}
                                  </div>
                                  <div className="count-label">
                                    {unit.charAt(0).toUpperCase() +
                                      unit.slice(1)}
                                  </div>
                                </div>
                                {unit !== "seconds" && (
                                  <div className="countdown-separator" />
                                )}
                              </React.Fragment>
                            )
                          )}
                        </div>
                        <div className="countdown-time">
                          Time : {event.event_start_time} hrs -{" "}
                          {event.event_end_time} hrs
                        </div>
                      </div>
                    ) : (
                      <div className="countdown-ended-label">Event Ended</div>
                    )}
                  </div>

                  <Card.Body>
                    {/* Title */}
                    <Card.Title className="event-title my-3">
                      {event.event_title}
                    </Card.Title>

                    {/* Meta Information Row */}
                    <div className="event-meta d-flex justify-content-start align-items-center mb-3">
                      <span className="event-date">
                        {new Date(event.event_start_date).toLocaleDateString()}{" "}
                        - {new Date(event.event_end_date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Short Description */}
                    <Card.Text className="event-description">
                      {event.event_description.length > 150
                        ? `${event.event_description.substring(0, 500)}...`
                        : event.event_description}
                    </Card.Text>

                    {/* Read More Button */}
                    <Button
                      className="event-read-button"
                      aria-label={`Read more about ${event.event_title}`}
                      onClick={() => handleEventClick(event.event_title)}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              ))
            )}
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

          <Card className=" border-0">
            <h4 className="events-heading">Past Events</h4>
            <div className="past-events mt-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="past-events-item d-flex align-items-start"
                >
                  <div className="event-icon">
                    <img src={recentBlog} alt="Event Icon" />
                  </div>
                  <div className="event-content">
                    <p>{category}</p>
                    <div className="event-meta">
                      <small>📅 Mar 11, 2025</small>
                      {/* <span className="blog-comments">💬 5</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-0 ads-section mt-5">
            <div className="ad-image">
              {ads.map((ad) => (
                <AdBanner key={ad.ads_id} ad={ad} />
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Col xs={12}>
        <div className="container-fluid my-1">
          <h2 className="event-our-gallery-heading text-center">Our Gallery</h2>
          <div className="event-gallery-slider">
            <div className="event-gallery-track">
              {galleryImages.map((img, index) => (
                <div className="event-gallery-item" key={`${img}-${index}`}>
                  <img src={img} alt="Gallery" className="event-gallery-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Col>

      {/* Modal for Full Calendar Image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Button
            className="event-highcourt-close-btn"
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

export default EventPage;
