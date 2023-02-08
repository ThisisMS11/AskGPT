import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/auth'
import { CommentProvider } from './components/context/CommentContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CommentProvider>
          <App />
        </CommentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
