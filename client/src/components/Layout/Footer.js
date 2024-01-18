import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        background: "black",
        marginBottom: "0px",
        textAlign: "center",
        padding: "8px",
      }}
    >
      <p style={{ marginBottom: "0", marginTop: "0" }}>
        &copy;2023 Motilal Nehru NIT | All Rights Reserved
      </p>
      <p className="text-center" style={{ margin: "2px 0" }}>
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
