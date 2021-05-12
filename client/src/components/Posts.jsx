import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Nav from "./Nav";
import Post from "./Post";

function Posts(props) {
  let userName = props.match.params.userName;
  let userId = props.match.params.userId;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:9000/posts/${userId}`)
      .then((res) => res.text())
      .then((res) => setPosts(JSON.parse(res)));
  }, [userId]);

  return (
    <div>
      <Nav userName={userName} routeName="posts"></Nav>
      <div className="posts-container">
        {posts.map((post, index) => {
          return (
            <Post
              userName={userName}
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
            pathname: `/${userName}/${userId}/compose`,
            aboutProps: {
              id: userId,
            },
          }}
          title="Click to add a new post"
        >
          +
        </Link>
      </div>
    </div>
  );
}

export default Posts;
