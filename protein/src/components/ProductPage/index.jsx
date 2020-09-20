import React, { useState, useEffect } from "react";
import "./product.scss";
import { connect } from "react-redux";

const ProductPage = ({ shopStore }) => {
	const [currentProduct, setProd] = useState([]);
	const currentUrl = window.location.href.split("/")[
		window.location.href.split("/").length - 1
	];

	useEffect(() => {
		shopStore.products.map(
			(el) => el.productEngl === currentUrl && setProd(el)
		);
	});

	return (
		<>
			{/* <div className="product-page">
				<h1>{currentProduct.title}</h1>
				<h2>{currentProduct.productDescription}</h2>
			</div> */}
			<div className='product-page'>
				<img src='/photo.jpg' className='product-photo' />
				<div className='product-info'>
					<div className='product-title'>{currentProduct.title}</div>
					<div className='product-suptitle'>{currentProduct.productDescription}Сывороточный протеин № 1 в Великобритании — отличное дополнение к вашему ежедневному рациону</div>
					<div className='product-price'><span>Скидка</span> {currentProduct.price} руб</div>
					<div className='product-quantity'>
						<button className='add-product'>+</button>
						<input className='product-number'></input>
						<button className='remove-product'>-</button>
					</div>
					<div className='product-add'>Добавить в корзину</div>
				</div>
			</div>
		</>
	);
};

export default connect((state) => ({
	shopStore: state.shopStore,
}))(ProductPage);
