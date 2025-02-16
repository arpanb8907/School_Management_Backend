import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import sampleRoutes from './routes/sampleRoutes.js';
import router from "./routes/account.js";
import dotenv from "dotenv";

import feeRoutes from "./routes/feeRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socketcontroller from "./controllers/socketcontroller.js";

// mongodb+srv://arpanbhowmick1312:a5kXatFBSoNsd4DF@cluster0.m97in.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

dotenv.config();

const Corsoptions = {
  origin: [
    "https://school-management-frontend-iopu.onrender.com",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const port = process.env.PORT || 8000;
const app = express();
const server = createServer(app); // create an http server manually as we are going to use socket.io as
// app.listen() doesn’t support WebSockets directly.

const io = new Server(server, {
  cors: {
    origin: [
      "https://school-management-frontend-iopu.onrender.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});

app.options("*", cors(Corsoptions)); // Preflight requests handler

app.use(cors(Corsoptions));
app.use(express.json());
socketcontroller(io)
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use routes for user registration, login, and fetching users
// app.use('/api/users', userRoutes);
app.use("/api", router);
app.use("/api/fees", feeRoutes);
app.use("/api/payments", paymentRoutes);


// start the server
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

