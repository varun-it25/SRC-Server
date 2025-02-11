

import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    event_id: String,
    name: String,
    rtu_roll_no: String,
    mobile_no: String,
    experience: String,
  },
  { versionKey: false }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
