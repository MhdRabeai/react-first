import { useState, useEffect } from "react";

import Form from "../../../Components/Forms/Form";
export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const id = +window.location.pathname.split("/").slice(-1);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  return (
    <div className="container">
      <h1>Update User</h1>
      <div className="parent">
        <Form
          button="Update"
          name={name}
          email={email}
          url={`user/update/${id}`}
          pathname={`dashboard/users`}
          hasLocalStorage={false}
          form={true}
          fulwidth={true}
        />
      </div>
    </div>
  );
}
