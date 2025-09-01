import express from 'express';
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"



dotenv.config()

const app = express()


const PORT = process.env.PORT || 3000;
app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));




app.get("/",(req,res)=>{
    res.send("noteSaver Backend is running!");
})

// Connect to database first, then start server
const startServer = async () => {
    try {
        console.log('Starting server...');
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Port:', PORT);
        
        // Connect to MongoDB first
        await connectDB();
        
        // Start server after database connection
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);        
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Start server for Render
startServer();
