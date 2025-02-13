// controllers/memberController.js
import {Member} from '../models/member.models.js';
import checkRequiredFields from '../utils/checkRequiredFields.js';

export const getMemberById = async (req, res) => {
  const { member_id } = req.params;
  if (!member_id) return res.status(400).json({ message: 'Member id is required.' });

  try {
    const memberData = await Member.findById(member_id);
    if (!memberData) return res.status(404).json({ message: 'Member not found.' });
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving member', error: err.message });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const memberData = await Member.find({});
    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving members', error: err.message });
  }
};

export const createMember = async (req, res) => {
  const { member_image, member_name, member_role, member_email, member_mobile_no } = req.body;

  const missingField = checkRequiredFields(['member_name', 'member_role'], req.body);
  if (missingField) return res.status(400).json({ message: missingField });

  try {
    const memberData = new Member({
      member_image,
      member_name,
      member_role,
      member_email,
      member_mobile_no
    });
    await memberData.save();
    res.status(201).json(memberData);
  } catch (err) {
    res.status(500).json({ message: 'Error saving member data', error: err.message });
  }
};

export const deleteMember = async(req,res) => {
  const {member_id} = req.params;
  try{
    await Member.deleteOne({_id: member_id})
    res.status(201).json(
      {
      message: "Member Deleted Successfully"
      }
    )
  }
catch(err)
{
  res.status(500).json({ message: 'Error while deleting Member', error: err?.message });
}
}
