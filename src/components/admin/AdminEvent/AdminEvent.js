import React, { useState, useEffect, useRef } from "react";
import "./AdminEvent.css";
import { toast } from "react-toastify";
import { FiPlus, FiTrash2, FiEye, FiEdit } from "react-icons/fi";
import { BASE_URL, EVENT_API } from "../../../api/api";
import { Modal, Button, Spinner } from "react-bootstrap";

const AdminEvents = () => {
  const [formData, setFormData] = useState({
    event_title: "",
    event_description: "",
    event_start_date: "",
    event_start_time: "",
    event_end_date: "",
    event_end_time: "",
    event_address: "",
    event_image: null,
  });

  const [speakers, setSpeakers] = useState([
    { speaker_name: "", date: "", from_time: "", to_time: "", designation: "" },
  ]);

  const [events, setEvents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const imageInputRef = useRef(null);

  const formatTo12Hour = (timeStr) => {
    const date = new Date(timeStr);
    if (isNaN(date)) return timeStr;
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSpeakerChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...speakers];
    updated[index][name] = value;
    setSpeakers(updated);
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      {
        speaker_name: "",
        date: "",
        from_time: "",
        to_time: "",
        designation: "",
      },
    ]);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(EVENT_API.GET_ALL_EVENT);
      const data = await response.json();
      if (data.statusCode === 200) {
        setEvents(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Something went wrong while fetching events.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const clearForm = () => {
    setFormData({
      event_title: "",
      event_description: "",
      event_start_date: "",
      event_start_time: "",
      event_end_date: "",
      event_end_time: "",
      event_address: "",
      event_image: null,
    });
    setSpeakers([
      {
        speaker_name: "",
        date: "",
        from_time: "",
        to_time: "",
        designation: "",
      },
    ]);
    setIsEditMode(false);
    setCurrentEvent(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const addEvent = async () => {
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "event_image" && value) formPayload.append(key, value);
        else if (key !== "event_image") formPayload.append(key, value);
      });
      formPayload.append("speakers", JSON.stringify(speakers));

      const res = await fetch(EVENT_API.ADD_EVENT, {
        method: "POST",
        body: formPayload,
      });
      const result = await res.json();

      if (res.ok && result.statusCode === 200) {
        toast.success(result.message);
        clearForm();
        fetchEvents();
      } else {
        toast.error(result.message || "Add failed.");
      }
    } catch (err) {
      toast.error("Add failed.");
      console.error(err);
    }
  };

  const editEvent = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("event_id", currentEvent.event_id);
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "event_image" && value) formPayload.append(key, value);
        else if (key !== "event_image") formPayload.append(key, value);
      });
      formPayload.append("speakers", JSON.stringify(speakers));

      const res = await fetch(EVENT_API.UPDATE_EVENT, {
        method: "POST",
        body: formPayload,
      });
      const result = await res.json();

      if (res.ok && result.statusCode === 200) {
        toast.success(result.message);
        clearForm();
        fetchEvents();
      } else {
        toast.error(result.message || "Edit failed.");
      }
    } catch (err) {
      toast.error("Edit failed.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isEditMode ? await editEvent() : await addEvent();
  };

  const formatDate = (dateStr) => dateStr?.split("T")[0] || dateStr;

  const handleEditEvent = (event) => {
    setIsEditMode(true);
    setCurrentEvent(event);
    setFormData({
      event_title: event.event_title,
      event_description: event.event_description,
      event_start_date: formatDate(event.event_start_date),
      event_start_time: formatTo12Hour(event.event_start_time),
      event_end_date: formatDate(event.event_end_date),
      event_end_time: formatTo12Hour(event.event_end_time),
      event_address: event.event_address,
      event_image: null,
    });
    // setSpeakers(event.speakers || []);
    const formattedSpeakers = (event.speakers || []).map((s) => ({
      ...s,
      date: formatDate(s.date),
      from_time: formatTo12Hour(s.from_time),
      to_time: formatTo12Hour(s.to_time),
    }));

    setSpeakers(formattedSpeakers);
  };

  const handleDeleteEvent = async (event_id) => {
    try {
      const res = await fetch(EVENT_API.DELETE_EVENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id }),
      });
      const result = await res.json();
      if (res.ok && result.statusCode === 200) {
        toast.success(result.message);
        setEvents((prev) => prev.filter((e) => e.event_id !== event_id));
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Delete failed.");
      console.error(err);
    }
  };

  const handleViewEvent = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  // Open confirmation modal
  const confirmDelete = (eventId) => {
    setDeleteId(eventId);
    setShowConfirm(true);
  };

  const toggleReadMore = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="admin-events-container">
      <h2 className="mb-4 admin-carousel-heading">
        <span className="admin-heading-bg mb-4">Events Management</span>
      </h2>
      {/* Modal for event details */}
      {currentEvent && (
        <div
          className="modal show fade"
          tabIndex="-1"
          role="dialog"
          style={{
            display: showModal ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Event speakers Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {currentEvent.speakers && currentEvent.speakers.length > 0 ? (
                  <ul className="speaker-list">
                    {currentEvent.speakers.map((speaker, index) => (
                      <li key={index} className="speaker-item mb-3">
                        <strong>{speaker.speaker_name}</strong> (
                        {speaker.designation})<br />
                        {new Date(speaker.date).toLocaleDateString()} |{" "}
                        {formatTo12Hour(speaker.from_time)} -{" "}
                        {formatTo12Hour(speaker.to_time)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No speakers available.</p>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary "
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Form */}
      <div className="container mt-4">
        {/* <h4 className="mb-4">{isEditMode ? "Edit Event" : "Add New Event"}</h4> */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="Event-label mb-2">Event Title:</label>
              <input
                type="text"
                name="event_title"
                className="form-control event-input-field"
                value={formData.event_title}
                onChange={handleChange}
                placeholder="Enter Event Title"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="Event-label mb-2">Event Image:</label>
              <input
                type="file"
                name="event_image"
                className="form-control event-input-field"
                onChange={handleChange}
                ref={imageInputRef}
              />
            </div>
            <div className="col-md-4">
              <label className="Event-label mb-2">Event Description:</label>
              <textarea
                name="event_description"
                className="form-control event-input-field"
                value={formData.event_description}
                onChange={handleChange}
                placeholder="Enter Event Description"
                rows={2}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-2">
              <label className="Event-label mb-2">Event Start Date:</label>
              <input
                type="date"
                name="event_start_date"
                className="form-control event-input-field"
                value={formData.event_start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="Event-label mb-2">Event Start Time:</label>
              <input
                type="time"
                name="event_start_time"
                className="form-control event-input-field"
                value={formData.event_start_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="Event-label mb-2">Event End Date:</label>
              <input
                type="date"
                name="event_end_date"
                className="form-control event-input-field"
                value={formData.event_end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="Event-label mb-2">Event End Time:</label>
              <input
                type="time"
                name="event_end_time"
                className="form-control event-input-field"
                value={formData.event_end_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="Event-label mb-2">Event Address:</label>
              <input
                type="text"
                name="event_address"
                className="form-control event-input-field"
                value={formData.event_address}
                onChange={handleChange}
                placeholder="Enter Event Address"
                required
              />
            </div>
          </div>

          {/* Speaker Inputs */}
          {/* <h5>Speakers</h5> */}
          {speakers.map((speaker, index) => (
            <div key={index} className="row mb-3 speaker-row">
              <div className="col-12 col-sm-6 col-md-3 mb-2">
                <label className="Event-label mb-2">Event Speaker Name:</label>
                <input
                  type="text"
                  name="speaker_name"
                  className="form-control event-input-field"
                  value={speaker.speaker_name}
                  onChange={(e) => handleSpeakerChange(index, e)}
                  placeholder="Speaker Name"
                  required
                />
              </div>
              <div className="col-12 col-sm-6 col-md-2 mb-2">
                <label className="Event-label mb-2">Date:</label>
                <input
                  type="date"
                  name="date"
                  className="form-control event-input-field"
                  value={speaker.date}
                  onChange={(e) => handleSpeakerChange(index, e)}
                  required
                />
              </div>
              <div className="col-12 col-sm-6 col-md-2 mb-2">
                <label className="Event-label mb-2">From Time:</label>
                <input
                  type="time"
                  name="from_time"
                  className="form-control event-input-field"
                  value={speaker.from_time}
                  onChange={(e) => handleSpeakerChange(index, e)}
                  required
                />
              </div>
              <div className="col-12 col-sm-6 col-md-2 mb-2">
                <label className="Event-label mb-2">To Time:</label>
                <input
                  type="time"
                  name="to_time"
                  className="form-control event-input-field"
                  value={speaker.to_time}
                  onChange={(e) => handleSpeakerChange(index, e)}
                  required
                />
              </div>
              <div className="col-12 col-sm-6 col-md-3 mb-2">
                <label className="Event-label mb-2">Designation:</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control event-input-field"
                  value={speaker.designation}
                  onChange={(e) => handleSpeakerChange(index, e)}
                  placeholder="Designation"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn mb-3 d-flex align-items-center gap-1 speaker-event-add-btn"
            onClick={addSpeaker}
          >
            <FiPlus size={18} />
            Add Speaker
          </button>

          <div className="d-flex">
            <button type="submit" className="btn btn-primary add-event-btn">
              {/* {isEditMode ? "Update Event" : "Add Event"} */}
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : isEditMode ? (
                "Update Event"
              ) : (
                "Add Event"
              )}
            </button>
            {isEditMode && (
              <button
                type="button"
                className="event-cancel-button ms-2"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Events List */}
        <div className="events-scroll">
          {/* <h4 className="mt-4">All Events</h4> */}
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <table className="table table-bordered event-bordered mt-5">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Event Title</th>
                  <th>Event Image</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>Start Time</th>
                  <th>End Date</th>
                  <th>End Time</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No events available.
                    </td>
                  </tr>
                ) : (
                  events.map((event, index) => (
                    <tr key={event.event_id}>
                      <td>{index + 1}</td>
                      <td>{event.event_title}</td>
                      <td>
                        {event.event_image ? (
                          <img
                            src={`${BASE_URL}/${event.event_image}`}
                            alt={event.event_title}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="justified-text">
                        <div
                          className={`description-content ${
                            expandedRows[event.event_id]
                              ? "expanded"
                              : "clamped"
                          }`}
                        >
                          {event.event_description}
                        </div>
                        {event.event_description.length > 100 && (
                          <button
                            className="btn description-btn-link p-0"
                            onClick={() => toggleReadMore(event.event_id)}
                          >
                            {expandedRows[event.event_id]
                              ? "Read Less"
                              : "Read More"}
                          </button>
                        )}
                      </td>
                      <td>
                        {new Date(event.event_start_date).toLocaleDateString()}
                      </td>
                      <td>{formatTo12Hour(event.event_start_time)}</td>

                      <td>
                        {new Date(event.event_end_date).toLocaleDateString()}
                      </td>
                      <td>{formatTo12Hour(event.event_end_time)}</td>
                      <td>{event.event_address}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="d-flex align-items-center gap-1 view-btn1 me-2"
                            onClick={() => handleViewEvent(event)}
                          >
                            <FiEye size={16} style={{ color: "inherit" }} />
                          </button>
                          <button
                            className="btn btn-warning btn-sm d-flex align-items-center gap-1 edit-btn1 me-2"
                            onClick={() => handleEditEvent(event)}
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1 delete-btn1"
                            onClick={() => confirmDelete(event.event_id)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body>
          <h2 className="event-delete-title">
            Are you sure you want to delete this event?
          </h2>
        </Modal.Body>
        <Modal.Footer className="event-delete-footer">
          <Button
            className="event-confirm-delete-btn"
            onClick={() => {
              handleDeleteEvent(deleteId);
              setShowConfirm(false);
            }}
          >
            Yes, Delete
          </Button>
          <Button
            className="event-cancel-delete-btn"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminEvents;
