import Comments from './components/comment'
import { Route, Routes } from 'react-router'
import Home from './components/home/home'
import SignUp from './components/auth/index'
import  Login from './components/login/index'
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/replies/:id" element={<Comments />} />
        <Route path="/" element={<Home />} />
        <Route path='/login' element = {<Login/>}/>

        <Route path='/signup' element= {<SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
