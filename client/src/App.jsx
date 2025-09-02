import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'


const App = () => {

  const {checkAuth,isCheckingAuth,user} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[]);

   if(isCheckingAuth && !user) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />

    </div>
  )
  return (
    <div>
      <Outlet/>
      <Toaster/>
    </div>
  )
}

export default App