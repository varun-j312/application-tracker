import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Nav from "./Nav";

function Edit(props) {
  let [postEdited, setPostEdited] = useState(false);
  let [post, setPost] = useState({});
  let history = useHistory();
  let userName = props.match.params.userName;
  let userId = props.match.params.userId;
  let applicationId = props.match.params.applicationId;

  useEffect(() => {
    fetch(`http://localhost:9000/edit/${userId}/${applicationId}`)
      .then((res) => res.json())
      .then((data) =>
        setPost(() => {
          let post = { ...data };
          post.appliedOn = moment(post.appliedOn).format("YYYY-MM-DDTHH:mm:ss");
          if (post.appStatus === "Applied") {
            document.getElementById("applied").checked = true;
          } else {
            document.getElementById("not-applied").checked = true;
            document.getElementById("appliedDate").disabled = true;
          }
          return post;
        })
      );
  }, [userId, applicationId]);

  function handleChange(e) {
    setPostEdited(true);
    const form = e.target.form;
    const data = new FormData(form);
    let entriesArr = [];

    for (let entry of data.entries()) {
      entriesArr.push(entry);
    }

    let postMap = new Map(entriesArr);
    let postObj = {};

    postMap.forEach((value, key) => {
      let keys = [];
      keys.reduce(() => ({}), postObj)[key] = value;
    });
    setPost(postObj);
  }

  function handleApplied() {
    document.getElementById("appliedDate").disabled = false;
    document.getElementById("appliedDate").required = true;
  }
  function handleNotApplied() {
    document.getElementById("appliedDate").disabled = true;
    document.getElementById("appliedDate").required = false;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (postEdited) {
      axios
        .post(`http://localhost:9000/edit/${userId}/${applicationId}`, post)
        .then((res) => {
          if (res.status === 200) {
            history.push(`/posts/${userId}`);
          }
        });
    } else {
      let editInfo = document.getElementById("popup");
      editInfo.style.visibility = "visible";
    }
  }

  return (
    <div>
      <Nav userName={userName} userId={userId} routeName="edit"></Nav>
      <div className="compose-container">
        <form className="compose-form" onSubmit={handleSubmit}>
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="applicationId" value={applicationId} />
          <input
            type="text"
            placeholder="Role"
            name="role"
            value={post.jobRole}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={post.companyName}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={post.companyLocation}
            required
            onChange={handleChange}
          />
          <textarea
            placeholder="Description"
            name="description"
            value={post.jobDescription}
            rows="5"
            cols="50"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Monthly salary"
            name="salary"
            value={post.monthlySalary}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Source"
            name="source"
            value={post.appSource}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            value={post.appLink}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Contact"
            name="contact"
            value={post.contactInfo}
            required
            onChange={handleChange}
          />
          <div>
            <input
              type="radio"
              id="applied"
              name="status"
              value="Applied"
              onClick={handleApplied}
              required
              onChange={handleChange}
            />
            <label for="applied">Applied</label>
            <input
              type="radio"
              id="not-applied"
              name="status"
              value="Not Applied"
              onClick={handleNotApplied}
              onChange={handleChange}
            />
            <label for="not-applied">Not Applied</label>
          </div>
          <input
            type="datetime-local"
            id="appliedDate"
            name="date"
            value={post.appliedOn}
            onChange={handleChange}
          />
          <textarea
            placeholder="Add notes...(max 255 chars)"
            name="note"
            value={post.appNote}
            rows="5"
            cols="50"
            onChange={handleChange}
          />
          <input type="submit" />
          <span id="popup">Edit post before submitting!</span>
        </form>
      </div>
    </div>
  );
}

export default Edit;
