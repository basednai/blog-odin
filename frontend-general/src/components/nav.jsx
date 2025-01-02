// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <>
      <div className="navbar mt-4 px-0">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-3xl">
            Odin-Blog
          </Link>
        </div>

        <div className="dropdown dropdown-end flex-none">
          <div role="button" className="btn" tabIndex="0">
            Menu
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] w-52 rounded-lg border bg-base-100 p-2 shadow"
          >
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/post/new"> New Post</Link>
            </li>
            <li>
              {localStorage.getItem("authToken") ? (
              <Link to="/logout">Log Out</Link>
              ) : (
                <Link to="/login">Log In</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

// Nav.propTypes = {

// };
