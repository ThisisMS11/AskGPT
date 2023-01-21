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

export default function ImgMediaCard() {
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
      />
      <CardContent>
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "gray" }}>Topics</Typography>
          <Typography sx={{ color: "gray" }}>Last Activity</Typography>
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="primary">
            120
          </Typography>
          <Typography variant="h6" color="primary">
            Today,23:57
          </Typography>
          {/* <Typography variant="h1" color="initial"></Typography> */}
        </Typography>
      </CardContent>
      <List >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src=
                          "https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900"
                      />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
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
