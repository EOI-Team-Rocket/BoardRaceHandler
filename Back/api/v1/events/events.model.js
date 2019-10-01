const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const EVENTschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The title is required"]
  },

  date: {
    type: String,
    required: [true, "The date is required"],
    //dd/mm/yyyy
    validate: /^\d{4}-\d{2}-\d{2}$/
  },

  hour: {
    type: String,
    required: [true, "The hour is required"],
    //hh:mm
    validate: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  },

  place: {
    type: String,
    required: [true, "The place is required"]
  },
  cancel: {
    type: Boolean,
    default: false
  },
  celebrated: {
    type: Boolean,
    default: false
  },
  image: {
    type: String //search
  },
  gender: {
    type: String,
    required: [true, "The gender is required"],
    enum: ["F", "M", "X"]
  },
  class_boat: {
    type: String,
    enum: [
      "420",
      "470",
      "29-ER",
      "49-ER",
      "Crucero",
      "Hansa 303",
      "Ideal 18",
      "J-80",
      "Kiteboarding",
      "Laser 4.7",
      "Laser Radial",
      "Nacra-17",
      "Optimist",
      "Radio Control",
      "Sin Clase",
      "Snipe",
      "Thecno",
      "Vela Adaptada Iniciacion",
      "Windsurf/Fun Board",
      "Windsurf/RSX",
      "Windsurf/Velocidad"
    ],
    required: [true, "The class is required"]
  },
  category: {
    type: String,
    enum: [
      "Infantil",
      "Iniciacion Infantil",
      "Juvenil",
      "Senior",
      "Ampliacion",
      "Ampliacion de Autonomica",
      "Autonomica"
    ],
    required: [true, "The category is required"]
  },
  description: {
    type: String,
    required: [true, "The description is required"]
  },

  capacity: {
    type: Number,
    min: [1, "The capacity must be greater than 1"]
  },

  manager: {
    type: String,
    required: [true, "The manager is required"]
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});


module.exports = mongoose.model("event", EVENTschema);