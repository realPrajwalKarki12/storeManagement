import React from 'react'


import Sidebar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const Profile = () => {


  return (
    <div className='min-h-screen '>
        <div className='max-w-382.5 mx-auto w-full'>
          <div className='flex'>
               <div className={`max-w-[239.2px] sm:block hidden`}>
          <Sidebar/>
         </div>
          <main className="sm:ml-62 md:flex-1 bg-[#F4F5F7]] min-h-screen p-6 w-f">
        <Outlet />
      </main>
      
          </div>
          </div>
        
    </div>
  )
}

export default Profile