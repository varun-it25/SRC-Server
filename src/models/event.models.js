// models/Event.js

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    event_banner: String,
    event_name: { type: String, required: true },
    event_venue: String,
    event_description: String,
    event_date: String,
    event_start_time: String,
    event_end_time: String,
    guest_image: String,
    guest_name: { type: String, required: true },
    guest_email: { type: String, required: true },
    guest_mobile_no: String,
  },
  { versionKey: false }
);

export const Event = mongoose.model('Event', eventSchema);
