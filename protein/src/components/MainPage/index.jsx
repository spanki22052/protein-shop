import React from "react";
import "./main.scss";

const MainPage = () => {

    const company = "DagProtein";

  return (
    <div className="main-page">
      <div className="header">
        <div className="navbar-block">
          <h1>{company}</h1>
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
            Мы распологаем одной из лучших протеиновых продукций в Махачкале.
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

        <div className="reviews-block">
          <div className="review-block">
            <img src="/images/magomed.jpg" alt="manphoto" />
            <h1>Магомед, 21 год</h1>
            <p>Пользуюсь продукцией {company} около года. Всем доволен.</p>
          </div>
          <div className="review-block">
            <img src="/images/man.jpg" alt="manphoto" />
            <h1>Супиян, 24 года</h1>
            <p>Тренируюсь два года, с начала тренировки закупаюсь в этом магазине.</p>
          </div>
          <div className="review-block">
            <img src="/images/dsh.jpg" alt="manphoto" />
            <h1>Амир, 18 лет</h1>
            <p>Недавно начал тренироваться. В {company} все дешево и качественно.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
