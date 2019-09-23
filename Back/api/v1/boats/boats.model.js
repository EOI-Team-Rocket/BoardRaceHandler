const mongoose = require("mongoose");

const BOATschema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

});


module.exports = mongoose.model("boat", BOATschema);