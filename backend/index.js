import express from "express";
import cors from "cors";
import router from "./routs/userrouter.js";
import connectDB from "./db/connectdb.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());// <-- Add this line
app.use(express.urlencoded({extended:true})) ;
const PORT = 5000;
connectDB();
app.use("/api/auth", router);
//api = http://localhost:5000/api/auth/


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 

