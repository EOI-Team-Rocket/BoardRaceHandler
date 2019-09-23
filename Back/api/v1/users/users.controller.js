var Users = require("./users.model");
var Events = require("../events/events.model")

module.exports = {
    getUsers,
    getUsersByAffiliate,
    postUser,
    patchUser,
    deleteUser,
    registerInEvent
}


/**
 *
 *
 * @param {JSON} req
 * @param {JSON} res
 * @returns
 */
function getUsers(req, res) {
    return Users.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
        });
}
function getUsersByAffiliate(req, res) {
    return Users.find({
        "sportInfo.license_number": { $in: [req.params.license_number] }
    })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
        });
}
function postUser(req, res) {
    return Users.create(req.body)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
        });
}

//To do: Tests in front
function patchUser(req, res) {

    return Users.findOneAndUpdate({
        "sportInfo.license_number": { $in: [req.params.license_number] }
    }, req.body)
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

    var user = addEvent(req.body.eventId, req.body.userId);
    var event = addUserToEvent(req.body.eventId, req.body.userId);

    return await Promise.all([user, event]).then((results) => {
        res.json({
            user: results[0],
            event: results[1]
        })
    }
    );
}

/**
 * Add event to an User
 */
function addEvent(eventId, userId) {
    //finding user to add event
    return Users.findOne({
        _id: userId
    })
        .then(result => {
            //adding the event to users
            result.sportInfo.regattas.push(eventId);
            //updating users
            return Users.findOneAndUpdate({ "_id": userId }, result)
                .then(result => {
                    return result;
                })
                .catch(err => {
                    return err
                })
        })
        .catch(err => {
            return err;
        });
}

/**
 * Add user to an Event
 */
function addUserToEvent(eventId, userId) {
    //finding event to add user
    return Events.findOne({ _id: eventId })
        .then(result => {
            //adding user to event
            result.participants.push(userId);
            //updating event
            return Events.findOneAndUpdate({ _id: eventId }, result)
                .then(result => {
                    return result;
                })
                .catch(err => {
                    return err
                })

        })
        .catch(err => {
            return (err);
        });
}