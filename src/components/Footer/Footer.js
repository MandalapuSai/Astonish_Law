import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaAngleRight,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import AstonishLogo from "../../assets/white_astonish_logo.png";
import { CONTACT_API } from "../../api/api";


import "./Footer.css";

const Footer = () => {
  const [latestContact, setLatestContact] = useState({
    address: "Loading...",
    email: "Loading...",
    ph_number: "Loading...",
  });

  useEffect(() => {
    const fetchLatestContact = async () => {
      try {
        const response = await fetch(CONTACT_API.USER_SIDE_GET_CONTACT);
        const data = await response.json();

        if (data.statusCode === 200) {
          setLatestContact(data.contact);
        } else {
          console.error("Failed to fetch contact:", data.message);
        }
      } catch (error) {
        console.error("Error fetching latest contact:", error);
      }
    };

    fetchLatestContact();
  }, []);

  return (
    <footer className="footer-container">
      <div className="container-fluid py-4">
        <div className="row text-center text-md-start">
          {/* Logo Section */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center align-items-md-start mb-4">
            <img src={AstonishLogo} alt="Company Logo" className="footer-logo img-fluid mb-3" />
          </div>

          {/* Useful Links */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center align-items-md-start mb-4">
            <h5 className="footer_header_name">Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="footer-link">
                  <FaAngleRight className="footer-icon" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Our Blog
                </Link>
              </li>
              <li>
                <Link to="/event" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfolio */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center align-items-md-start mb-4">
            <h5 className="footer_header_name">Our Portfolio</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/our-case" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Our Cases
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Enquiry
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <FaAngleRight className="footer-icon" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Dynamic Contact Info */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center align-items-md-start mb-4">
            <h5 className="footer_header_name">Contact Info</h5>
            <p className="text-center text-md-start">
              <FaMapMarkerAlt className="footer-icon" /> {latestContact.address}
            </p>
            <p className="text-center text-md-start">
              <FaEnvelope className="footer-icon" /> {latestContact.email}
            </p>
            <p className="text-center text-md-start">
              <FaPhone className="footer-icon" /> {latestContact.ph_number}
            </p>
          </div>
        </div>


        {/* Footer Bottom Section */}
        <div className="row mt-4 border-top pt-3 text-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="mb-0">© 2025 Astonish Law | Developed by Digisphere</p>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <Link to="/" className="footer-social-icon">
              <FaFacebookF />
            </Link>
            <Link to="/" className="footer-social-icon">
              <FaTwitter />
            </Link>
            <Link to="/" className="footer-social-icon">
              <FaInstagram />
            </Link>
            <Link to="/" className="footer-social-icon">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
