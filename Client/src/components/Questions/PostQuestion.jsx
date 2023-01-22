import React, { useCallback, useContext, useReducer, useRef } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./styles.css"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageResize from 'quill-image-resize-module-react';


import { useNavigate } from 'react-router-dom'
import Header from '../home/header'


const PostQuestion = () => {

  const [quill, setQuill] = useState();
  const saveblogwithcardsubmitref = useRef(null);


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

    button.onclick = () => {
      saveblogwithcardsubmitref.current.click();
    }

    tool.appendChild(button)

    setQuill(q)

    q.enable();

  }, [])


const showmequill = async () => {p
    console.log("quill content : ", quill.getContents().ops);
  }

  return (
    <>
      <Header />
      <div className='container  border-red-400 mx-auto' ref={wrapperRef2}></div>

      <div onClick={showmequill} ref={saveblogwithcardsubmitref} className='text-center hidden  border-black rounded-lg mx-auto bg-black text-white py-1 cursor-pointer w-[8.5in]' >Save Draft</div>
    </>
  )
}

export default PostQuestion;