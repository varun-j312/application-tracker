import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

function Post(props) {
  function handleDelete() {
    axios
      .post("http://localhost:9000/delete", {
        applicationId: props.id,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  }

  return (
    <div className="post">
      <div className="post-left">
        <h3 className="post-role">{props.role}</h3>
        <p className="post-company">{props.company}</p>
        <p className="post-location">{props.location}</p>
        <p className="post-description">{props.description}</p>
        <p className="post-salary">{props.salary} / month</p>
      </div>
      <div className="post-right">
        <div className="post-btn-container">
          <Link to={`/post/${props.userId}/${props.id}`} title="Read More">
            <button className="post-read">
              <div>
                <div></div>
              </div>
            </button>
          </Link>
          <Link to={`/edit/${props.userId}/${props.id}`} title="Edit">
            <button className="post-edit">
              <div></div>
            </button>
          </Link>
          <button className="post-delete" onClick={handleDelete} title="Delete">
            <div></div>
            <div></div>
          </button>
        </div>
        <p
          className={
            props.status === "Applied" ? "post-status-applied" : "post-status"
          }
        >
          {props.status}
        </p>
        <p className="post-applied-since">
          {props.status === "Applied" ? moment(props.date).fromNow() : ""}
        </p>
        <a
          className="post-link"
          href={props.link}
          target="_blank"
          rel="noreferrer"
        >
          {props.source}
        </a>
        <p>Contact no. {props.contact}</p>
      </div>
    </div>
  );
}

export default Post;
