import { useEffect, useState } from "react";

function DetailedPost(props) {
  let userId = props.match.params.userId;
  let applicationId = props.match.params.applicationId;
  const [post, setPost] = useState({});
  useEffect(() => {
    fetch(`http://localhost:9000/post/${userId}/${applicationId}`)
      .then((res) => res.text())
      .then((res) => setPost(JSON.parse(res)));
  }, [userId, applicationId]);

  return (
    <div className="detailed-post-container">
      <table className="post-table">
        <tr>
          <td>Role</td>
          <td>{post.jobRole}</td>
        </tr>
        <tr>
          <td>Company</td>
          <td>{post.companyName}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{post.companyLocation}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{post.jobDescription}</td>
        </tr>
        <tr>
          <td>Monthly salary</td>
          <td>{post.monthlySalary}</td>
        </tr>
        <tr>
          <td>Source</td>
          <td>{post.appSource}</td>
        </tr>
        <tr>
          <td>Link</td>
          <td>
            <a href={post.appLink}>{post.appLink}</a>
          </td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{post.appStatus}</td>
        </tr>
        <tr>
          <td>Applied On</td>
          <td>
            {post.appStatus === "Applied"
              ? new Date(post.appliedOn).toDateString()
              : null}
          </td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>{post.appNote}</td>
        </tr>
      </table>
    </div>
  );
}

export default DetailedPost;
