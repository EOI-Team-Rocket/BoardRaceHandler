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
  console.log("***************************STARTING***************************")
  var err;
  var event = await addUserToEvent(req.body.eventId, req.body.userId);
  var user;
  console.log(".............. el resultado del evento es:  " + (event))
  err = event.err ? true : false;
  console.log(".............. por tanto err será: " + err)
  if (err == false) {
    user = await addEvent(req.body.eventId, req.body.userId);
    err = user.err ? true : user.err
    if (err === true) {
      res.json({
        event: event,
        user: user
      })
    } else {
      res.json({ err: user.err })
    }
  } else {
    res.json({ err: event.err })
  }
}
/**
 * Add user to an Event
 */
function addUserToEvent(eventId, userId) {
  console.log("************ Adding user to event:" + eventId + ' ' + userId)
  //finding event to add user
  return Events.findOne({ _id: eventId })
    .then(async result => {
      console.log("************ this is the event: " + result.title)
      //adding user to event
      if (eventController.isOK(result)) {
        console.log("************ is persona in participants: " + result.participants.includes(userId))
        if (!result.participants.includes(userId)) {
          console.log("añado participante")
          result.participants.push(userId);
          //updating event
          return await Events.findByIdAndUpdate(eventId, { participants: result.participants })
            .then(event => {
              console.log("hla????????:" + event)
              return event;
            })
            .catch(err => {
              console.log("adoh")
              return { err: "regatta already joined" };
            });
        } else {
          return { err: "regatta already joined" };
        }
      } else {
        console.log("este evento es mierda pura")
        if (eventController.celebrateEvent(result) != false) {
          return { err: "regatta already celebrated" };
        } else {
          return { err: "regatta canceled" };
        }
      }
    })
    .catch(err => {
      return err;
    });
}
/**
 * Add event to an User
 */
function addEvent(eventId, userId) {
  console.log("************adding event to user********************");
  //finding user to add event
  return Users.findById(userId)
    .then(result => {
      console.log("user:" + result.personalInfo.fullname)
      console.log("already:" + result.sportInfo.regattas.includes(eventId))
      //adding the event to users
      if (!result.sportInfo.regattas.includes(eventId)) {
        result.sportInfo.regattas.push(eventId);
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
        return { err: "already in regatta" };
      }
    })
    .catch(err => {
      return err;
    });
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
