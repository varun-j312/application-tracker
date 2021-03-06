import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
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
        .post("http://localhost:9000/register", {
          username: userName,
          userpass: userPass,
        })
        .then((res) => setFormResult(res.data));
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
        <span>REGISTER</span>
        <input
          type="text"
          name="username"
          value={userName}
          onChange={handleNameChange}
          placeholder="Enter username"
          required
        />
        <input
          type="password"
          name="userpass"
          value={userPass}
          onChange={handlePassChange}
          placeholder="Enter password"
          required
        />
        <button className="auth-btn" onClick={handleClick}>
          Register
        </button>
        <h3>{formResult}</h3>
        <Link to="/login">Already registered? Login here!</Link>
      </form>
    </div>
  );
}

export default Register;
