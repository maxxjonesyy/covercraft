import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/index";
import { Suspense, lazy } from "react";
import { Loader } from "./components/index";
import { Home } from "./views/index";

const Login = lazy(() => import("./views/Login"));
const Register = lazy(() => import("./views/Register"));
const CoverLetterCreate = lazy(() => import("./views/CoverLetterCreate"));
const CoverLetterReady = lazy(() => import("./views/CoverLetterReady"));
const Profile = lazy(() => import("./views/Profile"));
const Token = lazy(() => import("./views/Token"));

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-white to-indigo-100/80">
      <Navbar />

      <Suspense
        fallback={
          <div className="flex items-center justify-center pt-[6rem] p-5">
            <Loader size={32} colour="#00000" />
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coverletter" element={<CoverLetterCreate />} />
          <Route path="/coverletter/result" element={<CoverLetterReady />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/token" element={<Token />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
