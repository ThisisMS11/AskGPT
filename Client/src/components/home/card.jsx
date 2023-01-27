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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ImgMediaCard(props) {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/reply`);
  }


  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "1rem",
        boxShadow: "1",
        padding: "1rem",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900"
        sx={{ borderRadius: "1rem" }}
        onClick={clickHandler}
      />
      <CardContent>
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
      <List >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src={props.userimage} />


          </ListItemAvatar>
          <ListItemText
            primary={props.username}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {props.username}
                </Typography>
                :- {props.quistion}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
