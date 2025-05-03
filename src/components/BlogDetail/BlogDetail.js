import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";

import { toast } from "react-toastify";
import { ADS_API } from "../../api/api";
import AdBanner from "../AdBanner/AdBanner";

import blogImage1 from "../../assets/blog-detail-1.png";
import blogImage2 from "../../assets/blog-detail-2.png";
import blogImage3 from "../../assets/blog-client-right-1.jpg";
import blogImage4 from "../../assets/blog-client-right-2.jpg";
import blogImage5 from "../../assets/blog-business-law-1.jpg";
import blogImage6 from "../../assets/blog-business-law-2.jpg";

import recentBlog from "../../assets/recent-blog.png";

import "./BlogDetail.css";

const BlogDetail = () => {
  const { category, id } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const navigate = useNavigate();
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
  

  const blogData = {
    "Legal Insights": [
      {
        id: 1,
        title: "Legal Insights",
        content: [
          "The legal landscape is constantly evolving, with new regulations, landmark cases, and policy updates shaping the way laws are interpreted and enforced. Staying informed about these changes is essential for individuals and businesses alike, as even minor amendments to legal frameworks can have a significant impact. From constitutional law to corporate regulations, our expert-driven insights provide a clear and concise breakdown of the most crucial legal updates.",
          "We explore key case studies, dissect judicial rulings, and analyze emerging legal trends to help you navigate complexities with confidence. Whether it’s a major Supreme Court verdict or a policy change affecting businesses, our legal insights equip you with the knowledge to make informed decisions. With expert commentary and simplified explanations, we ensure that legal information is accessible to everyone, regardless of their background.",
        ],
        image: blogImage1,
        imagePosition: "top",
      },
      {
        id: 2,
        title: "Understanding the Legal Landscape",
        content: [
          "We explore key case studies, dissect judicial rulings, and analyze emerging legal trends to help you navigate complexities with confidence. Whether it’s a major Supreme Court verdict or a policy change affecting businesses, our legal insights equip you with the knowledge to make informed decisions. With expert commentary and simplified explanations, we ensure that legal information is accessible to everyone, regardless of their background.",
        ],
        image: blogImage2,
        imagePosition: "bottom",
      },
      {
        id: 3,
        content: [
          "The legal landscape is constantly evolving, with new regulations, landmark cases, and policy updates shaping the way laws are interpreted and enforced. Staying informed about these changes is essential for individuals and businesses alike, as even minor amendments to legal frameworks can have a significant impact. From constitutional law to corporate regulations, our expert-driven insights provide a clear and concise breakdown of the most crucial legal updates.",
          "We explore key case studies, dissect judicial rulings, and analyze emerging legal trends to help you navigate complexities with confidence. Whether it’s a major Supreme Court verdict or a policy change affecting businesses, our legal insights equip you with the knowledge to make informed decisions. With expert commentary and simplified explanations, we ensure that legal information is accessible to everyone, regardless of their background.",
        ],
      },
    ],
    "Client Rights": [
      {
        id: 1,
        title: "Client Rights",
        content: [
          "Understanding your legal rights is the foundation of ensuring fair treatment in both personal and professional matters. Whether you're signing a contract, dealing with a workplace dispute, or facing a legal issue, knowing your rights can empower you to take the right steps. Many people find themselves at a disadvantage simply because they are unaware of the legal protections available to them.",
          "Our content covers a wide range of client rights, from consumer protections and employee rights to tenant laws and contract disputes. We break down complex legal concepts into easy-to-understand guides, offering actionable advice on how to exercise your rights effectively. Whether it’s how to respond to unfair treatment, what legal recourse you have in specific situations, or how to seek justice, our expert-backed articles provide the clarity and direction you need.",
        ],
        image: blogImage3,
        imagePosition: "top",
      },
      {
        id: 2,
        title: "Know Your Rights: A Guide for Clients",
        content: [
          "Our content covers a wide range of client rights, from consumer protections and employee rights to tenant laws and contract disputes. We break down complex legal concepts into easy-to-understand guides, offering actionable advice on how to exercise your rights effectively. Whether it’s how to respond to unfair treatment, what legal recourse you have in specific situations, or how to seek justice, our expert-backed articles provide the clarity and direction you need.",
        ],
        image: blogImage4,
        imagePosition: "bottom",
      },
      {
        id: 3,
        content: [
          "Understanding your legal rights is the foundation of ensuring fair treatment in both personal and professional matters. Whether you're signing a contract, dealing with a workplace dispute, or facing a legal issue, knowing your rights can empower you to take the right steps. Many people find themselves at a disadvantage simply because they are unaware of the legal protections available to them.",
          "Our content covers a wide range of client rights, from consumer protections and employee rights to tenant laws and contract disputes. We break down complex legal concepts into easy-to-understand guides, offering actionable advice on how to exercise your rights effectively. Whether it’s how to respond to unfair treatment, what legal recourse you have in specific situations, or how to seek justice, our expert-backed articles provide the clarity and direction you need.",
        ],
      },
    ],
    "Business Law Guide": [
      {
        id: 1,
        title: "Business Law Guide",
        content: [
          "Running a business involves more than just offering products or services—it also requires compliance with numerous legal requirements. From forming a company and drafting contracts to handling disputes and ensuring regulatory compliance, businesses must navigate a maze of legal obligations. Failing to do so can lead to serious consequences, including fines, lawsuits, and operational disruptions.",
          "Our business law guide provides expert advice on key aspects of business legality, such as employment laws, intellectual property rights, taxation policies, and corporate governance. Whether you're a startup founder or a well-established entrepreneur, our content helps you stay legally compliant while protecting your business interests. Learn how to mitigate risks, resolve disputes efficiently, and create legally sound agreements that safeguard your company’s future.",
        ],
        image: blogImage5,
        imagePosition: "top",
      },
      {
        id: 2,
        title: "The Legal Side of Running a Business",
        content: [
          "Our business law guide provides expert advice on key aspects of business legality, such as employment laws, intellectual property rights, taxation policies, and corporate governance. Whether you're a startup founder or a well-established entrepreneur, our content helps you stay legally compliant while protecting your business interests. Learn how to mitigate risks, resolve disputes efficiently, and create legally sound agreements that safeguard your company’s future.",
        ],
        image: blogImage6,
        imagePosition: "bottom",
      },
      {
        id: 3,
        content: [
          "Running a business involves more than just offering products or services—it also requires compliance with numerous legal requirements. From forming a company and drafting contracts to handling disputes and ensuring regulatory compliance, businesses must navigate a maze of legal obligations. Failing to do so can lead to serious consequences, including fines, lawsuits, and operational disruptions.",
          "Our business law guide provides expert advice on key aspects of business legality, such as employment laws, intellectual property rights, taxation policies, and corporate governance. Whether you're a startup founder or a well-established entrepreneur, our content helps you stay legally compliant while protecting your business interests. Learn how to mitigate risks, resolve disputes efficiently, and create legally sound agreements that safeguard your company’s future.",
        ],
      },
    ],
    "Courtroom Strategies": [
      {
        id: 1,
        title: "Courtroom Strategies",
        content: [
          "Stepping into a courtroom can be an intimidating experience, whether you're a plaintiff, defendant, or legal professional. A strong case isn't just about having the right evidence—it’s also about using the right legal strategies, understanding courtroom procedures, and presenting arguments effectively. Winning a case often depends on preparation, persuasion, and a deep understanding of legal precedents.",
          "In this section, we dive into essential courtroom tactics, including cross-examination techniques, jury persuasion methods, and the importance of case law. We also discuss real-world case studies that illustrate how effective litigation strategies have shaped major legal decisions. Whether you are preparing for a legal battle, curious about courtroom dynamics, or simply want to understand how justice is served, our insights will give you a behind-the-scenes look at the strategies that make a difference in court.",
        ],
        image: blogImage3,
        imagePosition: "top",
      },
      {
        id: 2,
        title: "Winning Strategies for the Courtroom",
        content: [
          "In this section, we dive into essential courtroom tactics, including cross-examination techniques, jury persuasion methods, and the importance of case law. We also discuss real-world case studies that illustrate how effective litigation strategies have shaped major legal decisions. Whether you are preparing for a legal battle, curious about courtroom dynamics, or simply want to understand how justice is served, our insights will give you a behind-the-scenes look at the strategies that make a difference in court.",
        ],
        image: blogImage4,
        imagePosition: "bottom",
      },
      {
        id: 4,
        content: [
          "Stepping into a courtroom can be an intimidating experience, whether you're a plaintiff, defendant, or legal professional. A strong case isn't just about having the right evidence—it’s also about using the right legal strategies, understanding courtroom procedures, and presenting arguments effectively. Winning a case often depends on preparation, persuasion, and a deep understanding of legal precedents.",
          "In this section, we dive into essential courtroom tactics, including cross-examination techniques, jury persuasion methods, and the importance of case law. We also discuss real-world case studies that illustrate how effective litigation strategies have shaped major legal decisions. Whether you are preparing for a legal battle, curious about courtroom dynamics, or simply want to understand how justice is served, our insights will give you a behind-the-scenes look at the strategies that make a difference in court.",
        ],
      },
    ],
    "Law & Everyday Life": [
      {
        id: 1,
        title: "Law & Everyday Life",
        content: [
          "Legal matters aren’t just for businesses or high-profile court cases—they are a part of everyday life. Whether you're dealing with a landlord-tenant dispute, drafting a will, handling a family matter, or purchasing a property, legal knowledge can make a significant difference. Many everyday situations involve legal rights and responsibilities that people often overlook until a problem arises.",
          "Our Law & Everyday Life section offers practical guidance on common legal issues, helping you navigate challenges with confidence. From understanding rental agreements and workplace rights to knowing what to do in a car accident or contract dispute, we provide clear, actionable advice. With our easy-to-understand explanations, you’ll be better prepared to handle life's legal challenges and make informed decisions that protect your interests.",
        ],
        image: blogImage1,
        imagePosition: "top",
      },
      {
        id: 2,
        title: "Everyday Legal Matters: What You Need to Know",
        content: [
          "Our Law & Everyday Life section offers practical guidance on common legal issues, helping you navigate challenges with confidence. From understanding rental agreements and workplace rights to knowing what to do in a car accident or contract dispute, we provide clear, actionable advice. With our easy-to-understand explanations, you’ll be better prepared to handle life's legal challenges and make informed decisions that protect your interests.",
        ],
        image: blogImage2,
        imagePosition: "bottom",
      },
      {
        id: 5,
        content: [
          "Legal matters aren’t just for businesses or high-profile court cases—they are a part of everyday life. Whether you're dealing with a landlord-tenant dispute, drafting a will, handling a family matter, or purchasing a property, legal knowledge can make a significant difference. Many everyday situations involve legal rights and responsibilities that people often overlook until a problem arises.",
          "Our Law & Everyday Life section offers practical guidance on common legal issues, helping you navigate challenges with confidence. From understanding rental agreements and workplace rights to knowing what to do in a car accident or contract dispute, we provide clear, actionable advice. With our easy-to-understand explanations, you’ll be better prepared to handle life's legal challenges and make informed decisions that protect your interests.",
        ],
      },
    ],
    "Expert Opinions": [
      {
        id: 1,
        title: " Expert Opinions",
        content: [
          "The legal world is complex and ever-changing, and having expert insights can help decode its intricacies. From major judicial decisions to shifts in legal policies, expert opinions play a crucial role in understanding how the law affects individuals, businesses, and society. Legal professionals bring years of experience and in-depth analysis, offering valuable perspectives on everything from civil rights issues to corporate regulations.",
          "In this section, we bring you insights from experienced attorneys, legal scholars, and industry experts who analyze key legal developments and offer informed viewpoints. Whether it’s a breakdown of new legislation, an analysis of a high-profile court ruling, or predictions about future legal trends, our expert opinions give you a deeper understanding of the law’s impact on various sectors. Stay ahead with authoritative legal perspectives that help you navigate today’s legal landscape.",
        ],
        image: blogImage5,
        imagePosition: "top",
      },
      {
        id: 2,
        title: "Expert Perspectives on Law & Justice",
        content: [
          "In this section, we bring you insights from experienced attorneys, legal scholars, and industry experts who analyze key legal developments and offer informed viewpoints. Whether it’s a breakdown of new legislation, an analysis of a high-profile court ruling, or predictions about future legal trends, our expert opinions give you a deeper understanding of the law’s impact on various sectors. Stay ahead with authoritative legal perspectives that help you navigate today’s legal landscape.",
        ],
        image: blogImage6,
        imagePosition: "bottom",
      },
      {
        id: 6,
        content: [
          "The legal world is complex and ever-changing, and having expert insights can help decode its intricacies. From major judicial decisions to shifts in legal policies, expert opinions play a crucial role in understanding how the law affects individuals, businesses, and society. Legal professionals bring years of experience and in-depth analysis, offering valuable perspectives on everything from civil rights issues to corporate regulations.",
          "In this section, we bring you insights from experienced attorneys, legal scholars, and industry experts who analyze key legal developments and offer informed viewpoints. Whether it’s a breakdown of new legislation, an analysis of a high-profile court ruling, or predictions about future legal trends, our expert opinions give you a deeper understanding of the law’s impact on various sectors. Stay ahead with authoritative legal perspectives that help you navigate today’s legal landscape.",
        ],
      },
    ],
  };

  // console.log("blogData", blogData);

  const [selectedCategory, setSelectedCategory] = useState(
    category || "Legal Insights"
  );
  // const [blog, setBlog] = useState(null);

  const categories = [
    "Even the all-powerful pointing has no control about the blind texts",
    "Even the all-powerful pointing has no control about the blind texts",
    "Even the all-powerful pointing has no control about the blind texts",
    "Even the all-powerful pointing has no control about the blind texts",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const firstPostId = blogData[category][0]?.id;

    if (firstPostId) {
      navigate(`/blog/${encodeURIComponent(category)}/${firstPostId}`);
    } else {
      console.log("No post found for this category.");
    }
  };

  // Listen for changes in the URL and update the selected category and blog
  useEffect(() => {
    if (decodedCategory && [decodedCategory]) {
      setSelectedCategory(decodedCategory);
      // setBlog(blogData[decodedCategory].find(post => post.id === parseInt(id)));
    }
  }, [decodedCategory, id]);

  if (!blogData || typeof blogData !== "object") {
    return <p>Loading...</p>;
  }

  const categorySelected = blogData[decodedCategory]; // Access category correctly

  if (!categorySelected) {
    // console.log("Category not found:", decodedCategory);
    return <p>Category not found</p>;
  }

  const bloged = categorySelected.find((item) => item.id === parseInt(id));

  if (!bloged) {
    return <p>Blog not found</p>;
  }

  // console.log("Selected Blog:", bloged);

  return (
    <Container fluid className="p-0 overflow-hidden">
      <Row>
        {/* Banner Section */}
        <Col lg={12}>
          <div className="blog-detailed-banner">
            <div>
              {/* <h2 className="blog-detailed-banner-title">Blog Details</h2> */}
            </div>
          </div>
        </Col>

        {/* Blog Main Content - 9 Columns */}
        <Col lg={9} md={9} sm={12} className="px-5 mb-5">
          {blogData[selectedCategory].map((section) => (
            <Card key={section.id} className="mb-1 p-3 border-0">
              {section.image && section.imagePosition === "top" && (
                <Image src={section.image} fluid className="rounded mb-4" />
              )}
              {section.title && <h2 className="blog-title">{section.title}</h2>}
              {section.content.map((paragraph, index) => (
                <p key={index} className="blog-details-content">
                  {paragraph}
                </p>
              ))}
              {section.image && section.imagePosition === "bottom" && (
                <Image src={section.image} fluid className="rounded mt-1" />
              )}
            </Card>
          ))}
        </Col>

        {/* Sidebar - 3 Columns */}
        <Col lg={3} md={6} sm={12} className="pe-5 ps-5 ps-md-0 mt-3">
          {/* Recent Posts Section */}
          <Card className="mb-4 border-0">
            <h4 className="mb-3">Practices Area</h4>
            <ListGroup variant="flush">
              {Object.keys(blogData).map((category) => (
                <ListGroup.Item
                  key={category}
                  action
                  onClick={() => handleCategoryClick(category)}
                  active={selectedCategory === category}
                  className="d-flex justify-content-between align-items-center"
                >
                  {category}
                  <ChevronRight size={15} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* Categories Section */}
          <Card className=" border-0">
            <h4>Recent Blogs</h4>
            <div className="recent-blogs mt-3">
              {categories.map((category, index) => (
                <div key={index} className="blog-item d-flex align-items-start">
                  <div className="blog-icon">
                    <img src={recentBlog} alt="Blog Icon" />
                  </div>
                  <div className="blog-content">
                    <p>{category}</p>
                    <div className="blog-meta">
                      <small>📅 Mar 11, 2025</small>
                      {/* <span className="blog-comments">💬 5</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Ads Section */}
          <Card className="border-0 ads-section">
            <div className="ad-image">
               {ads.map((ad) => (
              <AdBanner key={ad.ads_id} ad={ad}  />
            ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;
