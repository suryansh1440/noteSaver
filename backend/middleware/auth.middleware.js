import jwt from "jsonwebtoken";
import User from "../modals/user.modal.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};