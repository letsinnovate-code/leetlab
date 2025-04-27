import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})