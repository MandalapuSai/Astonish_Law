import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { BASE_URL, EVENT_API, ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";
import { toast } from "react-toastify";
import "./EventDetail.css";

//assets-img
import recentBlog from "../../assets/recent-blog.png";
import speaker1 from "../../assets/speaker1.png";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ads, setAds] = useState([]);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false,
  });

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
        setAds(data.ads.slice(4, 5));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  useEffect(() => {
    const fetchEventBySlug = async () => {
      try {
        const response = await fetch(EVENT_API.GET_ALL_EVENT);
        const data = await response.json();
        const foundEvent = data.data.find(
          (e) => e.event_title.toLowerCase().replace(/\s+/g, "-") === id
        );

        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setEvent(null);
        }
      } catch (err) {
        console.error("Error fetching event details", err);
        toast.error("Error fetching event details", err);
      }
    };

    fetchEventBySlug();
  }, [id]);

  useEffect(() => {
    if (!event || !event.event_start_date || !event.event_start_time) return;

    const startDate = event.event_start_date.split("T")[0];
    const dateTimeString = `${startDate}T${event.event_start_time}:00`;
    const eventStart = new Date(dateTimeString);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventStart - now;

      if (isNaN(eventStart.getTime()) || diff <= 0) {
        clearInterval(interval);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          ended: true,
        });
        // toast.error("Event has ended!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds, ended: false });
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  if (!event) {
    return <p>Event not found!</p>;
  }

  return (
    <Container fluid className="p-0 overflow-hidden">
      {/* Banner */}
      <Row className="justify-content-center">
        <div className="event-detail-banner">
          <h2 className="event-detail-banner-title">{event.title}</h2>
        </div>
      </Row>

      {/* First Row: Side Image + 3 Cards */}
      <Row className="align-items-start px-5">
        <Col lg={9} md={12}>
          <Row>
            {event && (
              <Card className="event-detailed-card mb-4">
                {/* Top Image */}
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}/${event.event_image}`} // assuming the image comes from API
                    alt="Event"
                    className="event-image"
                  />

                  {/* Countdown */}
                  {countdown.ended ? (
                    <div className="countdown-ended-label">Event Ended</div>
                  ) : (
                    <div className="countdown-wrapper">
                      <div className="countdown-grid">
                        {["days", "hours", "minutes", "seconds"].map(
                          (unit, i) => (
                            <React.Fragment key={unit}>
                              <div className="countdown-box">
                                <div className="count-number">
                                  {String(countdown[unit]).padStart(2, "0")}
                                </div>
                                <div className="count-label">
                                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
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
                        Time: {event.event_start_time} hrs -{" "}
                        {event.event_end_time} hrs
                      </div>
                    </div>
                  )}
                </div>

                <Card.Body>
                  {/* Title */}
                  <Card.Title className="event-detailed-title my-3">
                    {event.event_title}
                  </Card.Title>

                  {/* Meta Information Row */}
                  <div className="event-detailed-meta d-flex justify-content-start align-items-center mb-3">
                    <span className="event-detailed-date">
                      {new Date(event.event_start_date).toLocaleDateString()} -{" "}
                      {new Date(event.event_end_date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Event Description */}
                  <Card.Text className="event-detailed-description">
                    {event.event_description}
                  </Card.Text>

                  <p className="event-location mt-3">
                    <strong>Location:</strong> {event.event_address}
                  </p>

                  <h5 className="speakers-heading mt-4 mb-3">
                    2025 Keynote Speakers
                  </h5>

                  <Row>
                    {event.speakers?.map((speaker, i) => (
                      <Col
                        lg={3}
                        md={6}
                        sm={12}
                        key={i}
                        className="speakers-section mb-4"
                      >
                        <div className="speaker-card">
                          <div className="speaker-info">
                            <div className="speaker-image mb-2">
                              <p className="speaker-date">{speaker.date}</p>
                              <p className="speaker-time">
                                {speaker.from_time} - {speaker.to_time}
                              </p>
                              <img
                                src={speaker.image || speaker1}
                                alt={speaker.speaker_name}
                                className="img-fluid rounded-circle"
                              />
                            </div>
                            <h5 className="speaker-name mt-2">
                              {speaker.speaker_name}
                            </h5>
                            <p className="speaker-designation">
                              {speaker.designation}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Row>
        </Col>

        <Col lg={3} md={12} className="text-center mb-3">
          <Card className=" border-0">
            <h4 className="events-detailed-heading">Past Events</h4>
            <div className="past-detailed-events mt-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="past-events-detailed-item d-flex align-items-start"
                >
                  <div className="event-detailed-icon">
                    <img src={recentBlog} alt="Event Icon" />
                  </div>
                  <div className="event-detailed-content">
                    <p>{category}</p>
                    <div className="event-detailed-custom-meta">
                      <small>📅 Mar 11, 2025</small>
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
    </Container>
  );
};

export default EventDetail;
