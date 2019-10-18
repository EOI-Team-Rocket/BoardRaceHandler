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
  getActiveEvents,
  isOK,
  celebrateEvent
};

function createEvent(req, res) {
  if (new Date(req.body.date) > Date.now()) {
    return EVENTModel.create(req.body)
      .then(response => {
        res.status(200).json(response);
      })
      .catch((err) => { console.log(err); handdleError(err, res) });
  } else {
    res.status(400).json({ err: "the event is in the past." })
  }
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
    .catch(err => handdleError(err, res));
}

function readOneEvent(req, res) {
  return EVENTModel.findById(req.params.id)
    .populate("participants")
    .then(data => res.status(200).json(data))
    .catch(err => handdleError(err, res));
}
function updateEvent(req, res) {
  if (new Date(req.body.date) > Date.now()) {
    return EVENTModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .populate("participants")
      .then(response => {
        const event = response;
        for (let i = 0; i < event.participants.length; i++) {
          sendEmail(
            event.participants[i].email,
            response.title,
            "El evento: " +
            response.title +
            ", en el cual esta inscrito, ha sido actualizado. " +
            response.title +
            " en " +
            response.place +
            " el día " +
            response.date +
            " a las " +
            response.hour +
            " organizado por: " +
            response.manager +
            ". " +
            response.description
          );
        }
        return res.status(200).json(response);
      })
      .catch(err => handdleError(err, res));
  } else {
    res.status(400).json({ err: "the event is in the past." })
  }
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
    .catch(err => handdleError(err, res));
}

//Function of error
function handdleError(err, res) {
  return res.status(400).json(err);
}

function sendEmail(email, subject, text) {
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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function getActiveEvents(req, res) {
  return EVENTModel.find()
    .then(events => {
      res.status(200).send(getFuturesEvents(events));
    })
    .catch(err => handdleError(err, res));
}
/**
 * This will return all events not canceled, celebrated or with date in the past
 * @param {Array<JSON>} events
 */
function getFuturesEvents(events) {
  const finalEvents = events.filter(event => {
    if (isOK(event)) {
      return true;
    } else {
      if (!event.celebrated && new Date(event.date) < Date.now()) {
        celebrateEvent(event);
      }
      return false;
    }
  });
  return finalEvents;
}
/**
 * This will check if the event is canceled or celebrated or the date is in the past
 * @param {JSON} event
 */
function isOK(event) {
  if (!event.cancel && !event.celebrated && new Date(event.date) > Date.now()) {
    return true;
  } else {
    return false;
  }
}
/**
 * This will change the celebrated status to true
 * @param {String} eventId
 */
function celebrateEvent(event) {
  if (new Date(event.date) < Date.now()) {
    EVENTModel.findOneAndUpdate({ _id: event._id }, event, {
      new: true,
      runValidators: true
    })
      .then(response => {
        return response;
      })
      .catch(err => handdleError(err, res));
  } else {
    return false;
  }
}
