import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './layouts/Navbar'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/singup/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
