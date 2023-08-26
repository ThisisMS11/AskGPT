import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, Checkbox } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; import FavoriteIcon from '@mui/icons-material/Favorite';
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';
import { useParams } from 'react-router-dom';
import { display } from '@mui/system';
import { usecomment } from './context/CommentContext';
import { useToast } from './context/toast';


function comment({ author, commentData, time, profilePic, commentID, likesIDs, userid, authorid, comments, setComments }) {




  function convertDate(date) {
    let newDate = date.split('-');
    let year = newDate[0];
    let month = newDate[1];
    let day = newDate[2];
    return `${day}/${month}/${year}`;
  }

  const CommentRef = useRef(null);
  const toaster = useToast();
  const [checked, setChecked] = useState(false);
  const [likeIDs, setLikeIDs] = useState(likesIDs);
  const [likesno, setLikesno] = useState(likeIDs.length);
  const [DeleteIcondisplay, setDeleteIcondisplay] = useState('none');


  useEffect(() => {
    //! this will give us access to the element to which we have assigned the ref
    const CommentContainer = document.getElementById('PostComment');

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


    // console.log('likesIDs : ', likesIDs, 'userid : ', userid);

    // console.log('likeIDs : ', likeIDs, 'userid : ', userid);
    if (likeIDs.includes(userid)) {
      setChecked(true);
    }


    // for knowing whether any comment is been written by the logged in user or not.
    let user = localStorage.getItem('userinfo');
    user = JSON.parse(user);
    // setUserID(user._id)
    if (authorid === user._id) {
      console.log('I have wriiten this comment');
      setDeleteIcondisplay('block');
    } else {
      console.log("i haven't written this comment")
    }

  }, [likesno, checked, likeIDs])


  const { id: postId } = useParams();

  const handleOpinion = async () => {
    const token = localStorage.getItem('token');
    console.log("token in like dislike : ", token);


    const config = {
      headers: {
        authorisation: `Bearer ${token}`
      }
    }
    if (checked) {
      console.log('dislike was clicked')

      //! For Disliking a comment
      await axios.put(`https://stack-overflow-a2dm.onrender.com/api/v1/posts/unlike/${commentID}/${postId}`, config)
        .then((res) => {
          // ! In response we are getting data specific to that comment only like comment_data user_id likes_id etc. (not the whole comment instance);

          console.log('dislike response :', res.data.data[0].likes)
          if (res.data.success) {

            setChecked(false)
            setLikeIDs(res.data.data[0].likes)
            setLikesno(res.data.data[0].likes.length);

          }
        })
    }

    else {
      //! For liking a comment
      console.log('like was clicked')
      await axios.put(`https://stack-overflow-a2dm.onrender.com/api/v1/posts/like/${commentID}/${postId}`, config)
        .then((res) => {
          console.log('like response :', res.data.data[0].likes);
          if (res.data.success) {
            setChecked(true)
            setLikeIDs(res.data.data[0].likes)
            setLikesno(res.data.data[0].likes.length);
          }
        });
    }
  }

  // for deleting a comment
  const customcomment = usecomment();
  const HandleDelete = () => {
    if (customcomment.HandleDeleteComment(postId, commentID)) {
      toaster.successnotify("Deletion Successfull");

      const updatedcomments = comments.filter((comment) => comment._id !== commentID);

      console.log('updatedcomments : ',updatedcomments);
      setComments(updatedcomments);

    };
  }


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
        <List sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <DeleteIcon onClick={HandleDelete} sx={{ cursor: 'pointer', marginX: 1, display: DeleteIcondisplay }} />

          <Badge color="secondary" badgeContent={likesno} sx={likesIDs.length > 0 ? display : 'none'}>
            <Checkbox
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
              name="checked"
              checked={checked}
              onClick={handleOpinion}
            />
          </Badge>


        </List>
      </List>

    </Box>
  )
}

export default comment
