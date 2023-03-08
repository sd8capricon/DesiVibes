import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'

import Home from './pages/home'
import Auth from './pages/auth'
import Product from './pages/product'
import ResetPass from './pages/resetpass'

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/forgot-password' element={<ResetPass />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App
