import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";

import loginSVG from "../../assets/icons/login.svg";

function Navbar() {
  return (
    <nav className="max-w-[75rem] mx-auto flex items-center justify-between mx-auto p-5">
      <Link to="/">
        <h1 className="text-xl md:text-2xl">Covercraft</h1>
      </Link>

      <ul className="flex items-center gap-3 text-sm">
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
      </ul>
    </nav>
  );
}

export default Navbar;
