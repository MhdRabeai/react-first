import SignUp from "./Pages/WebSite/Auth/SignUp";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/WebSite/Home";
import Dashboard from "./Pages/Dashboard/Dashbord";
import Users from "./Pages/Dashboard/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import RequireAuth from "./Pages/WebSite/Auth/RequireAuth";
import PersistLogin from "./Pages/WebSite/Auth/PersistLogin";
import Login from "./Pages/WebSite/Auth/Login";
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Protacted Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
