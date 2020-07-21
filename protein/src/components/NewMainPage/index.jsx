import React, { useEffect, useState } from "react";
import "./new.scss";

const firebase = require("firebase");

function NewMainPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  var counter = 0;

  const hexObject = {
    "В НАЛИЧИИ" : "white",
    "СКИДКА 10%": "#EC2929",
    "ПРЕДЗАКАЗ": "#265ECB",
    "НЕТ В НАЛИЧИИ": "#BCBCBC"
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .doc("productsObject")
      .get()
      .then((info) => {
        setProducts(info.data().products);
        let newCategories = [];
        for (var key in info.data().products) {
          newCategories.push(key);
        }
        setCategories(newCategories);
      });
  }, []);

  return (
    <div className="main-page">
      <div
        style={{ backgroundImage: 'url("/images/biomart-is.png")' }}
        className="photo-block"
      >
        <h1>
          <span className="bold-text">BIOMART</span> - лучшее спортивное питание
          для всей семьи
        </h1>
      </div>

      <div className="yellow-down-block">
        <h1>Для постоянных посетителей существует система скидок ( до 15% )</h1>
        <button>Купить сейчас</button>
      </div>

      <div className="big-gray-block">
        <h1 className="max-width">Сегодня в трендах:</h1>
        <div className="white-boxes">
          {categories.map((element) => {
            return (
              products[element].length > 0 &&
              products[element].map((el, index) => {
                counter += 1;
                return (
                  counter < 6 && (
                    <div key={index} className="white-product-box">
                      {console.log(el)}
                      <div className="top-side">
                        <div className="badge" style={{ backgroundColor: hexObject[el.productBadge] }}>{el.productBadge}</div>

                        <img src="/images/supermarket1.png" alt="supermarket" />
                      </div>
                      <img
                        className="product-image"
                        src={el.image}
                        alt="protein"
                      />
                      <h1>{el.title}</h1>
                      <h2>{el.price}p</h2>
                    </div>
                  )
                );
              })
            );
          })}
        </div>
      </div>

      <div className="big-gray-block">
        <h1 className="max-width">Рекомендуем:</h1>

        <div className="white-boxes">

          {categories.map((element) => {
            return (
              products[element].length > 0 &&
              products[element].map((el, index) => {
                counter += 1;
                return (
                  counter > 5 &&
                  counter < 11 && (
                    <div key={index} className="white-product-box">
                      {console.log(el)}
                      <div className="top-side">
                        <div className="badge" style={{ backgroundColor: hexObject[el.productBadge] }}>{el.productBadge}</div>

                        <img src="/images/supermarket1.png" alt="supermarket" />
                      </div>
                      <img
                        className="product-image"
                        src={el.image}
                        alt="protein"
                      />
                      <h1>{el.title}</h1>
                      <h2>{el.price}p</h2>
                    </div>
                  )
                );
              })
            );
          })}
        </div>
      </div>

      <div className="green-block">
        <h1>
          Для постоянных покупателей магази будет задействована система скидок.
        </h1>
      </div>
    </div>
  );
}

export default NewMainPage;