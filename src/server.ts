const express = require('express')
const cors = require('cors')

const app = express()

// middleware
app.use(express.json())
app.use(cors())

const PORT = 5000
app.listen(PORT, () => {
  console.log(`HTTP is running on port:${PORT}`)
})