import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";

import "./dashboard.css";
import { Outlet } from "react-router-dom";
export default function Dashbord() {
  return (
    <div>
      <TopBar />
      <div className="dash-parent">
        <SideBar />
        <div className="dash-child">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
