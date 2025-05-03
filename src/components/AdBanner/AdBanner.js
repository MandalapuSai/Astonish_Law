// components/AdBanner.js
import React from "react";
import { BASE_URL } from "../../api/api";

const AdBanner = ({ ad }) => {
  return (
    <img
      src={`${BASE_URL}/${ad.ads_image}`}
      alt="Advertisement"
      style={{ width: "100%", marginBottom: "20px", borderRadius: "8px" }}
    />
  );
};

export default AdBanner;
