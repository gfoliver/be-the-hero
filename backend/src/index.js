const express = require('express')
//const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'backend'
    })
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
})