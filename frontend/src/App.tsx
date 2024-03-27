import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from './components/Home'
import { SignupForm } from './components/sign-up-form'
import { SigninForm } from './components/sign-in-form'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
        </Route>
        <Route path="sign-up" element={<SignupForm/>} />
        <Route path="sign-in" element={<SigninForm/>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
