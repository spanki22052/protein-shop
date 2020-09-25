import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton, withStyles, Badge } from "@material-ui/core";
import { connect } from "react-redux";
import HamburgerMenu from 'react-hamburger-menu';

const firebase = require("firebase");

const NavbarComponent = ({
	prods,
	sendCategoriesObject,
	sendProductsObject,
	allItems,
}) => {

	const StyledBadge = withStyles((theme) => ({
		badge: {
			right: -3,
			top: "-5px",
			// border: `0.5px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
		},
	}))(Badge);

	useEffect(() => {
		firebase
			.firestore()
			.collection("products")
			.doc("categories")
			.get()
			.then(async (info) => {
				(await info.data()) !== undefined &&
					sendCategoriesObject(info.data().category);
			});

		firebase
			.firestore()
			.collection("products")
			.doc("productsObject")
			.get()
			.then(async (info) => {
				(await info.data()) !== undefined &&
					sendProductsObject(info.data().products);
			});
	}, [sendProductsObject, sendCategoriesObject]);


	const [menuState, openMenu] = useState(false);

	return (
		<nav className='navBar'>
			<div className='navBarWrapper'>
				<div className='navBarLogo'>
					<Link onClick={
						() => {
							menuState && openMenu(!menuState);
							document.querySelector("body").classList.remove("lock");
						}}
						to='/'>
						<span className='bio'>BIO</span>
						<span className='mart'>MART</span>
					</Link>
				</div>
				<ul className={!menuState === true ? 'navBarMenu' : 'navBarMenu active'}>
					<li className='navBarMenuItem'>
						<Link onClick={
							() => {
								menuState && openMenu(!menuState);
								document.querySelector("body").classList.remove("lock");
							}}
							to='/shop'>Категории</Link>
					</li>
					<li className='navBarMenuItem dropdown'>
						<span>Бренды</span>
						<ul className="dropdown-content">
							<li>One</li>
							<li>Two</li>
							<li>Три</li>
						</ul>
						<img src='/svg/Vector.svg' alt="ad" />
					</li>
					<li className='navBarMenuItem'>
						<Link onClick={
							() => {
								menuState && openMenu(!menuState);
								document.querySelector("body").classList.remove("lock");
							}}
							to='/about'>О нас</Link>
					</li>
					<li className='navBarMenuItem'>
						<IconButton
							className="icon-button"
							aria-label="cart"
							style={{ marginTop: "10px" }}
						>
							<Link onClick={
								() => {
									menuState && openMenu(!menuState);
									document.querySelector("body").classList.remove("lock");
								}}
								to="/cart">
								<StyledBadge badgeContent={prods.counter} color="secondary">
									<ShoppingCartIcon
										style={{
											marginTop: "-10px",
											fill: "#eee",
											outline: "none",
										}}
									/>
								</StyledBadge>
							</Link>
						</IconButton>
					</li>
				</ul>
				<div className='navBurger'>
					<HamburgerMenu
						isOpen={menuState}
						menuClicked={() => {
							openMenu(!menuState);
							document.querySelector("body").classList.toggle("lock");
							// document.querySelector("body").classList.toggle("lock");
						}}
						width={25}
						height={20}
						strokeWidth={2}
						rotate={0}
						color='white'
						borderRadius={0}
						animationDuration={0.5}
					/>
				</div>
			</div>
		</nav >
	);
};

export default connect(
	(state) => ({
		prods: state.addItem,
		allItems: state.shopStore,
	}),
	(dispatch) => ({
		sendCategoriesObject: (payload) => {
			dispatch({
				type: "ADD_CATEGORIES",
				payload: payload,
			});
		},

		sendProductsObject: (payload) => {
			dispatch({
				type: "ADD_PRODUCTS",
				payload: payload,
			});
		},
	})
)(NavbarComponent);