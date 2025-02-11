// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import eventRoutes from './routes/event.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import memberRoutes from './routes/member.routes.js';

dotenv.config();

const app = express();

// const MONGO_URL = process.env.MONGO_URL

// Middlewares
app.use(cors());
app.use(express.json());


// Connect to Database
const PORT = process.env.PORT || 3000;
// const { MONGODB_URL } = process.env;
connectDB()
.then(() => {
  //listening to errors before app.listen
  app.on("error", (err) => {
    console.log("ERRR: ", err);
    throw err;
  }); // just a precheck if there is error or not.
})
.catch((err) => {
  console.log("DB CONNECTION FAILED!!", err);
});

// Use Routes
app.use(eventRoutes);
app.use(registrationRoutes);
app.use(feedbackRoutes);
app.use(galleryRoutes);
app.use(memberRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
