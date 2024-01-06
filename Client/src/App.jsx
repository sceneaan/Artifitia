import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login/Login";
import SignUp from "./Modules/Login/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
