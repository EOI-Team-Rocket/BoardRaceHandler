const Users = require("./users.model");
const eventController = require("../events/events.controller");
const Events = require("../events/events.model");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const config = require("../../../config")[process.env.NODE_ENV];



module.exports = {
  getUsersByAffiliate,
  postUser,
  patchUser,
  deleteUser,
  registerInEvent,
  unregisterInEvent
}
function getUsersByAffiliate(req, res) {
  return Users.find({
    "sportInfo.license_number": { $in: [req.params.license_number] }
  })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
}
function postUser(req, res) {
  return Users.create(req.body)
    .then(result => {
      sendEmail(
        result.email,
        "Bienvenido " +
          result.personalInfo.fullname.name +
          " " +
          result.personalInfo.fullname.surname1 +
          " " +
          result.personalInfo.fullname.surname2,
        "Bienvenido a nuestra web " +
          result.personalInfo.fullname.name +
          " " +
          result.personalInfo.fullname.surname1 +
          " " +
          result.personalInfo.fullname.surname2 +
          ". Tu email de acceso a nuestra web es: " +
          result.email +
          ", y tu contraseña es: " +
          req.body.password
      );
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
}

function patchUser(req, res) {
  return Users.findOneAndUpdate(
    {
      "sportInfo.license_number": { $in: [req.params.license_number] }
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  )
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.json({ err: "there is no user" })
      }
    })
    .catch(err => {
      res.json(err);
    });
}
function deleteUser(req, res) {
  return Users.findOneAndDelete({
    "sportInfo.license_number": { $in: [req.params.license_number] }
  })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
}
async function registerInEvent(req, res) {
  var userId = req.body.userId;
  var eventId = req.body.eventId;

  var user = await Users.findById(userId);;
  var event = await Events.findOne({ _id: eventId });

  var err = confirmRegister(user, event);

  if (err == true) {
    res.json({
      event: await addUserToEvent(event, userId),
      user: await addEvent(eventId, user)
    });
  } else {
    res.json(err);
  }
}
/**
 * Will return true or the error if the regatta is canceled, celebrated or has already the user
 *
 * @param {JSON} user
 * @param {JSON} event
 * @returns
 */
function confirmRegister(user, event) {
  if (eventController.isOK(event)) {
    if (event.participants.includes(user._id) || user.sportInfo.regattas.includes(event._id)) {
      return { err: "regatta already joined" };
    } else {
      var err = canUserJoin(user, event)
      if (err == true) {
        return true;
      } else {
        return err;
      }
    }
  } else {
    return handleEventFail(event);
  }
}
function canUserJoin(user, event) {
  var err = checkGender(user, event);
  if (err == true) {
    if (user.class_boat == event.class_boat) {
      if (new Date(user.sportInfo.expiration_date) < Date.now()) {
        if (event.participants.length < event.capacity) {
          return true
        } else {
          return { err: "the event is full" }
        }
      } else {
        return { err: "the user has his lisence expirated" }
      }
    } else {
      return { err: "the class boat is: " + event.class_boat }
    }
  } else {
    return err;
  }
}
function checkGender(user, event) {
  if (event.gender == 'X') {
    return true
  } else {
    if (user.personalInfo.gender != event.gender) {
      return { err: "the event is for " + event.gender }
    }
  }
  return true
}
/**
 * Will return the type of error in the event when a user want to register 
 *
 * @param {JSON} event
 * @returns
 */
function handleEventFail(event) {
  if (eventController.celebrateEvent(event) != false) {
    return { err: "regatta already celebrated" };
  } else {
    return { err: "regatta canceled" };
  }
}
/**
 * Will add an user to participants in an event
 *
 * @param {JSON} event
 * @param {String} userId
 * @returns
 */
async function addUserToEvent(event, userId) {
  event.participants.push(userId);
  return await Events.findOneAndUpdate({ _id: event._id }, { participants: event.participants }, {
    new: true,
    runValidators: true
  })
}
/**
 *Will add an event to regattas in an user
 *
 * @param {String} eventId
 * @param {JSON} user
 * @returns
 */
async function addEvent(eventId, user) {
  user.sportInfo.regattas.push(eventId);
  return await Users.findByIdAndUpdate(user._id, user)
}

async function unregisterInEvent(req, res) {
  var userId = req.body.userId;
  var eventId = req.body.eventId;

  var user = await Users.findById(userId);;
  var event = await Events.findById(eventId);

  var err = confirmUnregister(user, event);

  if (err == true) {
    res.json({
      event: await rmUserToEvent(event, userId),
      user: await rmEvent(eventId, user)
    });
  } else {
    res.json(err);
  }
}
/**
 * Will return true or the error if the regatta is canceled, celebrated
 *
 * @param {JSON} user
 * @param {JSON} event
 * @returns
 */
function confirmUnregister(user, event) {
  if (eventController.isOK(event)) {
    if (event.participants.includes(user._id) && user.sportInfo.regattas.includes(event._id)) {
      return true;
    } else {
      return { err: "User is not joined" };
    }
  } else {
    return handleEventFail(event);
  }
}
/**
 * Add event to an User
 */
async function rmEvent(eventId, user) {
  const index = user.sportInfo.regattas.indexOf(eventId);
  user.sportInfo.regattas.splice(index, 1);
  return await Users.findOneAndUpdate({ _id: user._id }, user, { new: true, runValidators: true });
}

/**
 * Add user to an Event
 */
function rmUserToEvent(event, userId) {
  const index = event.participants.indexOf(userId);
  event.participants.splice(index, 1);
  return Events.findOneAndUpdate({ _id: event._id }, event, { new: true, runValidators: true })
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

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
