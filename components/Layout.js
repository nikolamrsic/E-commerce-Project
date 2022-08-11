import React from 'react'
import Navbar from './Navbar'
import KorpaProvider from './Context/Korpa'
import SideBarFilter from './SideBarFilter'
import { useRouter } from 'next/dist/client/router'
import Footer from './footer'
import MobileFilter from './mobileFilter'
export default function Layout({children}) {
  let router=useRouter()
  let pages=['/login','/anim','/kasa','/single/patika']

  return (
      <KorpaProvider>
    <div className=''>
        <Navbar></Navbar>
      
        <div className='h-[100px]'></div>
          
          <MobileFilter/>
        <div className='flex gap-4 min-h-screen items'>
       
        {pages.every((item)=>router.asPath.includes(item)===false) && <div className=' border-r  border-orange-500/50 hidden lg:block w-2/12'><SideBarFilter/></div>}
        
         {children}
        </div>
      <Footer/>
    </div>
    </KorpaProvider>
  )
}
