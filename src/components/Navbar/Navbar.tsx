import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { ButtonLink } from "../index";
import loginSVG from "../../assets/icons/login.svg";
import expandableArrowSVG from "../../assets/icons/expandable-arrow.svg";
import contactSVG from "../../assets/icons/contact.svg";
import profileSVG from "../../assets/icons/profile.svg";
import tokenSVG from "../../assets/icons/token.svg";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="max-w-[75rem] mx-auto flex items-center justify-between mx-auto py-5">
      <Link to="/">
        <h1 className="text-xl md:text-2xl">Covercraft</h1>
      </Link>

      <ul className="flex items-center gap-1 text-sm">
        {user ? (
          <>
            <li>
              <ButtonLink text="Create" pathname="/coverletter" />
            </li>
            <li>
              <DropDownMenu />
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
    </nav>
  );
}

function DropDownMenu() {
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
        <aside className="absolute top-7 right-0 w-44 rounded border border-gray-200 shadow-md">
          <div className="flex flex-col">
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
              className="p-2.5 bg-accentBlue/80 text-white transition-color duration-300 hover:bg-accentBlue">
              Logout
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

export default Navbar;
