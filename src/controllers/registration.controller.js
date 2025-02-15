// controllers/registrationController.js
import {Registration} from '../models/registration.models.js';

export const getAllRegistrations = async (req, res) => {
  try {
    const registrationData = await Registration.find({});
    res.status(200).json(registrationData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving registrations', error: err.message });
  }
};

export const addRegistration = async (req, res) => {
  const { event_id, name, rtu_roll_no, college_email, personal_email, mobile_no } = req.body;

  try {
    const registrationData = new Registration({
      event_id, 
      name, 
      rtu_roll_no, 
      college_email, 
      personal_email, 
      mobile_no
    });
    await registrationData.save();
    res.status(200).send('Registration added');
  } catch (err) {
    res.status(500).json({ message: 'Error adding registration', error: err.message });
  }
};

export const getRegistrationsByEvent = async (req, res) => {
  const { event_id } = req.params;
  if (!event_id) return res.status(400).json({ message: 'Event id is required.' });

  try {
    const registrationsData = await Registration.find({ event_id });
    if (!registrationsData.length) return res.status(204).json([]);
    res.status(200).json(registrationsData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving registrations', error: err.message });
  }
};

export const getRegistrationById = async (req, res) => {
  const { registration_id } = req.params;
  if (!registration_id) return res.status(400).json({ message: 'Registration id is required.' });

  try {
    const registrationData = await Registration.findById(registration_id);
    if (!registrationData) return res.status(204).json([]);
    res.status(200).json(registrationData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving registration', error: err.message });
  }
};
