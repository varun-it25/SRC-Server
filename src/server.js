import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import eventRoutes from './routes/event.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import memberRoutes from './routes/member.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use(eventRoutes);
app.use(registrationRoutes);
app.use(feedbackRoutes);
app.use(galleryRoutes);
app.use(memberRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});