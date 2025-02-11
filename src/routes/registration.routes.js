// routes/registrationRoutes.js
import express from "express";
import {
  getAllRegistrations,
  addRegistration,
  getRegistrationsByEvent,
  getRegistrationById,
} from "../controllers/registration.controller.js";

const router = express.Router();

router.get("/registrations/all", getAllRegistrations);
router.post("/add-registration", addRegistration);
router.get("/registrations/event/:event_id", getRegistrationsByEvent);
router.get("/registration/:registration_id", getRegistrationById);

export default router;
