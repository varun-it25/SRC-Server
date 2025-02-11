// routes/eventRoutes.js
import express from 'express';
import {
  createEvent,
  getEventById,
  getAllEvents,
  getUpcomingEvents,
  deleteEvent,
  deleteAllEvents,
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create-event', createEvent);
router.get('/event/:event_id', getEventById);
router.get('/events', getAllEvents);
router.get('/events/upcoming', getUpcomingEvents);
router.delete('/event/delete/:id', deleteEvent);
router.delete('/event/delete_all', deleteAllEvents);

export default router;
