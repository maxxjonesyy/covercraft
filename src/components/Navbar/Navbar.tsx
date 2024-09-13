import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { ButtonLink, Button } from "../index";
import loginSVG from "../../assets/icons/login.svg";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="max-w-[75rem] mx-auto flex items-center justify-between mx-auto p-5">
      <Link to="/">
        <h1 className="text-xl md:text-2xl">Covercraft</h1>
      </Link>

      <ul className="flex items-center gap-3 text-sm">
        {user ? (
          <>
            <li>
              <ButtonLink text="Create Cover Letter" pathname="/coverletter" />
            </li>
            <li>
              <Button text="Logout" onClick={logout} />
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

export default Navbar;
