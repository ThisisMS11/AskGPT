import React, { useEffect, useContext, useCallback, useState } from 'react'
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
import { sampledata } from './sampledata';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Drawer from '@mui/material/Drawer';
import ImageResize from 'quill-image-resize-module-react';



const QuestionReplySection = () => {

    // const context = useContext(userContext);
    // let { questionWithID } = context;


    // let { id } = useParams();

    const [drawerstate, setDrawerstate] = useState(false);
    const [quill, setQuill] = useState();


    const [questionWithID, setQuestionWithID] = useState(sampledata)

    useEffect(() => {

        console.log('id specific blog is here :- ', questionWithID)
    }, [questionWithID])


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
        console.log(questionWithID);
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

        // button.onclick = () => {
        //     saveblogwithcardsubmitref.current.click();
        // }

        tool.appendChild(button)

        // setLoading(false);

        setQuill(q)

        // console.log("freshdocument = ", freshdocument)

        // q.setContents(freshdocument)
        q.enable();

    }, [])




    return (
        <>

            <div className="border-2 border-pink-400 w-[35%] text-center">

                <div className="aboutauthor border-2 border-green-600">
                    <div className="question-title border-2 border-black text-3xl font-semibold text-left p-3">
                        Delete Item from specific location in list in Python [duplicate]
                    </div>

                    <div className="question-author px-4 py-4 border-2 border-black flex justify-between">
                        <div className="author-details border-2 border-pink-400 flex ">
                            <img src="https://source.unsplash.com/500x300/?web-development" alt="" className='w-10 h-10 rounded-full ' />
                            <div className="author-name border-2 border-blue-800 w-fit flex items-center justify-center ml-4 font-semibold">
                                Diane White
                            </div>
                        </div>

                        <div className="LikeShareReply border-2 border-black flex ">
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





            {/* <-------------------------------------------------------Drawer------------------------------------------------------> */}
            <Drawer
                anchor='right'
                open={!drawerstate}
                onClose={() => setDrawerstate(!drawerstate)}
            >
                <div className='container  border-red-400 mx-auto' ref={wrapperRef2}></div>

            </Drawer>



        </>
    )
}


export default QuestionReplySection