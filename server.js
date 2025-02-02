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

const participationSchema = new mongoose.Schema({
  event_id: String,
  name: String,
  rtu_roll_no: String,
  roll: String,
  college_email: String,
  personal_email: String,
  mobile_no: String,
}, { versionKey: false });

const regitrationSchema = new mongoose.Schema({
  event_id: String,
  name: String,
  rtu_roll_no: String,
  college_email: String,
  personal_email: String,
  mobile_no: String,
}, { versionKey: false });

const galleySchema = new mongoose.Schema({
  file_type: String,
  file_name: String,
  file_size: Number,
  file_url: String,
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
const Gallery = mongoose.model('Gallery', galleySchema);
const Registration = mongoose.model('Regitration', regitrationSchema);
const Participation = mongoose.model('Participation', participationSchema);

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

app.get('/event/:event_id', async (req, res) => {
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

app.get('/events/upcoming', async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];    
    const upcomingEvents = await Event.find({ event_date: { $gte: currentDate } });
    res.status(200).json(upcomingEvents);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving events', error: err.message });
  }
});

app.delete('/event/delete/:id', async (req, res) => {
  const {id} = req.params  
  try {
    await Event.findOneAndDelete({_id: id});
    res.status(201).send('Event Deleted');
  } catch (err) {
    res.status(500).json({ message: 'Error Deleting event', error: err.message });
  }
});

app.delete('/event/delete_all', async (req, res) => {
  try {
    await Event.deleteMany({});
    res.status(201).send('All Events Deleted.');
  } catch (err) {
    res.status(500).json({ message: 'Error Deleting all events', error: err.message });
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

app.get('/registrations/all', async (req, res) => {
  try {
    const registrationData = await Registration.find({});
    res.status(200).json(registrationData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving registrations', error: err.message });
  }
});

app.post('/add-registration', async (req, res) => {
  const { event_id, name, rtu_roll_no, college_email, personal_email, mobile_no } = req.body;

  try {
    const registrationData = new Registration({ event_id, name, rtu_roll_no, college_email, personal_email, mobile_no });
    await registrationData.save();
    res.status(200).send('Registration added');
  } catch (err) {
    res.status(500).json({ message: 'Error adding registration', error: err.message });
  }
});

app.get('/registrations/event/:event_id', async (req, res) => {
  const { event_id } = req.params;
  if (!event_id) return res.status(400).json({ message: 'Event id is required.' });

  try {
    const registrationsData = await Registration.find({ event_id });
    if (!registrationsData.length) return res.status(404).json({ message: 'Registrations not found.' });
    res.status(200).json(registrationsData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving registrations', error: err.message });
  }
});

app.get('/registration/:registration_id', async (req, res) => {
  const { registration_id } = req.params;
  if (!registration_id) return res.status(400).json({ message: 'Registration id is required.' });

  try {
    const registrationData = await Registration.findById({ _id: registration_id });
    if (!registrationData) return res.status(404).json({ message: 'Registration not found.' });
    res.status(200).json(registrationData);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: 'Error retrieving registration', error: err.message });
  }
});

app.post('/gallery/upload', async (req, res) => {
  const{ file_type, file_name, file_size, file_url } = req.body
  try {
    const file = new Gallery({file_type, file_name, file_size, file_url})
    await file.save()
    res.status(201).send(`File uploaded.`)
  } catch (err) {
    res.status(500).json({ message: 'Error upload media', error: err.message });
  }
});

app.get('/gallery', async (req, res) => {
  try {
    const files = await Gallery.find({})
    res.status(201).send(files)
  } catch (err) {
    res.status(500).json({ message: 'Error upload media', error: err.message });
  }
});

app.get('/gallery/read_file/:id', async (req, res) => {
  const {id} = req.params
  try {
    const file = await Gallery.findOne({_id: id})
    res.status(201).send(file)
  } catch (err) {
    res.status(500).json({ message: 'Error upload file', error: err.message });
  }
});

app.delete('/gallery/delete_file/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Gallery.findOneAndDelete({_id: id})
    res.status(201).send(`File deleted.`)
  } catch (err) {
    res.status(500).json({ message: 'Error delete file', error: err.message });
  }
});

app.delete('/gallery/delete_all_files', async (req, res) => {
  try {
    await Gallery.deleteMany({})
    res.status(201).send(`All file deleted.`)
  } catch (err) {
    res.status(500).json({ message: 'Error delete file', error: err.message });
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