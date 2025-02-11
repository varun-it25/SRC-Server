

import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event_id: String,
    name: String,
    rtu_roll_no: String,
    college_email: String,
    personal_email: String,
    mobile_no: String,
  },
  { versionKey: false }
);

export const Registration = mongoose.model('Registration', registrationSchema);
