import React, { useState } from "react";
import "./topBar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

function TopBar({ onSearch }) {
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("token");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="top-bar-parent">
      <div className="search-ctn">
        <input
          type="text"
          placeholder="Search any things"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="right-cart-ctn">
        <div className="sign-in">
          <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
          <span>3</span>
          <FavoriteBorderOutlinedIcon
            sx={{ color: "white", marginLeft: "15px", cursor: "pointer" }}
          />
          <span>3</span>
        </div>
        <div className="sign-in">
          {token ? (
            <Link to="/">
              <p onClick={handleSignOut}>Sign Out</p>
            </Link>
          ) : (
            <Link to="/signin">
              <p>Sign In</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
