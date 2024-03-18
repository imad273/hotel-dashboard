const express = require('express')
const app = express()
const port = 9999;

// database connection
require('./config/database');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app running on port ${port}`)
})