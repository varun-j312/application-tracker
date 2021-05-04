import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Post from "./Post";

function Posts(props) {
  let userId = props.match.params.userId;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:9000/posts/${userId}`)
      .then((res) => res.text())
      .then((res) => setPosts(JSON.parse(res)));
  }, [userId]);

  return (
    <div className="posts-container">
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            id={post.applicationId}
            userId={post.userId}
            role={post.jobRole}
            company={post.companyName}
            location={post.companyLocation}
            description={post.jobDescription}
            salary={post.monthlySalary}
            source={post.appSource}
            link={post.appLink}
            contact={post.contactInfo}
            status={post.appStatus}
            date={post.appliedOn}
          />
        );
      })}
      <Link
        className="post-add"
        to={{
          pathname: `/compose/${userId}`,
          aboutProps: {
            id: userId,
          },
        }}
        title="Click to add a new post"
      >
        +
      </Link>
    </div>
  );
}

export default Posts;
