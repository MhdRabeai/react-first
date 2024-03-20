import { useState, useEffect ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Context/userContext";
import  axios  from 'axios';

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;

  const id = +window.location.pathname.split("/").slice(-1);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{headers:{
      Authorization: "Bearer " + token,
    }})
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let ress = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Sava At Cookie when he signed in

      nav("/dashboard/users");
      // window.location.pathname = props.pathname;
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  return (
    <div className="parent">
      <div className="container">
        <h1>Update User</h1>
        <div className="register create">
          <form action="" onSubmit={submit} className="shadow">
            <div className="input">
              <label htmlFor="Name">Name: </label>

              <input
                id="Name"
                type="text"
                placeholder="Name .."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name === "" && accept && (
                <p className="error">User Name is required</p>
              )}
            </div>
            <div className="input">
              <label htmlFor="Email">Email: </label>
              <input
                id="Email"
                type="email"
                placeholder="Email .."
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              {accept && emailError && (
                <p className="error">Email is already been taken</p>
              )}
            </div>
            <div className="input">
              <label htmlFor="Password">Password: </label>
              <input
                id="Password"
                type="password"
                placeholder="Password .."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 8 && accept && (
                <p className="error">Pssword Most Be More Than 8 Char</p>
              )}
            </div>
            <div className="input">
              <label htmlFor="RePassword">Repeat Password: </label>
              <input
                id="RePassword"
                type="password"
                placeholder="Repeat Password .."
                value={passwordR}
                onChange={(e) => setPasswordR(e.target.value)}
              />
              {passwordR !== password && accept && (
                <p className="error">Password Doesn't Match</p>
              )}
            </div>
            <div className="btn">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
