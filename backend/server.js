import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDb from './db/connectToMongoDb.js';

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());  // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser())

dotenv.config();


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)



app.get("/",(req,res)=>{
    res.send("hello")
})


app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server listening on port ${PORT}`)
})