import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  let history = useHistory();
  const [formResult, setFormResult] = useState("");
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  function handleNameChange(e) {
    setUserName(e.target.value);
  }
  function handlePassChange(e) {
    setUserPass(e.target.value);
  }
  function handleClick(e) {
    e.preventDefault();
    if (userName !== "" && userPass !== "") {
      axios
        .post("http://localhost:9000/login", {
          username: userName,
          userpass: userPass,
        })
        .then((res) => {
          setFormResult(res.data.result);
          if (res.data.id !== 0) {
            history.push(`/posts/${res.data.id}`);
          }
        });
    }
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <input
          type="text"
          name="username"
          value={userName}
          onChange={handleNameChange}
          placeholder="Enter username"
          required
        ></input>
        <input
          type="password"
          name="userpass"
          value={userPass}
          onChange={handlePassChange}
          placeholder="Enter password"
          required
        ></input>
        <button className="auth-btn" type="submit" onClick={handleClick}>
          Login
        </button>
        <h3>{formResult}</h3>
      </form>
    </div>
  );
}

export default Login;
