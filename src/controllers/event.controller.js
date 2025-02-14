// controllers/eventController.js
import { Event } from "../models/event.models.js";
import checkRequiredFields from "../utils/checkRequiredFields.js";

export const createEvent = async (req, res) => {
  const {
    event_banner,
    event_name,
    event_venue,
    event_description,
    event_date,
    event_start_time,
    event_end_time,
    guest_image,
    guest_name,
    guest_email,
    guest_mobile_no,
  } = req.body;

  const missingField = checkRequiredFields(
    ["event_name", "guest_name", "guest_email"],
    req.body
  );
  if (missingField) return res.status(400).json({ message: missingField });

  try {
    const eventData = new Event({
      event_banner,
      event_name,
      event_venue,
      event_description,
      event_date,
      event_start_time,
      event_end_time,
      guest_image,
      guest_name,
      guest_email,
      guest_mobile_no,
    });
    await eventData.save();
    res.status(201).json(eventData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving event data", error: err.message });
  }
};

export const getEventById = async (req, res) => {
  const { event_id } = req.params;
  if (!event_id) { return res.status(400).json({ message: "Event id is required." }); }

  try {
    const eventData = await Event.findById(event_id);
    if (!eventData)
      return res.status(404).json({ message: "Event not found." });
    res.status(200).json(eventData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving event", error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const eventData = await Event.find({});
    res.status(200).json(eventData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving events", error: err.message });
  }
};


export const getMostRecentUpcomingEvent = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const mostRecentEvent = await Event.find({
      event_date: { $gte: currentDate },
    })
      .sort({ event_date: 1 }) // Sort by event_date in ascending order to get the earliest upcoming events

    if (!mostRecentEvent) {
      return res.status(404).json({ message: "No upcoming events found" });
    }

    res.status(200).json(mostRecentEvent);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving the most recent upcoming event", error: err.message });
  }
};


export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findOneAndDelete({ _id: id });
    res.status(201).send("Event Deleted");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Deleting event", error: err.message });
  }
};

export const deleteAllEvents = async (req, res) => {
  try {
    await Event.deleteMany({});
    res.status(201).send("All Events Deleted.");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Deleting all events", error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  const { event_id } = req.params;
  const {
    event_banner,
    event_name,
    event_venue,
    event_description,
    event_date,
    event_start_time,
    event_end_time,
    guest_image,
    guest_name,
    guest_email,
    guest_mobile_no,
  } = req.body;

  try {
    const eventData = await Event.findByIdAndUpdate(
      event_id,
      {
        event_banner,
        event_name,
        event_venue,
        event_description,
        event_date,
        event_start_time,
        event_end_time,
        guest_image,
        guest_name,
        guest_email,
        guest_mobile_no,
      },
      { new: true }
    );

    if (!eventData) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(eventData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating event data", error: err.message });
  }
};
