import React, { useEffect, useContext, useCallback, useState, useRef } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./styles/styles.css"
import "./styles/QuestionReply.css"
import { json, useParams } from 'react-router-dom'
import { eventWrapper } from '@testing-library/user-event/dist/utils'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import { sampledata, replies } from './sampledata';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Drawer from '@mui/material/Drawer';
import ImageResize from 'quill-image-resize-module-react';
import Comment from '../comment'
import TextField from '@mui/material/TextField';
import img from '../../assets/ChatGPT.png'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Header from '../home/header'
import { useToast } from '../context/toast'



const QuestionReplySection = () => {


    const [drawerstate, setDrawerstate] = useState(true);
    const [quill, setQuill] = useState();

    const saveblogwithcardsubmitref = useRef(null);


    const [mainquestion, setMainquestion] = useState(`What is React?`)

    //! to get access to our quill html element.
    const PostRef = useRef(null);

    const [value, setValue] = useState(0);


    const { id: postID } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [userID, setUserID] = useState([]);

    const toaster=useToast();


    // quill text editor
    const Toolbar_options = [
        [{ 'header': [1, 2, 3, false] }, { 'font': [] }],
        ['bold', 'italic', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
    ]


    const [newreply, setNewreply] = useState('');

    const handleChange = (event) => {
        setNewreply(event.target.value);
    };


    //! For the comment Box Editor
    const ReplyWrapper = useCallback(wrapper => {

        // setLoading(true)
        if (wrapper == null) return;
        wrapper.innerHTML = ''
        const editor = document.createElement("div");

        wrapper.append(editor)

        Quill.register('modules/imageResize', ImageResize);

        const q = new Quill(editor, {
            theme: "snow", modules: {
                imageResize: {
                    parchment: Quill.import('parchment'),
                    modules: ['Resize', 'DisplaySize']
                },
                toolbar: Toolbar_options
            }
        })

        // !Adding a class to the quill editor so that we can style it.
        // console.log('The Entire wrapper : ', wrapper);

        wrapper.classList.add('QuestionReplySection__quill-wrapper');

        const writingplace = wrapper.children[1].children[0];
        const toolbar = wrapper.children[0];
        toolbar.classList.add('QuestionReplySection__quill-toolbar');

        writingplace.classList.add('QuestionReplySection__quill-editor')


        // ! adding the save draft button to our toolbar



        let tool = wrapper.children[0];


        // Creating save Draft button in toolbar.
        const button = document.createElement('button');
        button.innerHTML = 'comment';
        button.id = 'commentbutton'
        button.style.border = 'none';

        button.onclick = () => {
            saveblogwithcardsubmitref.current.click();
        }

        tool.appendChild(button)

        // setLoading(false);
        setQuill(q)
        q.enable();

    }, [])



    //! Here i can make the api call for adding the comment to the database.
    const SubmitComment = async () => {
        // console.log("quill content : ", quill.getContents().ops);

        const config = {
            headers: {
                authorisation: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const commentBody = {
            comment: quill.getContents().ops
        }

        await axios.put(`https://stack-overflow-a2dm.onrender.com/api/v1/posts/comment/${postID}`, commentBody, config)
            .then((res) => {
                console.log('submitted comment => ', res.data);
                if (res.data.success) {
                    setComments([...comments, res.data.data])
                    toaster.successnotify("Comment Added");
                    quill.setText("");
                }
            }).catch((err) => { console.log(err) })

    }




    const [chatGPT, setChatGPT] = useState("Hello i am good how are you ?");

    /*
    useEffect(() => {

        async function call() {

            var data = {
                'content-Type': 'val1',
                'key2': 'val2'
            }
            await axios.post('https://stack-overflow-a2dm.onrender.com/question/getAns', { question: mainquestion })
                .then(function (response) {
                    console.log(response);
                    setChatGPT(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        call();
    }, [])
    */



    const viewpost = () => {
        console.log('viewpost => ', post);
    }



    useEffect(() => {
        async function postcall() {
            await axios.get(`https://stack-overflow-a2dm.onrender.com/api/v1/posts/${postID}`)
                .then((res) => {

                    console.log('details about this post ', res.data.data)

                    setPost(res.data.data);
                    // console.log('clicked post data : ', res.data.data.data);
                    //! this will give us access to the element to which we have assigned the ref
                    const postContainer = document.getElementById('PostClicked');

                    // console.log(postContainer
                    // !Setting the data over the react-quill editor like this Bingo.

                    if (PostRef.current == null) return;
                    PostRef.current.innerHTML = ''

                    const editor = document.createElement("div");
                    PostRef.current.append(editor)

                    var q = new Quill(editor, {
                        theme: "snow", readOnly: true,
                        modules: {
                            toolbar: null   //Experience 2.0
                        }
                    })
                    //! Magic lines.

                    q.setContents(res.data.data[0].data)

                })
        }

        postcall();

        function commentcall() {
            axios.get(`https://stack-overflow-a2dm.onrender.com/api/v1/posts/comment/${postID}`)
                .then((res) => {
                    console.log('comments => ', res.data);

                    console.log('the comment instance id is : ', res.data.comments[0].content);

                    setComments(res.data.comments[0].content);
                })
        }

        commentcall();

        let user = localStorage.getItem('userinfo');
        user = JSON.parse(user);
        setUserID(user._id)

    }, [])

    return (
        <>

            <Header />

            <div className='flex '>


                {
                    post.map((post, index) => {
                        return <section className="Question  border-pink-400 text-center w-[35%] " key={index}>
                            <div>

                                <div className="aboutauthor  border-green-600">
                                    <div className="question-title  border-black text-3xl font-semibold text-left p-3">
                                        {post.MainQuestion}
                                    </div>

                                    <div className="question-author px-4 py-4  border-black flex justify-between">
                                        <div className="author-details  border-pink-400 flex ">
                                            <img src={post.user.profilePic.url} alt="" className='w-10 h-10 rounded-full ' />
                                            <div className="author-name  border-blue-800 w-fit flex items-center justify-center ml-4 font-semibold">
                                                {post.user.name}
                                            </div>
                                        </div>

                                        <div className="LikeShareReply  border-black flex ">
                                            <button className='mx-2 font-bold text-md transition-all ease-out duration-300  rounded-xl w-fit text-white bg-blue-600 px-3 py-3' onClick={() => { setDrawerstate(!drawerstate) }} >
                                                Reply <ReplyIcon sx={{ marginLeft: "2px" }} />
                                            </button>

                                            <div>
                                                <BottomNavigation
                                                    showLabels
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        value == 0 ? setValue(1) : setValue(0);
                                                    }}
                                                    sx={{ width: "fit-content" }}
                                                >
                                                    <Tooltip title="Like">
                                                        <BottomNavigationAction icon={<FavoriteIcon />} />
                                                    </Tooltip>


                                                </BottomNavigation>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <div className='border-red-500 w-fit' ref={PostRef} id="PostClicked"></div>
                                </div>

                            </div>
                        </section>
                    })
                }



                {/* <------------------------------------------------------Comments on Post section----------------------------------> */}

                <div className='w-full  border-black'>


                    <section className="ChatGPTAnswer  border-red-400 p-5 bg-white m-4 rounded-md">

                        <div className="font-bold flex">
                            <img src={img} alt="image not found" className='w-20 h-12  rounded-full' />
                            <div className=' border-green-600 '>
                                <div className="title text-lg text-gray-800 font-bold ">
                                    ChatGPT

                                </div>
                                <div className="datetime text-sm text-gray-500 mt-1 ">
                                    12/05/22 2:45 PM
                                </div>
                            </div>
                        </div>



                        <div className="responsemsg mt-4 font-medium">
                            {chatGPT}
                        </div>
                    </section>

                    <section className="replyeditor  border-black">
                        <div className=' border-red-400' ref={ReplyWrapper}></div>

                        <div onClick={SubmitComment} ref={saveblogwithcardsubmitref} className='text-center hidden  border-black rounded-lg mx-auto bg-black text-white py-1 cursor-pointer w-[8.5in]' >Save Draft</div>
                    </section>




                    <section className="comments border-green-400 w-full p-1 flex flex-col gap-4 mt-4">
                        {
                            comments.map((e, index) => {
                                let topass = {
                                    author: e.user.name,
                                    time: e.createdAt.split('T')[0],
                                    commentData: JSON.stringify(e.comment),
                                    key: index,
                                    profilePic: e.user.profilePic.url,
                                    // !here commentID is the id of the comment Object and not comment itself.
                                    commentID: e._id,
                                    likesIDs: e.likes,
                                    userid: userID,// userid of the user who is logged in.
                                    authorid: e.user._id, // userid of the author of the comment.
                                    comments:comments,
                                    setComments:setComments
                                }

                                return <Comment {...{ ...topass }} />
                                // return <Comment author={e.user.name} message={e.comment} time={e.createdAt.split('T')[0]} key={index} profilePic={e.user.profilePic.url} />
                            })
                        }
                    </section>
                </div>

            </div>

        </>
    )
}


export default QuestionReplySection