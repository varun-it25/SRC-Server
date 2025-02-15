// controllers/galleryController.js
import {Gallery} from '../models/gallery.models.js';

export const uploadFile = async (req, res) => {
  const { public_id, file_name, file_size, file_url } = req.body;
  try {
    const file = new Gallery({ public_id, file_name, file_size, file_url });
    await file.save();
    res.status(201).send('File uploaded.');
  } catch (err) {
    res.status(500).json({ message: 'Error uploading media', error: err.message });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await Gallery.find({});
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving files', error: err.message });
  }
};

export const getFileById = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await Gallery.findById(id);
    if (!file) return res.status(404).json({ message: 'File not found.' });
    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving file', error: err.message });
  }
};

export const deleteFileById = async (req, res) => {
  const { id } = req.params;
  try {
    await Gallery.findByIdAndDelete(id);
    res.status(200).send('File deleted.');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
};

export const deleteAllFiles = async (req, res) => {
  try {
    await Gallery.deleteMany({});
    res.status(200).send('All files deleted.');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting all files', error: err.message });
  }
};
