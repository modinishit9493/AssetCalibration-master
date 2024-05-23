const mongoose = require('mongoose')

mongoose
    //.connect('mongodb://127.0.0.1:27017/asset_db', { useNewUrlParser: true })  // LOCAL ADDRESS
    .connect('mongodb+srv://admin:J48v3xNiSZWJSd3f@cluster0.fnvqu.mongodb.net/asset_calibration_db?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true }) // CLOUD
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
