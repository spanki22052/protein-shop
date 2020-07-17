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
        <h1>о Biomart</h1>
        <Link class="go-to" to="/about">
          О нас
        </Link>
        <a class="go-to" href="http://instagram.com">
          Наш инстаграм
        </a>
        <Link class="go-to" to="/shop">
          Перейти в магазин
        </Link>
      </div>
      <div className="third-block">
            <h1>Связаться с нами</h1>

            <div className="icons-block">
                <img className="instagram" src="/svg/instagram.svg" alt="inst"/>
                <img className="vk" src="/svg/vk.svg" alt="vk"/>
                <img className="phone" src="/svg/phone.svg" alt="phone"/>
            </div>
      </div>
    </div>
  );
};

export default Footer;
