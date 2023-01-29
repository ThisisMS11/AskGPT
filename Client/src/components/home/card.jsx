import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ImgMediaCard(props) {
  const navigate = useNavigate();

  const navigateToQuestion = () => {
    // here i can make the api call if anything goes wrong.

    console.log(props.postID);

    navigate(`/reply/${props.postID}`);
  }


  return (
    <Card
      sx={{
        maxWidth: 444,
        borderRadius: "1rem",
        boxShadow: "1",
        padding: "1rem",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >

      <List >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src={props.userimage} />


          </ListItemAvatar>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  sx={{fontSize: 25, display: 'flex' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {props.username}
                </Typography>
                <Typography sx={{
                  fontSize: 20, marginTop: '10px', color: '#6b8ed7', cursor: 'pointer',
                  "&:hover": {
                    color: '#3a70df'
                  },
                }} component="a" onClick={navigateToQuestion}>
                  {props.question}
                </Typography>

              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <CardContent >
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "gray" }}> comments</Typography>
          <Typography sx={{ color: "gray" }}> lastActivity</Typography>
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="span" color="primary">
            {props.comments}
          </Typography>
          <Typography variant="span" color="primary">
            {props.date}
          </Typography>
          {/* <Typography variant="h1" color="initial"></Typography> */}
        </Typography>
      </CardContent>

      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
