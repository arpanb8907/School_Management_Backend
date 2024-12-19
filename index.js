import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
// import sampleRoutes from './routes/sampleRoutes.js'; 
import router from "./routes/userRoutes.js"
import  dotenv from 'dotenv';

// mongodb+srv://arpanbhowmick1312:a5kXatFBSoNsd4DF@cluster0.m97in.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

dotenv.config();

const Corsoptions = {
    origin : ["https://school-management-frontend-iopu.onrender.com","http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const port = process.env.PORT || 5000;
const app = express();
//app.options('*', cors(Corsoptions)); // Preflight requests handler

app.use(cors(Corsoptions))
app.use(express.json());

mongoose.connect('mongodb+srv://arpanbhowmick1312:a5kXatFBSoNsd4DF@cluster0.m97in.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
  
  // Use routes for user registration, login, and fetching users
// app.use('/api/users', userRoutes);
app.use('/api', router);



// start the server

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})