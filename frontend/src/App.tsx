import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from './components/Home'
import { SignupForm } from './components/sign-up-form'
import { SigninForm } from './components/sign-in-form'
import Admin from './components/Admin'
import Trains from './components/Trains'
import Stations from './components/Stations'
import TRoutes from './components/Routes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
        </Route>
        <Route path="sign-up" element={<SignupForm/>} />
        <Route path="sign-in" element={<SigninForm/>} />
        <Route path="admin" element={<Admin/>} />
        <Route path="admin/trains" element={<Trains/>} />
        <Route path="admin/routes" element={<TRoutes/>} />
      <Route path="admin/stations" element={<Stations/>} />
        <Route path="*" element={<div className='h-screen w-screen bg-black flex flex-col items-center justify-center'><h1 className='text-red-600 font-mono text-4xl animate-pulse'>Error 404 : Page not found !!</h1></div>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
