import React from "react";
import "../../Modules/Global.css";
import "../../Modules/Login/login.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function SignUp() {
  return (
    <div className="global-parent">
      <div className="login-right flex-column">
        <h2>Welcome Back!</h2>
        <p className="text">
          To keep connected with us please<br /> login with your personal info
        </p>
        <button className="login-switch-button">SIGN IN</button>
      </div>
      <div className="login-left flex-column">
        <h2>
          Sign In to
          <br /> Your Account
        </h2>
        <div className="input-box" style={{ marginTop: "10px" }}>
          <PermIdentityOutlinedIcon sx={{ color: "#9A9A9A" }} />
          <input type="text" placeholder="Name" />
        </div>
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
        <button className="login-button">SIGN UP</button>
      </div>
    </div>
  );
}
