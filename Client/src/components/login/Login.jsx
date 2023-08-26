import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { useToast } from '../context/toast'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const location = useLocation();

  const toaster = useToast();

  const redirectPath = location.state?.path || '/'

  const [password, setPassword] = useState('')


  // useAuth is a user defined react hook to set the userinfo to a usestate available globally throughout our app.
  const auth = useAuth();

  async function loginUser(event) {
    event.preventDefault()
    const userDetails = { email, password };


    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //! calling the login api here 
    await axios.post('http://localhost:4001/api/v1/user/login', userDetails, config)
      .then((res) => {
        //! data is an object with token and status(true/false);
        // console.log('loggin response => ', res);

        if (res.data.status && res.data.token) {


          localStorage.setItem('token', res.data.token)

          const getuserres = auth.GetUserInfo(res.data.token);
          // console.log(getuserres);

          if (getuserres) {
            navigate('/');
            toaster.successnotify("Login Successful")
          }
        }
      }).catch((error) => {
        toaster.errornotify(error);
      })

  }

  return (
    <div className='bg-AuthBackground font-sans font-light'>

      <section className="h-screen px-16 mx-12  border-black">
        <div className="px-6 h-full text-gray-800  border-black text-center flex items-center justify-center">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-fit w-fit g-6  border-red-400	flex-col rounded-2xl text-white bg-AuthForm"
          >
            <h1 className='text-center font-light mt-6 text-3xl  border-red-400 '>Login</h1>

            <div className="mb-12 md:mb-0  border-white mx-auto p-16 w-full">



              <form onSubmit={loginUser} >

                <div className="mb-6  border-white">
                  <div className="text-white text-left ml-4 text-xl mb-[0.8rem]">
                    Email
                  </div>
                  <input

                    className="form-control block xl:w-96 px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none"

                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"

                  />
                </div>

                <div className="mb-8">
                  <div className="text-white text-left ml-4 text-xl mb-[0.8rem]">
                    Password
                  </div>
                  <input
                    className="form-control block xl:w-96 px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding  transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none rounded-full border-none"

                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" />
                </div>

                <div className="mb-10  border-black text-left">
                  <a href="#!" className=" border-green-700 text-white ml-4 ">Forgot password?</a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-AuthButton text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <span className="text-md font-light mt-2 pt-1 mb-0 flex justify-center items-center  border-white p-4 ">
                    <div className='mx-4  border-white'>New User?</div>
                    <a
                      href="/signup"
                      className="text-blue-500 underline hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out mr-6  border-white"
                    > Signup</a
                    >
                  </span>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login