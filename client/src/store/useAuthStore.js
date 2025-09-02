import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set,get) => ({
  user:null,
  isCheckingAuth:false,
  isLogging:false,
  isSigningUp:false,
  isLoggingOut:false,
  isVerifyingOTP:false,
  isResendingOTP:false,
  isOtpSend:false,

  checkAuth: async () => {
    set({isCheckingAuth:true});
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({user:response.data.data});
    } catch (error) {
      set({user:null});
      set({isOtpSend:false})
    }finally{
      set({isCheckingAuth:false});
    }
  },
  logout: async () => {
    set({isLoggingOut:true});
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({user:null});
      set({isOtpSend:false})
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }finally{
      set({isLoggingOut:false});
    }
  },
  signup: async (userData) => {
    set({isSigningUp:true});
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      toast.success(response.data.message);
      set({isOtpSend:true});
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({isSigningUp:false});
    }
  },
  verifyOTP: async (userData) => {
    set({isVerifyingOTP:true});
    try {
      const response = await axiosInstance.post("/auth/verify-otp", userData);
      set({user:response.data.user});
      toast.success(response.data.message);
      set({isOtpSend:false});
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({isVerifyingOTP:false});
    }
  },
  resendOTP: async (userData) => {
    set({isResendingOTP:true});
    try {
      const response = await axiosInstance.post("/auth/resend-otp", userData);
      toast.success(response.data.message);
      set({isOtpSend:true});
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({isResendingOTP:false});
    }
  },
  login: async (userData) => {
    set({isLogging:true});
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      set({user:response.data.user});
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({isLogging:false});
    }
  },

  
}))


