const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')


connectToMongo();
const app = express()
app.use(cors())
const port = 5000

app.use(express.json())

app.use('/api/auth',require('./routes/auth.js'))

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})