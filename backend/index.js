const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) // to parse the incoming requests with JSON payloads

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})