import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
            history.push(`/${userName}/${res.data.id}/posts`);
          }
        });
    }
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-home">
        <span>Application Tracker</span>
        <div className="auth-form-card">
          <div className="board-container">
            <div className="board">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="user-container">
            <div className="user">
              <div id="head"></div>
              <div id="torso"></div>
              <div id="arm"></div>
            </div>
          </div>
        </div>
      </div>
      <form className="auth-form">
        <span>LOGIN</span>
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
        <button className="auth-btn" onClick={handleClick}>
          Login
        </button>
        <h3>{formResult}</h3>
        <Link to="/register">New User? Register here</Link>
      </form>
    </div>
  );
}

export default Login;
