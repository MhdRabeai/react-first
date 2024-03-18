import { Link } from "react-router-dom";
export default function Header() {
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
        <Link
          to={"/dashboard/users"}
          className="register-nav"
          style={{ textAlign: "center" }}
        >
          Dashboard
        </Link>
        {/* <div className="register-nav" onClick={logout}>
            Logout
          </div> */}
      </div>
    </header>
  );
}
