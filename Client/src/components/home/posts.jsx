import classes from "./cards.module.scss";
import { useState, useEffect } from "react";
import ImgMediaCard from "./card";
import axios from "axios";

const Posts = () => {
  // here will come the axios api call to get all the posts data. 

  const [Posts, setPosts] = useState([]);

  useEffect(() => {

    async function call() {
      await axios.get('https://stack-overflow-a2dm.onrender.com/api/v1/all_posts/every')
        .then((data) => {
          console.log(data.data)
          console.log('All posts :', data.data.posts);
          setPosts(data.data.posts);
        })
    }
    call();

  }, [])




  return (
    <div className={classes.posts}>
      {Posts.map((post) => (
        <ImgMediaCard
          key={post._id}
          date={post.createdAt.split("T")[0]}
          comments={post.comments[0].content.length}
          question={post.MainQuestion}
          userimage={post.user.profilePic.url}
          username={post.user.name}
          postID={post._id}
        />
      ))}
    </div>
  );
};

export default Posts;
