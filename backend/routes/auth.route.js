import { Router } from "express";
import { signup,verifyOTP, logout ,resendOTP, login, checkAuth } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/resend-otp", resendOTP);
authRouter.post("/login", login);
authRouter.get("/check-auth", protectRoute, checkAuth);
authRouter.post("/logout", logout);

export default authRouter;