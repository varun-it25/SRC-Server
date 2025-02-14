// controllers/feedbackController.js
import {Feedback} from '../models/feedback.models.js';
import { Event } from '../models/event.models.js';

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbackData = await Feedback.find({});
    res.status(200).json(feedbackData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving feedbacks', error: err.message });
  }
};

export const addFeedback = async (req, res) => {
  const { event_id, name, rtu_roll_no, mobile_no, experience } = req.body;

  try {
    const feedbackData = new Feedback({ event_id, name, rtu_roll_no, mobile_no, experience });
    await feedbackData.save();
    res.status(200).send('Feedback added');
  } catch (err) {
    res.status(500).json({ message: 'Error adding feedback', error: err.message });
  }
};

export const getFeedbacksByEvent = async (req, res) => {
  const { event_id } = req.params;
  if (!event_id) return res.status(400).json({ message: 'Event id is required.' });

  try {
    const feedbacksData = await Feedback.find({ event_id });
    if (!feedbacksData.length) return res.status(204).json({ message: 'Feedbacks not found.' });
    res.status(200).json(feedbacksData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving feedbacks', error: err.message });
  }
};

export const getFeedbackById = async (req, res) => {
  const { feedback_id } = req.params;
  if (!feedback_id) return res.status(400).json({ message: 'Feedback id is required.' });

  try {
    const feedbackData = await Feedback.findById(feedback_id);
    if (!feedbackData) return res.status(204).json({ message: 'Feedback not found.' });
    res.status(200).json(feedbackData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving feedback', error: err.message });
  }
};

export const getFeedbacksForMostRecentEvent = async (req, res) => {
  try {
  
    const currentDate = new Date();
    const mostRecentEvent = await Event.findOne({ event_date: { $lte: currentDate } })  
      .sort({ event_date: 1 });  

   
    if (!mostRecentEvent) {
      return res.status(404).json({ message: 'No past events found' });
    }

    
    const feedbackData = await Feedback.find({ event_id: mostRecentEvent._id });

 
    if (feedbackData.length === 0) {
      return res.status(204).json({ message: 'No feedbacks found for this event' });
    }

   
    res.status(200).json(feedbackData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving feedbacks', error: err.message });
  }
};

