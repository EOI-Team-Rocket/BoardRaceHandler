const mongoose = require("mongoose");

const EVENTschema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The title is required"],
        max: 100
    },

    date: {
        type: String,
        required: [true, "The date is required"],
        //dd/mm/yyyy
        validate: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    },

    hour: {
        type: String,
        required: [true, "The hour is required"],
        //hh:mm:ss
        validate: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    },

    place: {
        type: String,
        required: [true, "The place is required"],
        max: 100 
    },

    image: {
        type: String
    },

    gender: {
        type: Number,
        required: [true, "The gender is required"],
        enum: [0, 1, 2]
    },

    category: {
        type: Array,
        required: [true, "The category is required"],
        validate: [arrayLength, "Size of array must be 2"],
    },

    description: {
        type: String,
        required: [true, "The description is required"],
        max: 800
    },

    capacity: {
        type: Number
    },

    sailingClub: {
        type: String,
        required: [true, "The description is required"],
        max:100
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    competition: {
        type: String
    },

    participants: {
        type: Array,
        default: []
    }


});

// Returns true if the length of the array is 2
function arrayLength(array){
    return array.length == 2;
}

module.exports = mongoose.model("event", EVENTschema);
module.exports = EVENT;
