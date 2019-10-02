const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const vars = require('./defaults');

const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({

    password: {
        type: String,
        minlength: 7,
        match: [vars.regexPassword],
        select: false,
        required: [true, "the field password is required"] //8 characters min, capital, num, schar
    },
    email: {
        type: String,
        lowercase: true,
        match: [vars.regexEmail],
        unique: true,
        required: [true, "the field email is required"] //unique
    },
    telf1: {
        type: String,
        required: [true, "the field telf is required"]
    },

    telf2: {
        type: String
    },

    //form with data and compare with excel
    //compare name & surname1, num affiliate, category, federation
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

        gender: {
            type: String,
            enum: ["M", "F"] //required in front
        },

    },
    sportInfo: {
        license_number: {
            type: String,
            required: true,
            unique: true
        },
        speciality: [{
            type: String,
            enum: ["Deportista"],
            required: true
        }],
        class_boat: {
            type: String,
            enum: ["420", "470", "29-ER", "49-ER", "Crucero", "Hansa 303", "Ideal 18", "J-80", "Kiteboarding",
                "Laser 4.7", "Laser Radial", "Nacra-17", "Optimist", "Radio Control", "Sin Clase", "Snipe",
                "Thecno", "Vela Adaptada Iniciacion", "Windsurf/Fun Board", "Windsurf/RSX", "Windsurf/Velocidad"],
            required: true
        },
        category: {
            type: String,
            enum: ["Infantil", "Iniciacion Infantil", "Juvenil", "Senior", "Ampliacion", "Ampliacion de Autonomica"
                , "Autonomica"],
            required: true
        },
        expiration_date: {
            type: String,
            default: undefined
        },
        state: {
            type: String,
            enum: ["Activo", "Inactivo", "Pendiente"], //ask alejandro
            required: true
        },
        club: {
            type: String,
            enum: [], //TODO add enum
        },
        federation: {
            type: String,
            enum: [], //TODO add enum
        },
        regattas: [{
            type: Schema.Types.ObjectId,
            ref: 'event'
        }],
    },
    role: {
        type: String,
        enum: [
            "USER", 
            "ADMIN"
        ],
        required: true,
        default: "USER"
    }
});

function generateHashPassword(plainPassword){
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
};

UserSchema.pre('save', function(next){
    try {
        let user = this;
        if(!user.isModified('password')) return next();
        user.password = generateHashPassword(user.password);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = function (candidatePassword, hashPassword, cd) {
    bcrypt.compare(candidatePassword, hashPassword, function (err, isMatch) {
        if (err) {
            return cd(err); 
        }
        cd(null, isMatch);
    });
};
 


module.exports = mongoose.model("user", UserSchema);