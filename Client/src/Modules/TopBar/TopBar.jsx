import React from "react";
import "./topBar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="top-bar-parent">
      <div className="search-ctn">
        <input type="text" placeholder="Search any things" />
        <button>Search</button>
      </div>

      <div className="right-cart-ctn">
        <div className="sign-in">
          <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
          <span>3</span>
          <p>Cart</p>
        </div>
        <div className="sign-in">
          <FavoriteBorderOutlinedIcon sx={{ color: "white" }} />
          <span>3</span>
          <Link to="/signin"><p>Sign in</p></Link>
          
        </div>
      </div>
    </div>
  );
}

export default TopBar;
