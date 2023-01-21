import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material'
import React from 'react'

function comment() {
  return (
      <Box sx={{ display : "flex", flexDirection : "column", boxShadow : "1"}}>
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
          <Typography variant="div" color="inherit">
              
              
          </Typography>
      
    </Box>
  )
}

export default comment
