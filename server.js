const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const eventSchema = new mongoose.Schema({
  event_banner: String,
  event_name: String,
  event_venue: String,
  event_description: String,
  event_date: String,
  event_start_time: String,
  event_end_time: String,
  guest_image: String,
  guest_name: String,
  guest_email: String,
  guest_mobile_no: String,
}, { versionKey: false });

const memberSchema = new mongoose.Schema({
  member_image: String,
  member_name: String,
  member_role: String,
  member_email: String,
  member_mobile_no: String,
}, { versionKey: false });

const Event = mongoose.model('Event', eventSchema);
const Member = mongoose.model('Member', memberSchema);

const checkRequiredFields = (requiredFields, data) => {
  for (let field of requiredFields) {
    if (!data[field]) {
      return `${field} is required.`;
    }
  }
  return null;
};

app.post('/create-event', async (req, res) => {
  const { event_banner, event_name, event_venue, event_description, event_date, event_start_time, event_end_time, guest_image, guest_name, guest_email, guest_mobile_no } = req.body;
  
  const missingField = checkRequiredFields(['event_name', 'guest_name', 'guest_email'], req.body);
  if (missingField) return res.status(400).json({ message: missingField });

  try {
    const eventData = new Event({ event_banner, event_name, event_venue, event_description, event_date, event_start_time, event_end_time, guest_image, guest_name, guest_email, guest_mobile_no });
    await eventData.save();
    res.status(201).json(eventData);
  } catch (err) {
    res.status(500).json({ message: 'Error saving event data', error: err.message });
  }
});

app.get('/events/:event_id', async (req, res) => {
  const { event_id } = req.params;
  if (!event_id) return res.status(400).json({ message: 'Event id is required.' });

  try {
    const eventData = await Event.findById(event_id);
    if (!eventData) return res.status(404).json({ message: 'Event not found.' });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving event', error: err.message });
  }
});

app.get('/events', async (req, res) => {
  try {
    const eventData = await Event.find({});
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving events', error: err.message });
  }
});

app.get('/members/:member_id', async (req, res) => {
  const { member_id } = req.params;
  if (!member_id) return res.status(400).json({ message: 'Member id is required.' });

  try {
    const memberData = await Member.findById(member_id);
    if (!memberData) return res.status(404).json({ message: 'Member not found.' });
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving member', error: err.message });
  }
});

app.get('/members', async (req, res) => {
  try {
    const memberData = await Member.find({});
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving members', error: err.message });
  }
});

app.post('/create-member', async (req, res) => {
  const { member_image, member_name, member_role, member_email, member_mobile_no } = req.body;

  const missingField = checkRequiredFields(['member_name', 'member_role'], req.body);
  if (missingField) return res.status(400).json({ message: missingField });

  try {
    const memberData = new Member({ member_image, member_name, member_role, member_email, member_mobile_no });
    await memberData.save();
    res.status(201).json(memberData);
  } catch (err) {
    res.status(500).json({ message: 'Error saving member data', error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});