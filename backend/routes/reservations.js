const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const Room = require('../models/room');

router.get('/all_reservations', async (req, res) => {
  try {
    const documents = await Reservation.find();
    res.send({ data: documents });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})
router.get('/reservation', async (req, res) => {
  try {
    const id = req.query.id;
    const findDocument = await Reservation.find({ _id: id })
    res.send({ data: findDocument[0] });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/create_reservation', async (req, res) => {
  try {
    const findRoom = await Room.find({ _id: req.body.room })

    const createdDocument = await Reservation.create({
      ...req.body,
      room: findRoom[0]
    });

    // update the room status to be unavailable
    if (createdDocument) {
      await Room.updateOne(
        {
          _id: req.body.room
        },
        {
          availability: false,
        }
      )
    }

    res.send({ message: 'Document created', data: createdDocument });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/edit_reservation', async (req, res) => {
  try {
    const editDocument = await Reservation.updateOne(
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
    // Creation failed
    res.status(500).send({ error: error })
  }
})

router.post('/delete_reservation', async (req, res) => {
  try {
    const findReservation = await Reservation.find({ _id: req.body.id })
    const findRoom = await Room.updateOne(
      { _id: findReservation[0].id },
      {
        availability: true,
      }
    )

    const deleteDocument = await Reservation.deleteOne(
      {
        _id: req.body.id,
      }
    )
    res.send({ message: 'Document Deleted', data: deleteDocument });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

module.exports = router;