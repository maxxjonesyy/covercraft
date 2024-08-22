import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import CoverletterCreate from "./views/CoverLetterCreate";
import CoverLetterReady from "./views/CoverLetterReady";

function App() {
  return (
    <div className="min-h-screen px-5 bg-gradient-to-b from-white via-white to-indigo-100/80">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coverletter" element={<CoverletterCreate />} />
        <Route path="/coverletter/result" element={<CoverLetterReady />} />
      </Routes>
    </div>
  );
}

export default App;
