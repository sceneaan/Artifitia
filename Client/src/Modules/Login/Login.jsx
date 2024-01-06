import React from "react";
import "../../Modules/Global.css";
import "../../Modules/Login/login.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  return (
    <div className="global-parent">
      <div className="login-left flex-column">
        <h2>
          Sign In to
          <br /> Your Account
        </h2>
        <div className="input-box" style={{ marginTop: "10px" }}>
          <EmailOutlinedIcon sx={{ color: "#9A9A9A" }} />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-box" style={{ marginBottom: "10px" }}>
          <LockOutlinedIcon sx={{ color: "#9A9A9A" }} />
          <input type="password" placeholder="Password" />
        </div>
        <a
          href=""
          style={{ color: "black", fontWeight: "700", marginBottom: "10px" }}
        >
          Forgot Password?
        </a>
        <button className="login-button">SIGN IN</button>
      </div>
      <div className="login-right flex-column">
        <h2>Hello Friend!</h2>
        <p className="text">
          Enter your personal details and <br /> start your journey with us
        </p>
        <button className="login-switch-button">SIGN UP</button>
      </div>
    </div>
  );
}
