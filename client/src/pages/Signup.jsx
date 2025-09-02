import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Calendar, Mail, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [otp, setOtp] = useState('')
  const [showOtpField, setShowOtpField] = useState(false)
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');

  const {signup,isSigningUp,user,isVerifyingOTP,verifyOTP,isOtpSend} = useAuthStore();
  const navigate = useNavigate();

  if(user){
    navigate('/');
  }


  const handleGetOtp = async () => {
    // Validate required fields
    if (!name || !dob || !email) {
      toast.error('Please fill in all fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    
    await signup({ name, dob, email });
    setShowOtpField(true)
      
  }

  const handleSignUp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP')
      return
    }

    if (otp.length < 6) {
      toast.error('OTP must be at least 6 characters') // Assuming 6-digit OTP
      return
    }
    
    await verifyOTP({ email, otp });
   
  }

  return (
    <div className="min-h-screen flex rounded-2xl overflow-hidden p-4">
      {/* Left side - Signup form */}
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

          {/* Sign up header */}
          <div className="text-center sm:text-start">
            <h2 className="text-3xl font-bold text-gray-900">Sign up</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign up to enjoy the feature of HD
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Your Name field */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Date of Birth field */}
            <div className="relative">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter date of birth"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Email field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* OTP field - Only shown after clicking Get OTP */}
            {showOtpField && (
              <div className="relative">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
            )}

            {/* Action Button */}
            <div>
              {!showOtpField ? (
                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={isSigningUp}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningUp ? 'Sending OTP...' : 'Get OTP'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={isVerifyingOTP}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifyingOTP ? 'Creating Account...' : 'Sign up'}
                </button>
              )}
            </div>

            {/* Sign in link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account?? </span>
              <button
                type="button"
                className="underline text-sm text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Abstract design */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img src="/container.png" alt="signup-bg" className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup