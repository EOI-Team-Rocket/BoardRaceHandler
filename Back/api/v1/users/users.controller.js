var Users = require("./users.model");
var eventController = require("../events/events.controller")
var Events = require("../events/events.model")
var eventController = require("../events/events.controller")

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
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
}

//To do: Tests in front
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
      res.send(result);
    })
    .catch(err => {
      res.send(err);
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
      return true;
    }
  } else {
    return handleEventFail(event);
  }
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
  return await Events.findByIdAndUpdate(event._id, { participants: event.participants })
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
  var event = await rmUserToEvent(req.body.eventId, req.body.userId);
  var user;
  if (event) {
    user = rmEvent(req.body.eventId, req.body.userId);
  } else {
    return res.json({ err: "The event is cancel or celebrated." })
  }
  return res.json({
    user: user,
    event: event
  })
}

/**
 * Add event to an User
 */
function rmEvent(eventId, userId) {
  //finding user to add event
  return Users.findOne({
    _id: userId
  })
    .then(result => {
      //adding the event to users
      if (result.sportInfo.regattas.includes(eventId)) {
        const index = result.sportInfo.regattas.indexOf(eventId);
        result.sportInfo.regattas.splice(index, 1);
        //updating users
        return Users.findOneAndUpdate({ _id: userId }, result, {
          new: true,
          runValidators: true
        })
          .then(result => {
            return result;
          })
          .catch(err => {
            return err;
          });
      } else {
        return result;
      }
    })
    .catch(err => {
      return err;
    });
}

/**
 * Add user to an Event
 */
function rmUserToEvent(eventId, userId) {
  //finding event to add user
  return Events.findOne({ _id: eventId })
    .then(result => {
      //adding user to event
      if (result.participants.includes(userId)) {
        const index = result.participants.indexOf(userId);
        result.participants.splice(index, 1);
        //updating event
        return Events.findOneAndUpdate({ _id: eventId }, result, {
          new: true,
          runValidators: true
        })
          .then(result => {
            return result;
          })
          .catch(err => {
            return err;
          });
      } else {
        return result;
      }
    })
    .catch(err => {
      return err;
    });
}
