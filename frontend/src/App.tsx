import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layout from "./components/Layout"
import Home from './components/Home'
import { SignupForm } from './components/sign-up-form'
import { SigninForm } from './components/sign-in-form'
import Admin from './components/Admin'
import Trains from './components/Trains'
import Stations from './components/Stations'
import TRoutes from './components/Routes'
import AddTrainForm from './components/forms/AddTrainForm'
import EditTrainForm from './components/forms/EditTrainForm'
import EditStationForm from './components/forms/EditStationForm'
import AddStationForm from './components/forms/AddStationForm'
import EditRouteForm from './components/forms/EditRouteForm'
import AddRouteForm from './components/forms/AddRouteForm'
// import { Toaster } from './components/ui/sonner'

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
        <Route path="admin/trains/:id" element={<EditTrainForm/>}/>
        <Route path="admin/trains/add" element={<AddTrainForm/>} />
        <Route path="admin/routes" element={<TRoutes/>} />
        <Route path="admin/routes/:id" element={<EditRouteForm/>}/>
        <Route path="admin/routes/add" element={<AddRouteForm/>} />
        <Route path="admin/stations" element={<Stations/>} />
        <Route path="admin/stations/:id" element={<EditStationForm/>}/>
        <Route path="admin/stations/add" element={<AddStationForm/>} />
        <Route path="*" element={<div className='h-screen w-screen bg-black flex flex-col items-center justify-center'><h1 className='text-red-600 font-mono text-4xl animate-pulse'>Error 404 : Page not found !!</h1></div>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
