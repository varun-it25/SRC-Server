

import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    member_image: String,
    member_name: { type: String, required: true },
    member_role: { type: String, required: true },
    member_email: String,
    member_mobile_no: String,
  },
  { versionKey: false }
);

export const Member = mongoose.model('Member', memberSchema);
