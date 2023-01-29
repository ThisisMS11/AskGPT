import classes from "./cards.module.scss";
import { useState, useEffect } from "react";
import ImgMediaCard from "./card";
import axios from "axios";

const Posts = () => {
  const a = [
    {
      id: 1,
      username: "yogesh",
      userimage:
        "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900",
      question: "What is the best way to get a coffee?",
      comments: "12",
      date: "2121-21-8",
    },
    {
      id: 2,
      username: "sukur",
      userimage:
        "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900",
      question: "what is really the best way to do ? ",
      comments: "122",
      date: "2121-21-8",
    },
    {
      id: 3,
      username: "bossk",
      userimage:
        "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900",
      question: "what is reactjs ?",
      comments: "123",
      date: "2121-21-8",
    },
  ];

  // here will come the axios api call to get all the posts data. 

  const [Posts, setPosts] = useState([]);

  useEffect(() => {

    async function call() {
      await axios.get('http://localhost:4001/api/v1/all_posts/every')
        .then((data) => {
          

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
