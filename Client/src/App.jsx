import Comments from './components/comment'
import { Route, Routes } from 'react-router'
import Home from './components/home/home'
import SignUp from './components/auth/index'
import Login from './components/login/index'
import QuestionPanelReview from './components/Questions/QuestionPanelReview'
import QuestionReplySection from './components/Questions/QuestionReplySection'
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/replies/:id" element={<Comments />} />
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route exact path='/panel' element={<QuestionPanelReview />}></Route>
        <Route exact path='/reply' element={<QuestionReplySection />}></Route>
        
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
