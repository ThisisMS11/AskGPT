import classes from "./cards.module.scss";
import ImgMediaCard from "./card";

const Posts = () => {
  const a = [
    {
      id: 1,
      username: "yogesh",
      userimage:
        "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900",
      quistion: "What is the best way to get a coffee?",
      comments: "12",
      date: "2121-21-8",
    },
    {
      id: 2,
      username: "sukur",
      userimage:
        "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900",
      quistion: "what is really the best way to do",
      comments: "122",
      date: "2121-21-8",
    },
    {
      id: 3,
      username: "bossk",
      userimage:
        "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900",
      quistion: "what is reactjs",
      comments: "123",
      date: "2121-21-8",
    },
  ];
  return (
    <div className={classes.posts}>
      {a.map((x) => (
        <ImgMediaCard
          key={x.id}
          date={x.date}
          comments={x.comments}
          quistion={x.quistion}
          userimage={x.userimage}
          username={x.username}
          id={x.id}
        />
      ))}
      {/* <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard /> */}
    </div>
  );
};

export default Posts;
