import bodyParser from "body-parser"
import { addItem, deleteItem, getItems } from "./controller/item-control"

const express = require('express')
const cors = require('cors')

const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// routes
app.get('/', getItems)
app.post('/add', addItem)
app.delete('/:id', deleteItem)

// start the server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`HTTP is running on port:${PORT}`)
})