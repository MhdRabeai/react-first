import { Outlet } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../Context/userContext";
import Loading from "../../../Components/Loading";
export default function PersistLogin() {
  // Get Current User
  const [loading, setLoading] = useState(true);
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            context.setAuth((prev) => {
              return { ...prev, token: res.data.token };
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


// we used a library to save token in cookies
// npm i universal-cookie