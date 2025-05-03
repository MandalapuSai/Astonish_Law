import React from "react";
import HomeAboutSection from "../HomeAboutSection/HomeAboutSection";
import aboutImg from "../../assets/about-image.png";

const Home = () => {
  return (
    <HomeAboutSection
      title="About Us"
      content={[
        "We are committed to delivering justice with integrity and professionalism. Our legal team provides expert guidance and personalized solutions to safeguard your rights. Whether you need legal advice, dispute resolution, or strong representation, we stand by your side, ensuring justice prevails.",
        "At our firm, we believe that justice should be accessible to everyone. Our dedication to upholding the law ensures that your voice is heard, your rights are protected, and your interests are prioritized. We take a proactive approach to every case, offering transparent communication, diligent research, and relentless advocacy to secure the best possible outcomes. No matter the legal challenge, we are here to provide unwavering support and expert legal solutions tailored to your needs."
      ]}
      buttonText="Learn More"
      image={aboutImg}
      showButton={true}
    />
  );
};

export default Home;
