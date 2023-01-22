import Comments from './components/comment'
import { Route, Routes } from 'react-router'
import Home from './components/home/home'
import SignUp from './components/auth/index'
import Login from './components/login/Login'
import QuestionPanelReview from './components/Questions/QuestionPanelReview'
import QuestionReplySection from './components/Questions/QuestionReplySection'

import ValidationState from './components/context/ValidationState'
import PostQuestion from './components/Questions/PostQuestion'
function App() {

  return (
    <div className="App">

      <ValidationState>
        <Routes>
          <Route path="/replies/:id" element={<replyComment />} />
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route exact path='/panel' element={<QuestionPanelReview />}></Route>
          <Route exact path='/reply' element={<QuestionReplySection />}></Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/postq' element={<PostQuestion />} />

        </Routes>
      </ValidationState>
    </div>
  )
}

export default App
