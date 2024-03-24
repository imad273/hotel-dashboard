const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser')
const port = 9999;

// database connection
require('./config/database');

// ! edit later
app.use(
  cors(
    {
      origin: '*',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
  )
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const Room = require('./models/room');

app.get('/all_rooms', async (req, res) => {
  try {
    const findDocument = await Room.find()
    res.send({ data: findDocument });
  } catch (error) {
    // Creation failed
    res.status(500).send({ error: error })
  }
})

app.post('/create_room', upload.array("images"), async (req, res) => {
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

app.listen(port, () => {
  console.log(`app running on port ${port}`)
})