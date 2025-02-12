const Event = require('../models/Event');

// Get all events and count total/upcoming events
exports.getEvents = async (req, res) => {
  try {
    const currentDate = new Date();  // Current date (with time)

    // Count total events
    const totalEvents = await Event.countDocuments();

    // Count upcoming events (where the event date is greater than or equal to the current date)
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: currentDate }
    });

    res.status(200).json({
      total_events: totalEvents,
      upcoming_events: upcomingEvents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
