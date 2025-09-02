import User from "../modals/user.modal.js";
import generateOTP from "../lib/getOTP.js";
import { generateToken } from "../lib/utils.js";
import { sendEmail } from "../lib/sendEmail.js";

export const signup = async (req, res) => {
  const { name, email, dob } = req.body;
  
  try {
    // Validate required fields
    if (!name || !email || !dob) {
      return res.status(400).json({ 
        success: false,
        message: "Name, email and dob are required" 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: "Email already exists" 
      });
    }

    // Generate OTP and expiry (15 minutes from now)
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Create new user
    const newUser = new User({
      name,
      email,
      dob,
      otp,
      otpExpiry
    });

    await newUser.save();

    // Send OTP via email
    const emailSubject = "Your OTP for NoteSaver Signup";
    const emailText = `Your OTP is: ${otp}. It is valid for 15 minutes.`;
    await sendEmail(email, emailSubject, emailText);

    return res.status(201).json({
      success: true,
      message: "User created successfully. Please verify with OTP.",
      data: {
        userId: newUser._id,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if OTP matches
    if (user.otp.toString() !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate token using your token function
    const token = generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      user,
      token
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate new OTP and expiry
    const newOtp = generateOTP();
    const newOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Update user with new OTP
    user.otp = newOtp.toString();
    user.otpExpiry = newOtpExpiry;
    await user.save();

    // Send new OTP via email
    const emailSubject = "Your New OTP for NoteSaver Login";
    const emailText = `Your new OTP is: ${newOtp}. It is valid for 15 minutes.`;
    await sendEmail(user.email, emailSubject, emailText);

    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
      data: {
      }
    });

  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user has an OTP
    if (!user.otp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new OTP first."
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    // Clear OTP after successful login
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate token using your token function
    const token = generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const checkAuth = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        data: req.user
      });
    } catch (error) {
      console.error("Error in checkAuth controller:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

