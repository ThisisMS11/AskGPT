import React, { useEffect, useContext, useCallback, useState, useRef } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./styles.css"
import { useParams } from 'react-router-dom'
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

const QuestionReplySection = () => {

    // const context = useContext(userContext);
    // let { questionWithID } = context;


    // let { id } = useParams();

    const [drawerstate, setDrawerstate] = useState(true);
    const [quill, setQuill] = useState();

    const saveblogwithcardsubmitref = useRef(null);


    const [questionWithID, setQuestionWithID] = useState(sampledata)

    const [mainquestion, setMainquestion] = useState(`What is React?`)


    const wrapperRef1 = useCallback(wrapper => {

        if (wrapper == null) return;
        wrapper.innerHTML = ''

        const editor = document.createElement("div");
        wrapper.append(editor)

        var q = new Quill(editor, {
            theme: "snow", readOnly: true,
            modules: {
                toolbar: null   //Experience 2.0
            }
        })
        // console.log(questionWithID);
        q.setContents(questionWithID)
    }, [])

    const [value, setValue] = useState(0);


    // quill text editor
    const Toolbar_options = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'direction': 'rtl' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ]


    const [newreply, setNewreply] = useState('');

    const handleChange = (event) => {
        setNewreply(event.target.value);
    };



    const wrapperRef2 = useCallback(wrapper => {

        // setLoading(true)
        if (wrapper == null) return;
        wrapper.innerHTML = ''
        const editor = document.createElement("div");
        // console.log(editor)

        // this will put our toolbar as well as textarea inside the container div so that we would be able to clean it up at once.

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


        // ! adding the save draft button to our toolbar

        const toolbar = Array.from(document.getElementsByClassName('.ql-toolbar'));


        let tool = wrapper.children[0];


        // Creating save Draft button in toolbar.
        const button = document.createElement('button');
        button.innerHTML = 'Save Draft';
        button.id = 'savedraftbutton'

        button.onclick = () => {
            saveblogwithcardsubmitref.current.click();
        }

        tool.appendChild(button)

        // setLoading(false);

        setQuill(q)

        // console.log("freshdocument = ", freshdocument)

        // q.setContents(freshdocument)
        q.enable();

    }, [])


    const showmequill = async () => {
        // console.log("quill content : ", quill.getContents().ops);

        console.log('newreply => ', newreply);

        const currentTime = new Date();
        const localtime = currentTime.toLocaleString();

        const freshreply = {
            "name": "Pratham",
            "message": newreply,
            "time": localtime
        }

        setDrawerstate(!drawerstate);

        replies.push(freshreply);

        // <------------------API point --------------------->
    }


    const [chatGPT, setChatGPT] = useState(null);

    useEffect(() => {

        async function call() {
            await axios.post('http://localhost:4001/question/getAns', { "question": mainquestion })
                .then(function (response) {
                    console.log(response);
                    setChatGPT(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });


            //     await fetch(`http://localhost:4001/question/getAns`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(})

            // }).then((response) => response.json())
            // .then((resjson) => {
            //     console.log(resjson);

            // }).catch((err) => {
            //     console.log("Upation document error => ", err)
            // });
        }

        call();
    }, [replies])





    return (
        <>

            <div className='flex'>


                <section className="Question  border-pink-400 text-center w-[35%] ">
                    <div>

                        <div className="aboutauthor  border-green-600">
                            <div className="question-title  border-black text-3xl font-semibold text-left p-3">
                                Delete Item from specific location in list in Python [duplicate]
                            </div>

                            <div className="question-author px-4 py-4  border-black flex justify-between">
                                <div className="author-details  border-pink-400 flex ">
                                    <img src="https://source.unsplash.com/500x300/?web-development" alt="" className='w-10 h-10 rounded-full ' />
                                    <div className="author-name  border-blue-800 w-fit flex items-center justify-center ml-4 font-semibold">
                                        Diane White
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
                            <div className='container  border-red-500 w-fit' ref={wrapperRef1} ></div>
                        </div>
                    </div>
                </section>

                {/* <------------------------------------------------------Comments on Post section----------------------------------> */}

                <div className='w-full'>


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
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aliquid molestiae eius sint facilis rem reprehenderit maiores magnam mollitia doloremque ex, magni praesentium at nisi a repellendus delectus incidunt adipisci dolore commodi fugiat atque. Aliquam rem, ipsam, magni possimus vel ea quasi, quo impedit fuga ullam quam ad commodi voluptates maxime nisi velit pariatur quos placeat officiis incidunt maiores neque id harum facere. Dicta perferendis ducimus, repellendus esse deleniti officia, ex, maiores blanditiis temporibus aut assumenda. Repudiandae aspernatur reprehenderit praesentium ex, ducimus voluptatem expedita commodi error porro numquam? Mollitia, nulla accusamus. Minus tempore illum fuga. Impedit delectus a commodi reprehenderit? */}

                            {chatGPT}
                        </div>
                    </section>


                    <section className="comments  border-green-400 w-full p-1 flex flex-col gap-4">
                        {
                            replies.map((e) => {
                                return <Comment author={e.name} message={e.message} time={e.time} />
                            })
                        }
                    </section>
                </div>

            </div>


            {/* <-------------------------------------------------------Drawer------------------------------------------------------> */}
            <Drawer
                anchor='right'
                open={!drawerstate}
                onClose={() => setDrawerstate(!drawerstate)}
            >
                {/* <div className='container  border-red-400 mx-auto' ref={wrapperRef2}></div>

                                        <div onClick={showmequill} ref={saveblogwithcardsubmitref} className='text-center hidden  border-black rounded-lg mx-auto bg-black text-white py-1 cursor-pointer w-[8.5in]' >Save Draft</div> */}
                <div className='m-10 flex flex-col gap-4'>

                    <TextField
                        id="outlined-multiline-static"
                        label="Your Reply"
                        multiline
                        rows={10}
                        sx={{ width: 400 }}
                        onChange={handleChange}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={showmequill}>
                        Send
                    </Button>
                </div>

            </Drawer>




        </>
    )
}


export default QuestionReplySection