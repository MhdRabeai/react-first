import { Outlet } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../../Context/userContext";
import Loading from "../../../Components/Loading";
import Cookies from "universal-cookie";
export default function PersistLogin() {
  // Get Current User
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);


  
// we used a library to save token in cookie
// npm i universal-cookie

  // Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  // console.log('getToken',getToken);
  
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          })
          .then((res) => {
            // Sava a new Token At Cookie when he Logged in
            cookie.set("Bearer", res.data.token);
            // console.log(res);
            context.setAuth((prev) => {
              return { userDetails: res.data.user, token: res.data.token };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
