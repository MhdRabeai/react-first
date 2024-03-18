import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../WebSite/Context/userContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(1);
  const context = useContext(User);
  const token = context.auth.token;
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/show`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [update]);

  const showDate = users.map((ele, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{ele.name}</td>
      <td>{ele.email}</td>
      <td>
        <div className="icons">
          <Link to={`${ele.id}`}>
            <i className="fa-regular fa-pen-to-square square"></i>
          </Link>

          <i
            className="fa-regular fa-trash-can"
            onClick={() => deleteUser(ele.id)}
          ></i>
        </div>
      </td>
    </tr>
  ));
  async function deleteUser(id) {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="users-table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showDate}</tbody>
      </table>
      
    </div>
  );
}
