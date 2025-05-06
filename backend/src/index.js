import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("hello guys wellcome to the leetlab🔥")
}) 

app.use("/api/v1/auth", authRoutes)

app.listen(process.env.PORT ,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
}
    
)