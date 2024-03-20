import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../../Context/userContext";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  console.log(image);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // if we have an image , we will do this
      const formDate = new FormData();
      formDate.append("title", title);
      formDate.append("description", desc);
      formDate.append("image", image);
      let ress = await axios.post(
        `http://127.0.0.1:8000/api/product/create`,
        formDate,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/products");
      // window.location.pathname = props.pathname;
    } catch (err) {
      console.log(err);
      setAccept(true);
    }
  }
  return (
    <div className="parent">
      <div className="container">
        <h1>Create User</h1>
        <div className="register create">
          <form action="" onSubmit={submit} className="shadow">
            <div className="input">
              <label htmlFor="Name">Title: </label>

              <input
                id="Name"
                type="text"
                placeholder="Title .."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {title === "" && accept && (
                <p className="error">Title is required</p>
              )}
            </div>
            <div className="input">
              <label htmlFor="Email">Description: </label>
              <input
                id="Email"
                type="text"
                placeholder="Description .."
                value={desc}
                required
                onChange={(e) => setDesc(e.target.value)}
              />

              {/* {accept && emailError && (
                <p className="error">Email is already been taken</p>
              )} */}
            </div>
            <div className="input">
              <label htmlFor="Password">image: </label>
              <input
                id="Password"
                type="file"
                placeholder="Image .."
                onChange={(e) => setImage(e.target.files.item(0))}
              />
              {/* {password.length < 8 && accept && (
                <p className="error">Pssword Most Be More Than 8 Char</p>
              )} */}
            </div>

            <div className="btn">
              <button type="submit">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
