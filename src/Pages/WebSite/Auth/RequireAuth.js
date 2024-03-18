import { useContext } from "react";

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { User } from "../Context/userContext";

export default function RequireAuth() {
  const user = useContext(User);
  console.log(user);
  const location = useLocation();
  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={"/login"} />
  );
}
