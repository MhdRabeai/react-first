import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink to="/dashboard/users" className="item-link">
        <i className="fa-solid fa-users"></i>
        Users
      </NavLink>
      <NavLink to="/dashboard/user/create" className="item-link">
        <i className="fa-solid fa-user-plus"></i>
        New User
      </NavLink>
    </div>
  );
}
