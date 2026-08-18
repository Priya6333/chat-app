import express from "express"
import connectDB from "./config/db.js"
// import userRoutes from "./Routes/userRoutes.js"

import "dotenv/config.js"
import cors from "cors"
import profileRoutes from "./routes/profileRoutes.js";
import followersRoutes from "./routes/followersRoutes.js";
import followingRoutes from "./routes/followingRoutes.js";


const app = express();
connectDB();
//dotenv.config()

const PORT = process.env.PORT || 3001;


      //middleware
app.use(express.json())
app.use(cors({
      origin:"http://localhost:5173",
      credentials:true
}))


  // http://localhost:3000/profile;
app.use("/api/profile", profileRoutes);
app.use("/api/followers", followersRoutes);
app.use("/api/following", followingRoutes);
    


app.listen(PORT,()=>{
  console.log(`Server is Up at http://localhost:${PORT}`);

})