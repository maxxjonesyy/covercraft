import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import CoverletterCreate from "./views/CoverLetterCreate";
import CoverLetterReady from "./views/CoverLetterReady";

function App() {
  return (
    <div className="min-h-screen px-5 bg-gradient-to-b from-stone-100 to-zinc-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coverletter" element={<CoverletterCreate />} />
        <Route path="/coverletter/result" element={<CoverLetterReady />} />
      </Routes>
    </div>
  );
}

export default App;
