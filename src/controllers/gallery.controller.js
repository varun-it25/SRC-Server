import {Gallery} from '../models/gallery.models.js';



export const getAllUrls = async (req, res) => {
  try {
    const urls = await Gallery.find({}, '_id cloudinaryUrl');
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { cloudinaryUrl } = req.body;


    if (!cloudinaryUrl) {
      return res.status(400).json({ error: 'cloudinaryUrl is required.' });
    }

    // Find the document by _id and update it
    const updatedUrl = await Gallery.findByIdAndUpdate(
      id,
      { cloudinaryUrl },
      { new: true } 
    );

    if (!updatedUrl) {
      return res.status(404).json({ error: 'URL not found.' });
    }

    res.status(200).json({
      _id: updatedUrl._id,
      cloudinaryUrl: updatedUrl.cloudinaryUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


