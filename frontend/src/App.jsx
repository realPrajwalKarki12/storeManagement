import MainWindow from "./components/MainWindow"
  import {Route, Routes} from "react-router-dom"
  import OverView from "./components/OverView"
  import Customer from "./components/Customer"
  import Orders from "./components/Orders"
  import Inventory from "./components/Inventory" 
  import Login from "./Screens/login" 
// import { Settings } from "lucide-react"

import Settings from "./components/Settings"
export default function App(){

  return (
   <>
   
       <Routes>
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
        <Route path="/" element={<Login/>} />
        <Route element={<MainWindow/>}>
                <Route path="/overview" element={<OverView/>} />
                <Route path="/customers" element={<Customer/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/inventory" element={<Inventory/>} />
                <Route path="/settings" element={<Settings/>} />
        </Route>
       </Routes>


   </>
  )
}