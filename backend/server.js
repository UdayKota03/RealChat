import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDb from './db/connectToMongoDb.js';
import { app,server } from './socket/socket.js';


const PORT = process.env.PORT || 8000;

const __dirname =path.resolve();


app.use(express.json());  // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json())

dotenv.config();


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.use(cors({
    origin: 'http://localhost:3000', // Your frontend origin
    credentials: true, // Allow cookies to be sent
}));

// app.get("/",(req,res)=>{
//     res.send("hello")
// })


server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server listening on port ${PORT}`)
})