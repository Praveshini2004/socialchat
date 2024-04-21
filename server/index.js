import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
const app = express();
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors(
    {
        origin:["https://socialchatapp.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
            
            
));
mongoose.set('strictQuery', false); 
dotenv.config();
mongoose.connect(
    process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(5000, () => {
    console.log(`Listening at ${process.env.PORT}`);
  });
}).catch(error => {
  console.error("Error connecting to MongoDB:", error);
});

app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
