import axios from "axios";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";

function Compose(props) {
  let history = useHistory();
  let userName = props.match.params.userName;
  let userId = props.match.params.userId;

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
    const form = e.target;
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
    axios.post("http://localhost:9000/compose", postObj).then((res) => {
      if (res.status === 200) {
        history.push(`/${userName}/${userId}/posts`);
      }
    });
  }

  return (
    <div>
      <Nav userName={userName} userId={userId} routeName="compose"></Nav>
      <div className="compose-container">
        <form className="compose-form" onSubmit={handleSubmit}>
          <input type="hidden" name="userId" value={userId} />
          <input type="text" placeholder="Role" name="role" required />
          <input type="text" placeholder="Company" name="company" required />
          <input type="text" placeholder="Location" name="location" required />
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            cols="50"
            required
          />
          <input
            type="number"
            placeholder="Monthly salary"
            name="salary"
            required
          />
          <input type="text" placeholder="Source" name="source" required />
          <input type="text" placeholder="Link" name="link" required />
          <input type="text" placeholder="Contact" name="contact" required />
          <div>
            <input
              type="radio"
              id="applied"
              name="status"
              value="Applied"
              onClick={handleApplied}
              required
            />
            <label for="applied">Applied</label>
            <input
              type="radio"
              id="not-applied"
              name="status"
              value="Not Applied"
              onClick={handleNotApplied}
            />
            <label for="not-applied">Not Applied</label>
          </div>
          <input
            type="datetime-local"
            id="appliedDate"
            placeholder="Applied on"
            name="date"
          />
          <textarea
            placeholder="Add notes...(max 255 chars)"
            name="note"
            rows="5"
            cols="50"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Compose;
