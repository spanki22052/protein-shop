import React, { Component } from "react";
import "./shop.scss";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { IconButton, withStyles, Badge } from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
class ShopPage extends Component {
  render() {
    return (
      <div className="shop-page">
        <div className="shop-page__padding">
          <div className="main-page">
            <div className="header">
              <div className="navbar-block">
                <h1>Dagestan</h1>
                <div className="pbadge">
                  <p>качество</p>
                </div>
                <IconButton style={{ position: 'absolute', right: '25px', top: '27px' }} aria-label="cart">
                  <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingBasketIcon />
                  </StyledBadge>
                </IconButton>
              </div>
            </div>
          </div>
            <div className="shop-main">
                <div className="categories">
                        <h1>Категории</h1>
                        <div className="line"></div>
                </div>
                <div className="all-products"></div>
            </div>
        </div>
      </div>
    );
  }
}

export default ShopPage;
