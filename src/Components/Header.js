import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
import axios from "axios";
export default function Header() {
  // Get Cookie
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleLogOut() {
    await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }

  return (
    <header className=" d-flex container shadow">
      <div className="left d-flex">
        <Link to={"/"}>
          <h2>Home</h2>
        </Link>
        <Link to={"/"}>
          <h2>About</h2>
        </Link>
      </div>
      <div className="right d-flex">
        {!token && (
          <div className="d-flex">
            <Link
              to={"/register"}
              className="register-nav"
              style={{ textAlign: "center" }}
            >
              Register
            </Link>
            <Link
              to={"/login"}
              className="register-nav"
              style={{ textAlign: "center" }}
            >
              Login
            </Link>
          </div>
        )}
        {token && (
          <div className="d-flex">
            <Link
              to={"/dashboard/users"}
              className="register-nav"
              style={{ textAlign: "center" }}
            >
              Dashboard
            </Link>
            <div
              onClick={handleLogOut}
              className="register-nav"
              style={{ textAlign: "center" }}
            >
              LogOut
            </div>
          </div>
        )}
        {/* <div className="register-nav" onClick={logout}>
            Logout
          </div> */}
      </div>
    </header>
  );
}
