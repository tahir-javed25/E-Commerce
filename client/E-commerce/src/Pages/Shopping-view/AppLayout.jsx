import React from 'react'
import { Outlet } from 'react-router-dom'

// import SimpleSlider from '../components/test.jsx'
import Header from '../../components/Shopping-Components/Header.jsx'
// import Footer from '../../components/Shopping-Components/Footer.jsx'

const AppLayout = () => {
  return (
   <>
   <div className='h-[100vh] w-full flex  flex-col'>    
   <Header className= "w-full " />
   <Outlet className="h-[80vh] " />
   {/* <SimpleSlider/> */}
   {/* <Footer/> */}
   </div>
   </>
  )
}

export default AppLayout
