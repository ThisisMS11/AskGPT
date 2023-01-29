import Comments from './components/comment'
import { Route, Routes } from 'react-router'
import Home from './components/home/home'
import SignUp from './components/auth/Register'
import Login from './components/login/Login'
import QuestionPanelReview from './components/Questions/QuestionPanelReview'
import QuestionReplySection from './components/Questions/QuestionReplySection'
import { AuthProvider } from './components/context/auth'
import { AuthrequireLogin } from './components/context/authrequire'
import { useState, useEffect } from 'react'
import Loading from './components/login/loading'
import { useAuth } from './components/context/auth'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'

import ValidationState from './components/context/ValidationState'
import PostQuestion from './components/Questions/PostQuestion'
function App() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const getUser = async () => {
      try {
        const token = (localStorage.getItem('token'));
        if (token) {
          axios.defaults.headers.common['authorisation'] = `Bearer ${token}`;

          const user1 = await axios.get('http://localhost:4001/api/v1/user/')

          console.log(user1)
          if (user1.data.data.user) {
            auth.setUser(user1.data.data);

            navigate(location.pathname);
          }
        }
      }
      catch (err) {
        console.error(err)


      }
      setLoading(false)
    };

    getUser();

  }, []);

  return (
    <div className="App">

      <ValidationState>

        <Routes>
          <Route path="/replies/:id" element={<Loading loading={loading}><AuthrequireLogin><replyComment /></AuthrequireLogin></Loading>} />
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/* here for seeing the question review panel we got to have the user logged in that why we are keeping it as a protected route */}
          <Route exact path='/panel' element={<Loading loading={loading}><AuthrequireLogin><QuestionPanelReview /></AuthrequireLogin></Loading>}></Route>

          <Route exact path='/reply/:id' element={<Loading loading={loading}><AuthrequireLogin><QuestionReplySection /></AuthrequireLogin></Loading>}></Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/postq' element={<PostQuestion />} />

        </Routes>

      </ValidationState>

    </div>
  )
}

export default App
