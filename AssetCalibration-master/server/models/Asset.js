const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Asset = new Schema(
    {
        name: { type: String, required: true },
        sku: { type: String, required: true },
        clibrationDate : {type: String, require : true},
        calibrationPeriodicity:{type: String, require : true},
        maintenaceTech:  {type: String, require : true},
        notificationReceiver:  {type: String, require : true},
        fileName:  {type: [String], require : false}
    }
)

module.exports = mongoose.model('assets', Asset)