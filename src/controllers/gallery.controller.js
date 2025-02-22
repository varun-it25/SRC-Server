import {Gallery} from '../models/gallery.models.js';

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Gallery.find({});
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUrl = async (req, res) => {
  const { id } = req.params;
  const { cloudinaryUrl } = req.body;
  
  try {    
    await Gallery.findOneAndUpdate({_id: id}, { cloudinaryUrl });     
    res.status(200).send(`Url Updated.`);    
  }
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};


