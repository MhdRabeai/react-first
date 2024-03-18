import { useContext } from "react";
import { useState } from "react";
import { User } from "./../Context/userContext";
import axios from "axios";
import Header from "./../../../Components/Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erre, setErr] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  var userNow = useContext(User);
  console.log(userNow);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let ress = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      });
      const token = ress.data.data.token;
      const userDetails = ress.data.data.user;

      userNow.setAuth({
        token,
        userDetails,
      });
      nav("/dashboard");
      // window.location.pathname = props.pathname;
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
        console.log(erre);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="parent">
        <div className="register">
          <h1>Login</h1>
          <form action="" onSubmit={submit} className="shadow">
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

            <div className="btn">
              <button type="submit">Login</button>
            </div>
            {accept && erre && (
              <p className="error login">Wrong Email or Password</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
