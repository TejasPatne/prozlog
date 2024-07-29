import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './layouts/Navbar'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/singup/SignUp'
import CreateProject from './pages/project/CreateProject'
import Project from './pages/project/Project'
import Projects from './pages/project/Projects'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projects">
          <Route path="" element={<Projects />} />
          <Route path="new" element={<CreateProject />} />
          <Route path=":id" element={<Project />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
