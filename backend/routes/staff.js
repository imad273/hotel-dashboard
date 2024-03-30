const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');

router.get('/all_staff', async (req, res) => {
  try {
    const documents = await Staff.find();
    res.send({ data: documents });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.get('/worker', async (req, res) => {
  try {
    const id = req.query.id;
    const findDocument = await Staff.find({ _id: id })
    res.send({ data: findDocument[0] });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/create_worker', async (req, res) => {
  try {
    const createdDocument = await Staff.create(req.body)
    res.send({ message: 'Document created', data: createdDocument });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/edit_worker', async (req, res) => {
  try {
    const editDocument = await Staff.updateOne(
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

router.post('/delete_worker', async (req, res) => {
  try {
    const deleteDocument = await Staff.deleteOne(
      {
        _id: req.body.id
      }
    )
    res.send({ message: 'Document Deleted', data: deleteDocument });
  } catch (error) {
    console.log(error);
    // Creation failed
    res.status(500).send({ error: error })
  }
})

module.exports = router;