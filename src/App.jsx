import Comments from './components/comment'
import { Route, Routes } from 'react-router'
import Home from './components/home/home'
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/replies/:id" element={<Comments />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
