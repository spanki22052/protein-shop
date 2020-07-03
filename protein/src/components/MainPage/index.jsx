import React from "react";
import "./main.scss";

const MainPage = () => {
  const company = "Dagestan";
  const bodyWidth = window.innerWidth;

  return (
    <div className="main-page">
      <div className="header">
        <div className="navbar-block">
          <h1>{company}</h1>
          <div className="pbadge">
            <p>качество</p>
          </div>
        </div>

        <img
          className="small-green-box"
          src="./svg/small-green-box.svg"
          alt="greenround"
        />
        <img
          className="small-proteins"
          src="/images/small-proteins.png"
          alt="proteinsadvertisement"
        />

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
          style={
            bodyWidth > 900
              ? { backgroundImage: 'url("/svg/green-products-block.svg")' }
              : {
                  backgroundImage: 'url("/svg/green-small-products-block.svg")',
                }
          }
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
            <p>
              Тренируюсь два года, с начала тренировки закупаюсь в этом
              магазине.
            </p>
          </div>
          <div className="review-block">
            <img src="/images/dsh.jpg" alt="manphoto" />
            <h1>Амир, 18 лет</h1>
            <p>
              Недавно начал тренироваться. В {company} все дешево и качественно.
            </p>
          </div>
        </div>

        <div className="train-with-us-block">
          <div
            className="left-block"
            style={
              bodyWidth > 900
                ? { backgroundImage: 'url("/svg/muscle-man.svg")' }
                : {
                    backgroundImage: 'url("/svg/small-muscle-man.svg")',
                  }
            }
          >
            <div className="left-padding">
              <img src="/svg/flexing-man.svg" alt="muscleman" />
              <div className="white-text-block">
                <h1>Заказывайте протеины в {company}.ml</h1>
                <button>Перейти в магазин</button>
              </div>
            </div>
          </div>
          <div
            className="right-block"
            style={{ background: "url('/svg/train-with-us.svg')" }}
          >
            <div className="right-padding">
              <img src="/svg/yellow-muscle-man.svg" alt="yellow" />
              <h1>Заряжайтесь энергией вместе с {company}.</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Spanki prod.</p>
        <div className="icons-block">
          <img className="vk-icon" src="/svg/vk.svg" alt="vk" />
          <img className="git-icon" src="/svg/git.svg" alt="git" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
