import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, Checkbox} from '@mui/material'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';import FavoriteIcon from '@mui/icons-material/Favorite';
function comment() {
  return (
      <Box sx={{ display : "flex", flexDirection : "column", boxShadow : "1", borderRadius : "1rem", marginLeft : "16px",bgcolor:"#EEEEEE"}}>
          <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900" />
        </ListItemAvatar>
        <ListItemText
          primary="Name"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               DATE
              </Typography>
              {' — TIME'}
            </React.Fragment>
          }
              />
             
          </ListItem>
          <Typography variant="span" color="initial" sx = {{marginLeft : '1rem'}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eius dolor magnam natus optio a, similique, beatae labore, veniam nemo saepe! Magnam, nam! Explicabo fugiat reiciendis, deleniti harum ullam magnam?
    </Typography>
          <List sx = {{display : 'flex', justifyContent : "space-between" , paddingX : "12px"}}>
            <Button variant="text" color="primary">
            1 Reply ^
              </Button>
              <List >
              <Checkbox
                      icon={<FavoriteBorderIcon  />}
                  checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
                  name="checkedH"
                  />
                  <Button variant="outlined" color="primary" sx = {{borderRadius : "1rem"}}>Reply
                    
                  </Button>
                  
              </List>
        </List>
      
    </Box>
  )
}

export default comment
