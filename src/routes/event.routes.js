// routes/eventRoutes.js
import express from 'express';
import {
  createEvent,
  getEventById,
  getAllEvents,
  deleteEvent,
  deleteAllEvents,
  updateEvent,
  getMostRecentUpcomingEvent,
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create-event', createEvent);
router.get('/event/:event_id', getEventById);
router.get('/events', getAllEvents);
router.delete('/event/delete/:event_id', deleteEvent);
router.delete('/event/delete_all', deleteAllEvents);
router.patch('/events/update/:event_id', updateEvent);
router.get('/events/upcoming', getMostRecentUpcomingEvent);

export default router;
