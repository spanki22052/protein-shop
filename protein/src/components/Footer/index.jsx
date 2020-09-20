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
				<a className="go-to" href="http://instagram.com">
					Наш инстаграм
        </a>
				<Link className="go-to" to="/shop">
					Перейти в магазин
        </Link>
			</div>
			<div className="third-block">
				<h1>Связаться с нами</h1>

				<div className="icons-block">
					<img className="instagram" src="/svg/instagram.svg" alt="inst" />
					<img className="vk" src="/svg/vk.svg" alt="vk" />
					<img className="phone" src="/svg/phone.svg" alt="phone" />
				</div>
				<div className='phoneNum'>+7999-525-34-52</div>
			</div>
		</div>
	);
};

export default Footer;
