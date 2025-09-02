import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Mail, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [showOtp, setShowOtp] = useState(false)

  const {user,login,isLogging,isResendingOTP,resendOTP,isOtpSend} = useAuthStore();
  const navigate = useNavigate();

  if(user){
    navigate('/');
  }

  const handleResendOtp = () => {
    resendOTP({email});
  }

  const handleSignIn = () => {
    if (!email || !otp) {
      toast.error('Please fill in all fields')
      return
    }
    login({email,otp});
    // navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex rounded-2xl overflow-hidden p-4">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center sm:justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="/icon.png" alt="" />
              </div>
              <span className="text-lg font-bold text-gray-900">HD</span>
            </div>
          </div>

          {/* Sign in header */}
          <div className="text-center sm:text-start">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please login to continue to your account.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email field */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm peer"
                placeholder='Enter your email address'
              />
              <label 
                htmlFor="email" 
                className="absolute left-3 -top-2 px-1 bg-gray-50 text-xs font-medium text-gray-500 peer-focus:text-blue-600 z-10"
              >
                Email
              </label>
            </div>

        
            {isOtpSend && (<>
            <div className="relative">
              <input
                id="otp"
                name="otp"
                type={showOtp ? "text" : "password"}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm peer"
                placeholder='Enter OTP'
              />
              <label 
                htmlFor="otp" 
                className="absolute left-3 -top-2 px-1 bg-gray-50 text-xs font-medium text-gray-500 peer-focus:text-blue-600 z-10"
              >
                OTP
              </label>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowOtp(!showOtp)}
              >
                {showOtp ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleResendOtp}
                className="underline text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                {isResendingOTP ? 'Resending OTP...' : 'Resend OTP'}
              </button>
            </div>

            {/* Keep me logged in */}
            <div className="flex items-center">
              <input
                id="keep-logged-in"
                name="keep-logged-in"
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-gray-900">
                Keep me logged in
              </label>
            </div></>)}

            {/* Sign in button */}
            {isOtpSend ? (<div>
              <button
                type="button"
                onClick={handleSignIn}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {isLogging ? 'Signing in...' : 'Sign in'}
              </button>
            </div>) : 
            (<div>
              <button
                type="button"
                onClick={handleResendOtp}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {isResendingOTP ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>)}

            {/* Create account link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Need an account? </span>
              <button
                type="button"
                className="underline text-sm text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => navigate('/signup')}
              >
                Create one
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Abstract design */}
      <div className="hidden lg:block relative flex-1 ">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img src="/container.png" alt="login-bg" className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
