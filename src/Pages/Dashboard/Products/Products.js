import { useContext, useEffect, useState } from "react";
import { User } from "../../Context/userContext";
import  axios  from 'axios';
import  {Link}  from 'react-router-dom';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(1);
  
  const context = useContext(User);
  const token = context.auth.token;
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/show`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [update]);

  const showProduct = products.map((ele, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{ele.title}</td>
      <td>{ele.description}</td>
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
        `http://127.0.0.1:8000/api/product/delete/${id}`,
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
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProduct}</tbody>
      </table>
      
    </div>
  );
}
