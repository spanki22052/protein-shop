import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-element">
      <div className="first-block">
        <h1>BIOMART</h1>
      </div>

      <div className="second-block">
        <h1>Biomart</h1>
        <Link className="go-to" to="/about">
          О нас
        </Link>
        <a className="go-to" href="https://www.instagram.com/biomart_hq/">
          Наш инстаграм
        </a>
        <Link className="go-to" to="/shop">
          Перейти в магазин
        </Link>
      </div>
      <div className="third-block">
        <h1>Связаться с нами</h1>

        <div className="icons-block">
          <a href="https://www.instagram.com/biomart_hq/">
            <img className="instagram" src="/svg/instagram.svg" alt="inst" />
          </a>
          <a
            href="tel:+7-928-592-13-83"
            style={{ textDecoration: "none", color: "black" }}
          >
            <img className="phone" src="/svg/phone.svg" alt="phone" />
          </a>
        </div>
        <div className="phoneNum">
          <a
            href="tel:+7-928-592-13-83"
            style={{ textDecoration: "none", color: "black" }}
          >
            +7-928-592-13-83
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
