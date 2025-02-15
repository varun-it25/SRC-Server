// routes/memberRoutes.js
import express from "express";
import { getMemberById, getAllMembers, createMember, deleteMember } from "../controllers/member.controller.js";

const router = express.Router();

router.get("/members/:member_id", getMemberById);
router.get("/members", getAllMembers);
router.post("/create-member", createMember);
router.delete("/delete-members/:member_id", deleteMember);

export default router;