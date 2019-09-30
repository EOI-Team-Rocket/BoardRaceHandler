const EVENTModel = require("./events.model");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const config = require("../../../config")[process.env.NODE_ENV];

module.exports = {
    createEvent,
    readAllEvents,
    readOneEvent,
    updateEvent,
    deleteEvent,
    getUsersFromEvent
}

function createEvent(req, res) {
    return EVENTModel.create(req.body)
        .then(response => {
            res.status(200).json(response);
        })
        .catch((err) => handdleError(err, res));
}

function readAllEvents(req, res) {
    return EVENTModel.find()
        .then(events => {
            let result = { data: events };
            if (!result || result.length <= 0) {
                res.status(404).send("No events in database");
            } else {
                res.status(200).send(result);
            }
        })
        .catch((err) => handdleError(err, res));
}

function readOneEvent(req, res) {
    return EVENTModel.findById(req.params.id).populate('participants')
        .then(data => res.json(data))
        .catch((err) => handdleError(err, res));
}

function updateEvent(req, res) {
    return EVENTModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .populate("participants")
      .then(response => {
          const event = response;
          for (let i = 0; i < event.participants.length; i++) {
            sendEmail(event.participants[i].email, response.title, "EVENTO ACTUALIZADO"+response);
          }
        return res.json(response);
      })
      .catch(err => handdleError(err, res));
}

function deleteEvent(req, res) {
    let eventID = req.params.id;
    return EVENTModel.findOne({ _id: eventID })
        .then(async event => {
            if (event == null || event == undefined) {
                return res.status(404).send("El evento no existe");
            } else {
                await event.remove();
                return res.status(200).send(event);
            }
        })
        .catch((err) => handdleError(err, res));
}

function getUsersFromEvent(err, res) { //TODO
    return;
}

//Function of error
function handdleError(err, res) {
    return res.status(400).json(err);
}

function sendEmail(email, subject, text){
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email,
            pass: config.password
        }
    });
    var mailOptions = {
        from: config.email,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    })
}

