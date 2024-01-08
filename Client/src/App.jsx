import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login/Login";
import SignUp from "./Modules/Login/SignUp";
import Home from "./Modules/Home/Home";
import Product from "./Modules/SingleView/Product";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
