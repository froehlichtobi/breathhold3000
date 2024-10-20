import React from "react";

const Footer = () => {
  return (
    <div>
      <h4 className="footer">
        created by Tobias Fröhlich
        <br />
        <a
          style={{ marginRight: "50px" }}
          href="https://github.com/froehlichtobi"
          target="_blank"
        >
          GitHub{" "}
        </a>
        <a href="https://linkedin.com/in/tobias-froehlich" target="_blank">
          {" "}
          LinkedIn
        </a>
      </h4>
    </div>
  );
};

export default Footer;
