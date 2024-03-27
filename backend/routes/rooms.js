const express = require('express');
const router = express.Router();
const Room = require('../models/room');
var multer = require('multer');

const storage = require('../config/storage');

const upload = multer({ storage: storage })

router.get('/all_rooms', async (req, res) => {
  try {
    const documents = await Room.find();
    res.send({ data: documents });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.get('/room', async (req, res) => {
  try {
    const id = req.query.id;
    const findDocument = await Room.find({ _id: id })
    res.send({ data: findDocument[0] });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/create_room', upload.array("images"), async (req, res) => {
  try {
    const createdDocument = await Room.create({
      ...req.body,
      availability: true,
      images: req.files.map(image => image.filename)
    })
    res.send({ message: 'Document created', data: createdDocument });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/edit_room', upload.array("images"), async (req, res) => {
  try {
    const editDocument = await Room.updateOne(
      {
        _id: req.body.id
      },
      {
        ...req.body,
        availability: req.body.availability === "true" ? true : false,
        ...(req.files.length > 0 && { images: req.files.map(image => image.filename) })
      }
    )
    res.send({ message: 'Document updated', data: editDocument });
  } catch (error) {
    console.log(error);
    // Creation failed
    res.status(500).send({ error: error })
  }
})

module.exports = router;