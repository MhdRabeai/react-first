import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <div className="d-flex container shadow top-bar">
      <Link to={"/"}>
        <h2>Store</h2>
      </Link>
      <Link to={"/"} className="register-nav" style={{ textAlign: "center" }}>
        Go To WebSite
      </Link>
    </div>
  );
}
