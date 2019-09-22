var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const USERschema = new mongoose.Schema({

    createdAt: Date,
    password: {
        type: String,
        required: [true, "the field password is required"]
    },
    email: {
        type: String,
        required: [true, "the field email is required"]
    },
    telf1: {
        type: String,
        required: [true, "the field telf is required"]
    },
    personalInfo: {
        fullname: {
            name: {
                type: String,
                required: [true, "the field name is required"]
            },
            surname1: {
                type: String,
                required: [true, "the field surname1 is required"]
            },
            surname2: {
                type: String,
            },
        },

        birthdate: {
            type: Date,
            required: [true, "the field birthdate is required"]
        },

        island: {
            type: String,
            enum: ["Fuerteventura", "La Gomera", "Gran Canaria", "El Hierro", "Lanzarote", "La Palma", "Tenerife", "La Graciosa"],
            required: [true, "the field island is required"]
        },
        gender: {
            type: String,
            enum: ["H", "M", "X"]
        },
        telf: {

            telf2: String
        },
    },
    sportInfo: {
        license_number: {
            type: String,
            required: true
        },
        speciality: [{
            type: String,
            enum: ["Deportista", "Directivo", "Juez", "Medidor", "Tecnico/Autonomico", "Tecnico"],
            required: true
        }],
        class: {
            type: String,
            enum: ["420", "470", "29-ER", "49-ER", "Crucero", "Hansa 303", "Ideal 18", "J-80", "Kiteboarding",
                "Laser 4.7", "Laser Radial", "Nacra-17", "Optimist", "Radio Control", "Sin Clase", "Snipe",
                "Thecno", "Vela Adaptada Iniciacion", "Windsurf/Fun Board", "Windsurf/RSX", "Windsurf/Velocidad"],
            //TODO:foreign key
            required: true
        },
        age_category: {
            type: String,
            enum: ["Infantil", "Iniciacion Infantil", "Juvenil", "Senior", "Ampliacion", "Ampliacion de Autonomica"
                , "Autonomica"],
            //TODO:foreign key
            required: true
        },
        expiry_date: {
            type: Date,
            default: undefined
        },
        state: {
            type: String,
            enum: ["Activo", "Inactivo", "Pendiente"],
            required: true
        },
        club: {
            type: Schema.Types.ObjectId,
            ref: 'Club'
        },
        federation: {
            type: Schema.Types.ObjectId,
            ref: 'Federation'
        },
        regattas: [{
            type: Schema.Types.ObjectId,
            ref: 'event'
        }]
    }
});

module.exports = mongoose.model("User", USERschema);