import React, { useState } from "react";
import "../../Modules/Global.css";
import "../../Modules/Login/login.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { signUpApi } from "../../api/authApi";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [loginCred, setLoginCred] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChangefunc = (e, key) => {
    const val = e.target.value;
    setLoginCred((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const handleSubmit = () => {
    if (loginCred.name && loginCred.password && loginCred.email) {
      signUpApi(loginCred);
    }
  };
  return (
    <div className="global-parent">
      <div className="login-right flex-column">
        <h2>Welcome Back!</h2>
        <p className="text">
          To keep connected with us please
          <br /> login with your personal info
        </p>
        <Link to="/signin">
          <button className="login-switch-button">SIGN IN</button>
        </Link>
      </div>
      <div className="login-left flex-column">
        <h2>
          Sign In to
          <br /> Your Account
        </h2>
        <div className="input-box" style={{ marginTop: "10px" }}>
          <PermIdentityOutlinedIcon sx={{ color: "#9A9A9A" }} />
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Name"
            onChange={(e) => handleChangefunc(e, "name")}
          />
        </div>
        <div className="input-box">
          <EmailOutlinedIcon sx={{ color: "#9A9A9A" }} />
          <input
            style={{ width: "100%" }}
            type="email"
            placeholder="Email"
            onChange={(e) => handleChangefunc(e, "email")}
          />
        </div>
        <div className="input-box" style={{ marginBottom: "10px" }}>
          <LockOutlinedIcon sx={{ color: "#9A9A9A" }} />
          <input
            style={{ width: "100%" }}
            type="password"
            placeholder="Password"
            onChange={(e) => handleChangefunc(e, "password")}
          />
        </div>

        <Link to="/signin">
          <button className="login-button" onClick={() => handleSubmit()}>
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  );
}
