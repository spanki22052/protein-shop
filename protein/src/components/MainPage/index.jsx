import React from "react";
import "./main.scss";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="header">
        <div className="navbar-block">
          <h1>DagProtein</h1>
          <div className="pbadge">
            <p>качество</p>
          </div>
          <ul>
            <li>
              <a href="/shop"> магазин </a>
            </li>
            <li>
              <a href="/map"> мы на карте </a>
            </li>
            <li>
              <a href="/contacts"> контакты </a>
            </li>
          </ul>
        </div>
        <img
          className="green-box"
          src="./svg/green-header-round.svg"
          alt="greenround"
        />
        <img
          className="proteins"
          src="/images/proteins-ad.png"
          alt="proteinsadvertisement"
        />
        <div className="text-block">
          <h2>
            Мы распологаем одной из лучших протеиновых продукция в Махачкале.
          </h2>
          <button> Перейти к товарам </button>
        </div>
      </div>

      <div className="main">
        <div
          className="products-block"
          style={{ background: 'url("/svg/green-products-block.svg")' }}
        >
          <div className="products-padding">
            <div className="product-block">
              <img src="/images/protein1.png" alt="proteinproduct" />
              <button>Подробнее</button>
            </div>
            <div className="product-block">
              <img src="/images/protein1.png" alt="proteinproduct" />
              <button>Подробнее</button>
            </div>
            <div className="product-block">
              <img src="/images/protein1.png" alt="proteinproduct" />
              <button>Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
