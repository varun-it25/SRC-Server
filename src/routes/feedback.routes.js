// routes/feedbackRoutes.js
import express from 'express';
import { getAllFeedbacks, addFeedback, getFeedbacksByEvent, getFeedbackById } from '../controllers/feedback.controller.js';

const router = express.Router();

router.get('/feedbacks/all', getAllFeedbacks);
router.post('/add-feedback', addFeedback);
router.get('/feedbacks/event/:event_id', getFeedbacksByEvent);
router.get('/feedback/:feedback_id', getFeedbackById);

export default router;
