import React from "react";

const Footer = () => {
  return (
    <div>
      <h4 className="footer">
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
        <br />
        created by Tobias Fröhlich
      </h4>
    </div>
  );
};
export default Footer;
