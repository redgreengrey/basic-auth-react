import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import Exit from "../Exit/Exit";
import { withAuth } from "../../Auth";

const Nav = withAuth(({ isAuthorized, username }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={styles.link}
            activeStyle={{ color: "#fff" }}
            exact
          >
            Home
          </NavLink>
        </li>
        {isAuthorized ? (
          <li>
            <NavLink
              to="/users"
              className={styles.link}
              activeStyle={{ color: "#fff" }}
            >
              Users
            </NavLink>
          </li>
        ) : null}
      </ul>
      {username && (
        <h3 style={{ color: "white", marginTop: "25px" }}>
          Hello,&nbsp;{username}
        </h3>
      )}
      {isAuthorized ? (
        <Exit />
      ) : (
        <ul>
          <li>
            <NavLink
              to="/login"
              className={styles.link}
              activeStyle={{ color: "#fff" }}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={styles.link}
              activeStyle={{ color: "#fff" }}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
});

export default Nav;
