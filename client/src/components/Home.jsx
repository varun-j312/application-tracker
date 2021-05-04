import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const linkStyle = {
    textDecoration: "none",
    color: "#000",
  };

  return (
    <div className="auth-btn-container">
      <Link className="auth-btn-link" style={linkStyle} to="/register">
        Register
      </Link>

      <Link className="auth-btn-link" style={linkStyle} to="/login">
        Login
      </Link>

      <Link className="auth-btn-link" style={linkStyle} to="/#">
        Sign in with Google
      </Link>
    </div>
  );
}

export default Home;
