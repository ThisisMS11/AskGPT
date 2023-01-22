import Comments from './components/comment'
import { Route, Routes } from 'react-router'
import Home from './components/home/home'
import SignUp from './components/auth/index'
import Login from './components/login/Login'
import QuestionPanelReview from './components/Questions/QuestionPanelReview'
import QuestionReplySection from './components/Questions/QuestionReplySection'

import ValidationState from './components/context/ValidationState'
function App() {

  return (
    <div className="App">

      <ValidationState>
        <Routes>
          <Route path="/replies/:id" element={<replyComment />} />
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route exact path='/panel/:userid' element={<QuestionPanelReview />}></Route>
          <Route exact path='/reply/:id' element={<QuestionReplySection />}></Route>
{/* <Route path='/Profile/:id' element={<Profile />}></Route> */}
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </ValidationState>
    </div>
  )
}

export default App
