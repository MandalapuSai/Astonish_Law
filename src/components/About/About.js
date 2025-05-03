import React from "react";
import HomeAboutSection from "../HomeAboutSection/HomeAboutSection";
import aboutImg from "../../assets/about-image.png";

const About = () => {
  return (
    <HomeAboutSection
      title="About Us"
      content={[
        "With a strong commitment to justice, we have been serving clients with integrity and professionalism. Our experienced legal team provides expert advice and strategic solutions to protect the rights and interests of individuals and businesses.",
        "Our firm specializes in handling cases related to corporate law, civil disputes, family law, real estate, and criminal defense. We take a client-focused approach, ensuring personalized attention and a clear legal strategy tailored to each case.",
        "With years of experience, we have successfully represented numerous clients, earning a reputation for excellence and trust. Whether you need legal representation, documentation support, or professional legal consultation, our team is ready to assist you."
      ]}
      image={aboutImg}
      showButton={false}
    />
  );
};

export default About;
