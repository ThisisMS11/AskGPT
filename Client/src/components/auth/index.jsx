import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import validationContext from '../context/validationContext'
import axios from 'axios'
import { useAuth } from '../context/auth'

// !Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

/* 
Import the Image EXIF Orientation and Image Preview plugins
Note: These need to be installed separately
npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
*/
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'




// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize)

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [newuserinfo, setNewuserinfo] = useState({ username: "", email: "", password: "", confirmpassword: "", image: "" });

  const [stateSignUp, setStateSignUp] = useState(true);


  async function registerUser(event) {
    event.preventDefault()

    console.log('newuserinfo =>  ', newuserinfo);

    const response = await fetch('http://localhost:4000/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({name:newuserinfo.username,email:newuserinfo.email,password:newuserinfo.password,}),

    })

    const data = await response.json()
    console.log(data)

    if (data.status === true) {
      // setEmail('')
      // setName('')
      // setPassword('')
      try {
        const res = await axios.get('http://localhost:4000/api/v1/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/JSON',
            'authorisation': `Bearer ${data.token}`
          }

        })
        auth.setUser(res.data.data.user)
        navigate('/')
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      console.log("Some error ocurred")
    }

  }


  const handleOnChange = (e) => {
    setNewuserinfo({ ...newuserinfo, [e.target.name]: e.target.value })

  }



  // <------------------------------------------------------------------------------------------------------------------>>

  const validContext = useContext(validationContext);
  let { usernamevalid, usernameChecker,
    emailvalid, emailChecker,
    passwordvalid, passwordChecker,
    cpasswordvalid, setCpasswordvalid
  } = validContext;

  const [files, setFiles] = useState([])
  const imageupload = () => {

    // converting file matadata into base64 encoding.
    const file = files[0].file;

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBlogcardinfo({ ...blogcardinfo, image: reader.result })
      }
    }
  }


  useEffect(() => {
    // we are using useEffect to get the latest updated values from our usestate.
    if (newuserinfo.username) {
      usernameChecker(newuserinfo.username);
    }
    if (newuserinfo.displayname) {
      displaynameChecker(newuserinfo.displayname)
    }
    if (newuserinfo.email) {
      emailChecker(newuserinfo.email)
    }

    if (newuserinfo.password) {
      passwordChecker(newuserinfo.password);
    }

    if (newuserinfo.confirmpassword) {
      console.log(newuserinfo.password, '-----', newuserinfo.confirmpassword)
      if (newuserinfo.confirmpassword !== newuserinfo.password) {
        setCpasswordvalid('block')
      }
      else {
        setCpasswordvalid('hidden')
      }
    }
    /*
    console.log('usernamevalid = ', usernamevalid,
        "\ndisplaynamevalid", displaynamevalid,
        "\npasswordvalid", passwordvalid,
        "\nemailvalid", emailvalid,
        "\ncpassword", cpasswordvalid)
    */

    if (usernamevalid == 'hidden' && passwordvalid == 'hidden' && emailvalid == "hidden") {
      setStateSignUp(false);
    }
    else {
      setStateSignUp(true);
    }

  }, [newuserinfo.username, newuserinfo.email, newuserinfo.password, stateSignUp, newuserinfo.confirmpassword])



  return (
    <>
      <div className='bg-AuthBackground font-sans font-light'>

        <section className="h-screen px-16 mx-12  ">
          <div className="px-6 h-full text-gray-800  text-center flex items-center justify-center ">
            <div
              className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-fit w-fit g-6 flex-col rounded-2xl text-white bg-AuthForm px-4"
            >
              <h1 className='text-center font-light mt-2 text-3xl  border-red-400 '>Signup</h1>

              <div className="mb-0 md:mb-0   mx-auto p-8 w-full">



                <form onSubmit={registerUser}>

                  <div className="mb-[0.92rem]  ">
                    <div className="text-white text-left ml-4 text-xl mb-[0.8rem]">
                      Name
                    </div>


                    <input

                      className={`form-control block xl:w-96 px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none`}

                      placeholder="Full Name"
                      value={newuserinfo.username}
                      name="username"
                      onChange={handleOnChange}
                      type="text"
                    />
                    <div className={`${usernamevalid} text-sm text-red-500 text-left`}>
                      * Must Contain at least 7 letters.
                    </div>
                  </div>

                  <div className="mb-[0.92rem]  ">
                    <div className="text-white text-left ml-4 text-xl mb-[0.8rem]">
                      Email
                    </div>
                    <input

                      className="form-control block xl:w-96 px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none"

                      placeholder="Email"
                      name='email'
                      value={newuserinfo.email}
                      onChange={handleOnChange}
                      type="email"

                    />
                    <div className={`${emailvalid} text-sm text-red-500 text-left`}>
                      * Not a Valid Email
                    </div>


                  </div>

                  <div className="mb-[0.92rem]">
                    <div className="text-white text-left ml-4 text-xl mb-[0.8rem]">
                      Password
                    </div>
                    <input
                      className="form-control block xl:w-96 px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding  transition ease-in-out m-0  focus:bg-gray-800  focus:outline-none rounded-full border-none"

                      placeholder="Password"
                      name='password'
                      value={newuserinfo.password}
                      onChange={handleOnChange}
                      type="password" />

                    <div className={`${passwordvalid} text-sm text-red-500 text-left w-96`}>
                      * Password must contain at least one UpperCase,
                      lowerCase,special character with
                      minumum of 6 characters.
                    </div>


                  </div>

                  <div className="mb-4">
                    <div className="text-white text-left ml-4 text-xl mb-[0.8rem]">
                      Confirm Password
                    </div>
                    <input
                      className="form-control block xl:w-96 px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding  transition ease-in-out m-0  focus:bg-gray-800  focus:outline-none rounded-full border-none"

                      placeholder="Confirm Password"
                      name='confirmpassword'
                      value={newuserinfo.confirmpassword}
                      onChange={handleOnChange}
                      type="password" />

                    <div className={`${cpasswordvalid} text-sm text-red-500 text-left`}>
                      * Password do not match
                    </div>
                  </div>

                  <div>
                    <div>
                      <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        maxFiles={1}
                        name="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      />
                    </div>


                    <button onClick={imageupload} >Upload Now</button>

                  </div>

                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-AuthButton text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out " disabled={stateSignUp}
                    >
                      Signup
                    </button>

                    <span className="text-md font-light mt-2 pt-1 mb-0 flex justify-center items-center   p-4 ">
                      <div className='mx-4  '>Already a user?</div>
                      <a
                        href="/login"
                        className="text-blue-500 underline hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out mr-6  "
                      >Login</a
                      >
                    </span>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>

  )
}

export default Register
