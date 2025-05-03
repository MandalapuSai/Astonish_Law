import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { BASE_URL, CASES_API } from "../../api/api";
import "./OurCaseDetail.css";

import Criminal from "../../assets/criminalcase.png";
import LatestNewsPic from "../../assets/latest_news_cases_1.png";
import { toast } from "react-toastify";

const OurCaseDetail = () => {
  const { title } = useParams();
  const formattedTitle = title.replace(/-/g, " ");

  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        setLoading(true);
        const response = await fetch(CASES_API.GET_ALL_CASES);
        if (!response.ok) throw new Error("Unable to fetch cases");

        const data = await response.json();

        const matchedCase = data.case.find(
          (c) => c.case_category.toLowerCase() === formattedTitle.toLowerCase()
        );

        if (!matchedCase) {
          toast.error("Case not found.");
          throw new Error("Case not found");
        }
        setCaseDetails(matchedCase);
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCases();
  }, [formattedTitle]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading case details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="casecriminal-banner"></div>

      <Container fluid className="px-5 py-3">
        <Row>
          <Col lg={9} md={8} sm={12} className="casecriminal-content">
            {/* <h2 className="our-case-heading-1">{formattedTitle} :</h2> */}

            <img
              src={
                caseDetails.case_image
                  ? `${BASE_URL}/${caseDetails.case_image}`
                  : Criminal
              }
              alt={caseDetails.case_category}
              className="casecriminal-image"
            />

            <h2 className="our-case-heading-1">About This Project :</h2>
            <p className="casecriminal_para">
              {caseDetails.case_description || "No description available."}
            </p>
            <h3 className="our-case-heading-2">How I Work :</h3>
            <p>{caseDetails.work_description || "No work process provided."}</p>
            <h3 className="our-case-titles">Analyzing Case</h3>
            <p>
              {caseDetails.analyzing_description || "No analysis available."}
            </p>
            <h3 className="our-case-titles">Research & Investigation</h3>
            <p>
              {caseDetails.investigation_description ||
                "No research available."}
            </p>
            <h3 className="our-case-titles">Court Of Low Success</h3>
            <p>
              {caseDetails.court_law_sucess_description ||
                "No court details available."}
            </p>
          </Col>

          {/* Sidebar (3 Grid) */}
          <Col lg={3} md={4} sm={12} className="casecriminal-sidebar">
            {/* Latest News Section */}
            <div className="ourcasesection-news mt-4">
              <h4>Latest News</h4>
              {[1, 2, 3].map((news, index) => (
                <div key={index} className="news-item d-flex align-items-start">
                  <div className="news-icon">
                    <img src={LatestNewsPic} alt="News Icon" />
                  </div>
                  <div className="news-content">
                    <p>
                      Even the all-powerful pointing has no control about the
                      blind texts
                    </p>
                    <div className="news-meta">
                      <small>📅 Mar 11, 2025</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Details Section */}
            <div className="casecriminal-details mt-4">
              <h4>Project Details</h4>
              <ul>
                <li>
                  <strong>Lawyers:</strong>{" "}
                  {caseDetails.lawyer_name || "Not available"}
                </li>
                <li>
                  <strong>Category:</strong>{" "}
                  {caseDetails.case_category || "Not available"}
                </li>
                <li>
                  <strong>Case Status:</strong>{" "}
                  {caseDetails.status || "Not available"}
                </li>
                <li>
                  <strong>Last Updated:</strong>{" "}
                  {caseDetails.updatedAt || "Not available"}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OurCaseDetail;
