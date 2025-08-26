import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import DashboardPage from '../components/DashboardPage'

const Layout = () => {
    return (
        <div>

            <div className='lg:w-[80%] lg:ml-[20%] sm:ml-0 sm:w-[100%]  '>
                <div className='sticky top-0 z-50 '><DashboardHeader /> </div>
                {/* <div className='bg-gray-200'> <Outlet /></div> */}
            </div>
            <div className=''> <Dashboard /> </div>
        </div>
    )
}

export default Layout