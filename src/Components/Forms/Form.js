import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../Pages/WebSite/Context/userContext";
export default function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accept, setAccept] = useState(false);

  const userNow = useContext(User);
  console.log(userNow);
  const styleRegister = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const form = {
    width: "100%",
  };
  const btnWidth = {
    width: "100%",
  };

  // to update those props every change in parent
  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);
  async function submit(e) {
    e.preventDefault();

    try {
      let ress = await axios.post(`http://127.0.0.1:8000/api/${props.url}`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR,
      });
      const token = ress.data.data.token;
      const userDetails = ress.data.data.user;

      userNow.setAuth({
        token,
        userDetails,
      });
      // window.location.pathname = props.pathname;
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <div className="register" style={props.styleRegister && styleRegister}>
      <form
        action=""
        onSubmit={submit}
        style={props.form && form}
        className="shadow"
      >
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
          {accept && emailError === 422 && (
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
          <button type="submit" style={props.fulwidth && btnWidth}>
            {props.button}
          </button>
        </div>
      </form>
    </div>
  );
}
