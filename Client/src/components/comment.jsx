import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, Checkbox } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; import FavoriteIcon from '@mui/icons-material/Favorite';
import Quill from 'quill'
import "quill/dist/quill.snow.css"
function comment({ author, commentData, time, profilePic }) {

  function convertDate(date) {
    console.log(date)
    let newDate = date.split('-');
    let year = newDate[0];
    let month = newDate[1];
    let day = newDate[2];
    return `${day}/${month}/${year}`;
  }

  const CommentRef = useRef(null);

  useEffect(() => {
    console.log("our commentData : ", JSON.parse(commentData));
    //! this will give us access to the element to which we have assigned the ref
    const CommentContainer = document.getElementById('PostComment');

    console.log(CommentContainer);




    // !Setting the data over the react-quill editor like this Bingo.

    if (CommentRef.current == null) return;
    CommentRef.current.innerHTML = ''

    const editor = document.createElement("div");
    CommentRef.current.append(editor)

    var q = new Quill(editor, {
      theme: "snow", readOnly: true,
      modules: {
        toolbar: null   //Experience 2.0
      }
    })
    //! Magic lines.

    q.setContents(JSON.parse(commentData))
  }, [])


  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: '4px', borderRadius: '4px', marginLeft: "16px", bgcolor: 'white', boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)', width: '97%' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={profilePic} />
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
            {convertDate(time)}
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Typography variant="span" color="initial" sx={{ marginLeft: '1rem' }}>
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eius dolor magnam natus optio a, similique, beatae labore, veniam nemo saepe! Magnam, nam! Explicabo fugiat reiciendis, deleniti harum ullam magnam? */}

        {/* //! Here we can create an instance of quill editor */}

        <div>
          <div className='border-red-500 w-fit' ref={CommentRef} id="PostComment"></div>
        </div>

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
