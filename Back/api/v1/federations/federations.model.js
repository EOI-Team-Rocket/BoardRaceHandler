const mongoose = require("mongoose");

const FEDERATIONschema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    tel: {
        type: String,
    },
    coordinates: [{
        type: String
    }]

});


module.exports = mongoose.model("event", FEDERATIONschema);