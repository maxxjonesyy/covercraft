import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/index";

import {
  Home,
  Login,
  Register,
  CoverLetterCreate,
  CoverLetterReady,
  Profile,
  Token,
} from "./views/index";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-100/80">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coverletter" element={<CoverLetterCreate />} />
        <Route path="/coverletter/result" element={<CoverLetterReady />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/token" element={<Token />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
