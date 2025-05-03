import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

import { toast } from "react-toastify";
import { ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";
import "./AboutUs.css";

import HomeReview from "../HomeReview/HomeReview";
import About from "../About/About";

//assets-images

import ourVision from "../../assets/our-vision.png";
import ourMission from "../../assets/our-mission.png";
import whatWedo from "../../assets/banner-what-we-do.jpg";
import ourTeam1 from "../../assets/our-team-1.jpg";
import ourTeam2 from "../../assets/our-team-2.jpg";
import ourTeam3 from "../../assets/our-team-3.jpg";
import ourGaller1 from "../../assets/our-galler-1.png";
import ourGaller2 from "../../assets/our-galler-2.png";

const AboutUs = () => {
  const [ads, setAds] = useState([]);

  // Fetch ads using fetch()
  useEffect(() => {
    fetch(ADS_API.GET_ALL_ADS)
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads.slice(3, 7));
      })
      .catch((error) => {
        toast.error("Failed to fetch ads:", error);
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Sitha ram",
      title: "Assistant Lawyer",
      photo: ourTeam1,
    },
    {
      id: 2,
      name: "Ravi Kumar",
      title: "Assistant Lawyer",
      photo: ourTeam2,
    },
    {
      id: 3,
      name: "Harish",
      title: "Assistant Lawyer",
      photo: ourTeam3,
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);
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

  const handleCardClick = (id) => {
    setSelectedCard(id === selectedCard ? null : id);
  };

  return (
    <div className="container-fluid p-0">
      {/* Banner Section */}
      <div className="about-banner d-flex justify-content-center align-item-center">
        {/* <h1>About Us</h1> */}
      </div>

      <div>
        <About />
      </div>

      {/* Our Vision & Advertisement */}
      <div className="container-fluid px-5 my-5">
        <div className="row  align-items-center">
          <div className="col-lg-5 col-md-5 col-sm-12 text-center text-md-start vision-content">
            <h2 className="about-heading text-start">Our Vision</h2>
            <p className="about-para">
              Our vision is to uphold justice, protect legal rights, and ensure
              fair treatment for all. We believe in equality before the law,
              ethical legal practice, and accessible legal assistance for those
              in need.{" "}
            </p>
            <p className="about-para">
              We are committed to empowering individuals and businesses by
              providing clear legal guidance, safeguarding their rights, and
              ensuring justice prevails. Our firm envisions a legal system where
              fairness, integrity, and professionalism drive every decision.
            </p>
            <p className="about-para">
              Through innovation and expertise, we aim to simplify complex legal
              matters, making justice more approachable and transparent.
            </p>
          </div>

          {/* Vision Image (4 Columns on Large, 6 on Medium, Hidden on Small) */}
          <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center">
            <img
              src={ourVision}
              className="img-fluid vision-img"
              alt="Vision"
            />
          </div>

          {/* Advertisement Image (3 Columns on Large, Full on Medium & Small) */}
          <div className="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-center mt-4 mt-lg-0 order-3">
            {ads[0] && <AdBanner key={ads[0].ads_id} ad={ads[0]} />}
          </div>
        </div>
      </div>

      {/* Our Mission & Advertisement */}
      <div className="container-fluid px-5 my-5">
        <div className="row align-items-center">
          {/* Mission Image (4 Columns on Large, 6 on Medium, Full on Small) */}
          <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center">
            <img
              src={ourMission}
              className="img-fluid mission-img"
              alt="Mission"
            />
          </div>

          {/* Mission Content (5 Columns on Large, 6 on Medium, Full on Small) */}
          <div className="col-lg-5 col-md-5 col-sm-12 text-center text-md-start mt-4 mt-md-0">
            <h2 className="about-heading text-start">Our Mission</h2>
            <p className="about-para">
              Our mission is to provide exceptional legal representation with
              integrity, dedication, and a commitment to justice. We strive to
              protect the rights and interests of our clients by offering expert
              legal counsel, strategic advocacy, and personalized solutions
              tailored to their unique needs.
            </p>
            <p className="about-para">
              We believe in upholding the highest standards of professionalism,
              ensuring transparency, and delivering results-driven legal
              services. Whether guiding individuals, businesses, or
              organizations, our goal is to simplify legal complexities and
              empower our clients with the knowledge and support they need to
              make informed decisions.
            </p>
          </div>

          {/* Advertisement Image (3 Columns on Large, Full on Medium & Small) */}
          <div className="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-center mt-4 mt-lg-0">
            {ads[1] && <AdBanner key={ads[1].ads_id} ad={ads[1]} />}
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="container-fluid px-5 my-5">
        <div className="row align-items-center">
          {/* Main Banner Image (9 Columns on Large, Full Width on Small) */}
          <div className="col-lg-9 col-md-9 col-sm-12 mb-3">
            <img
              src={whatWedo}
              className="img-fluid what-we-do-img"
              alt="Banner"
            />
            <div className=" mt-4 text-center text-md-start">
              <p className="what-we-do-para">
                At our firm, we are dedicated to delivering comprehensive legal
                services with a strong focus on justice, integrity, and client
                satisfaction. Our expertise spans across multiple legal domains,
                ensuring personalized and effective solutions for individuals,
                businesses, and organizations.
              </p>
              <ul className="what-we-do-list">
                <li>
                  <strong>Criminal Defense</strong> – Protecting rights,
                  ensuring fair trials, and advocating for justice.
                </li>
                <li>
                  <strong>Corporate & Business Law</strong> – Assisting
                  businesses with legal structures, compliance, contracts, and
                  dispute resolution.
                </li>
                <li>
                  <strong>Family Law & Estate Planning</strong> – Handling
                  divorce, child custody, wills, and inheritance with
                  sensitivity and professionalism.
                </li>
                <li>
                  <strong>Real Estate & Property Law</strong> – Managing
                  property disputes, transactions, and legal documentation.
                </li>
                <li>
                  <strong>Intellectual Property Protection</strong> –
                  Safeguarding innovations, trademarks, copyrights, and patents.
                </li>
                <li>
                  <strong>Employment & Labor Law</strong> – Ensuring workplace
                  rights, compliance, and resolving disputes.
                </li>
                <li>
                  <strong>Consumer Protection</strong> – Advocating for consumer
                  rights against fraud, unfair practices, and defective
                  products.
                </li>
                <li>
                  <strong>Civil Litigation & Dispute Resolution</strong> –
                  Representing clients in legal disputes, negotiations, and
                  settlements.
                </li>
                <li>
                  <strong>Arbitration & Mediation</strong> – Providing
                  alternative dispute resolution services to achieve fair and
                  efficient outcomes.
                </li>
              </ul>
            </div>
          </div>
          {/* Advertisement Image (3 Columns on Large, 4 on Medium, Full Width on Small) */}
          <div className="col-lg-3 col-md-3 col-sm-12 mt-4 mt-md-0 d-flex justify-content-center">
            {ads[2] && <AdBanner key={ads[2].ads_id} ad={ads[2]} />}
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="container-fluid px-5 my-5">
        <div className="row text-center">
          {/* Certified Attorneys */}
          <div className="col-lg-3 col-md-3 col-sm-6 mb-4 stats-card-wrapper">
            <div className="stats-card p-4 shadow-sm">
              <h3 className="stats-number">
                <CountUp start={0} end={50} duration={3} />+
              </h3>
              <p className="stats-text">Certified Attorneys</p>
            </div>
          </div>

          {/* Years of Experience */}
          <div className="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div className="stats-card p-4 shadow-sm">
              <h3 className="stats-number">
                <CountUp start={0} end={30} duration={3} />+
              </h3>
              <p className="stats-text">Years of Experience</p>
            </div>
          </div>

          {/* Handling Cases */}
          <div className="col-lg-3 col-md-3 col-sm-6 mb-4">
            <div className="stats-card p-4 shadow-sm">
              <h3 className="stats-number">
                <CountUp start={0} end={10000} duration={3} separator="," />+
              </h3>
              <p className="stats-text">Handling Cases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="container-fluid px-5 my-5">
        <div className="row">
          {/* Team Section */}
          <div className="col-lg-9 col-md-9 col-sm-12">
            <h2 className="our-team-heading">Our Team</h2>
            <div className="row">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="col-lg-4 col-md-4 col-sm-6 mb-3"
                >
                  <div
                    className="card text-white text-center our-teams-card-section"
                    onClick={() => handleCardClick(member.id)}
                  >
                    {selectedCard === member.id ? (
                      <img
                        src={member.photo}
                        className="card-img-top"
                        alt={member.name}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="card-body d-flex flex-column justify-content-center">
                        <h5 className="card-title">{member.name}</h5>
                        <p className="card-text">{member.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advertisement Section */}
          <div className="col-lg-3 col-md-3 col-sm-12 mt-4 mt-md-0">
            {ads[3] && <AdBanner key={ads[3].ads_id} ad={ads[3]} />}
          </div>
        </div>
      </div>

      {/* Client Reviews Section */}
      <div className="about-review-container">
        <HomeReview page="about" />
      </div>

      {/* Gallery Section */}
      <div className="container-fluid my-1">
        <h2 className="our-gallery-heading text-center">Our Gallery</h2>
        <div className="gallery-slider">
          <div className="gallery-track">
            {galleryImages.map((img, index) => (
              <div className="gallery-item" key={index}>
                <img src={img} alt="Gallery" className="gallery-img" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
