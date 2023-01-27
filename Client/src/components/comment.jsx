import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, Checkbox } from '@mui/material'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; import FavoriteIcon from '@mui/icons-material/Favorite';
function comment({ author, message, time }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: '4px', borderRadius: '4px', marginLeft: "16px", bgcolor: 'white', boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://img.freepik.com/premium-vector/flat-winter-season-celebration-background_23-2149895776.jpg?w=900" />
        </ListItemAvatar>
        <ListItemText
          primary={author}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {time}
              </Typography>
              {' — TIME'}
            </React.Fragment>
          }
        />

      </ListItem>
      <Typography variant="span" color="initial" sx={{ marginLeft: '1rem' }}>
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eius dolor magnam natus optio a, similique, beatae labore, veniam nemo saepe! Magnam, nam! Explicabo fugiat reiciendis, deleniti harum ullam magnam? */}
        {message}
      </Typography>
      <List sx={{ display: 'flex', justifyContent: "space-between", paddingX: "12px" }}>
        <Button variant="span" color="primary">
          1 Reply ^
        </Button>
        <List >
          <Checkbox
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
            name="checkedH"
          />

        </List>
      </List>

    </Box>
  )
}

export default comment
