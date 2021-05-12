import { useState } from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  let [username] = useState(props.userName);
  let [userid] = useState(props.userId);
  let [routename] = useState(props.routeName);

  const navStyle = {
    textDecoration: "none",
  };

  return (
    <nav>
      <Link to={`/${username}/${userid}/posts`} style={navStyle} title="Home">
        <div className="nav-home-container">
          <div id="roof"></div>
          <div id="bottom">
            <div id="door"></div>
          </div>
        </div>
      </Link>
      <h3 id="nav-route">
        {username} / {routename}
      </h3>
      <Link to="/logout" title="Logout">
        <div className="nav-logout-container">
          <div id="door-frame">
            <div id="door-exit">
              <div id="door-knob"></div>
            </div>
          </div>
        </div>
      </Link>
    </nav>
  );
}

export default Nav;
