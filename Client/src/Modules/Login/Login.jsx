import React, { useState } from "react";
import "../../Modules/Global.css";
import "../../Modules/Login/login.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signInApi } from "../../api/authApi";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [loginCred, setLoginCred] = useState({
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

  const handleSubmit = async () => {
    if (loginCred.password && loginCred.email) {
      const response = await signInApi(loginCred);
      try {
        if (response.data.token) {
          toast.success("Sign in successful", {
            position: toast.POSITION.BOTTOM_CENTER,
            toastId: "toast",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
        return response;
      } catch (error) {
        toast.error("Sign in failed", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "toast",
        });
      }
    } else {
      toast.error("Please provide both email and password.", {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: "toast",
      });
    }
  };

  return (
    <div className="global-parent">
      <div className="login-left flex-column">
        <h2>
          Sign In to
          <br /> Your Account
        </h2>
        <div className="input-box" style={{ marginTop: "10px" }}>
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
        <a
          href=""
          style={{ color: "black", fontWeight: "700", marginBottom: "10px" }}
        >
          Forgot Password?
        </a>
        <Link>
          <button className="login-button" onClick={handleSubmit}>
            SIGN IN
          </button>
        </Link>
        <Link to="/">
          <button
            className="login-button"
            style={{ backgroundColor: "#003f62" }}
          >
            RETURN TO HOME
          </button>
        </Link>
      </div>
      <div className="login-right flex-column">
        <h2>Hello Friend!</h2>
        <p className="text">
          Enter your personal details and <br /> start your journey with us
        </p>
        <Link to="/signup">
          <button className="login-switch-button">SIGN UP</button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}
