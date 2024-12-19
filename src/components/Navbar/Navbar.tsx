import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ButtonLink } from "../index";
import { Zap } from "lucide-react";

import {
  contactSVG,
  profileSVG,
  tokenSVG,
  loginSVG,
  expandableArrowSVG,
} from "../../assets/index";

function Navbar() {
  const { user } = useContext(UserContext);
  const tokenCount = user?.tokenCount;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm w-full">
      <div className="flex items-center justify-between mx-auto py-5 max-w-[75rem]">
        <Link to="/" className="flex items-center gap-1 px-4">
          <Zap className="w-6 h-6 md:w-8 md:h-8 text-accentBlue" />
          <span className="text-xl md:text-2xl font-bold text-gray-800">
            Covercraft
          </span>
        </Link>

        <ul className="flex items-center gap-1 text-sm px-4">
          {user ? (
            <>
              <li>
                <ButtonLink text="Create" pathname="/coverletter" />
              </li>
              <li>
                <DropDownMenu tokenCount={tokenCount} />
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink text="Login" pathname="/login" />
              </li>
              <li>
                <ButtonLink
                  text="Register"
                  pathname="/register"
                  image={{ url: loginSVG, alt: "click to login" }}
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

function DropDownMenu({ tokenCount }: { tokenCount: number | undefined }) {
  const { logout } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(visible: boolean) {
    setIsMenuOpen(visible);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}>
      <div className="flex items-center gap-1 px-4 py-1">
        <button className="font-bold">Menu</button>
        <img
          src={expandableArrowSVG}
          alt="expand menu"
          className={`${
            isMenuOpen ? "rotate-[180deg]" : "rotate-[270deg]"
          } transition-transform duration-300`}
        />
      </div>

      {isMenuOpen && (
        <aside className="absolute top-7 right-0 w-52 rounded border border-gray-200 shadow-md bg-white">
          <div className="flex flex-col">
            <p className="text-center p-2.5 border-b border-gray-200">
              Tokens: <b className="text-accentBlue text-base">{tokenCount}</b>
            </p>

            <Link
              className="flex items-center gap-2 border-b border-gray-200 p-2.5 transition-color duration-300 hover:bg-gray-100"
              to="/profile">
              <img src={profileSVG} alt="view profile" />
              Profile
            </Link>

            <Link
              className="flex items-center gap-2 text-center border-b border-gray-200 p-2.5 transition-color duration-300 hover:bg-gray-100"
              to="/token">
              <img src={tokenSVG} alt="purchase tokens" />
              Add tokens
            </Link>

            <Link
              className="flex items-center gap-2 text-center border-b border-gray-200 p-2.5 transition-color duration-300 hover:bg-gray-100"
              to="https://tcxfl25krmr.typeform.com/to/EcPulg8v"
              target="_blank">
              <img src={contactSVG} alt="contact us" />
              Contact
            </Link>

            <button
              onClick={logout}
              className="p-2.5 bg-accentBlue/80 text-white transition-color duration-300 hover:bg-accentBlue rounded-b-md">
              Logout
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

export default Navbar;
