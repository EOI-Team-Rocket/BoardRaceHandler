const Users = require("./users.model");
const Events = require("../events/events.model");
const authJWT = require('./jwt');

module.exports = {
    getUsers,
    getUsersByAffiliate,
    postUser,
    patchUser,
    deleteUser,
    registerInEvent,
    logIn
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
        .catch((err) => handdleError(err, res));
}

function getUsersByAffiliate(req, res) {
    return Users.find({
        "sportInfo.license_number": { $in: [req.params.license_number] }
    })
        .then(result => {
            res.send(result)
        })
        .catch((err) => handdleError(err, res));
}

function postUser(req, res) {
    return Users.create(req.body)
    .then(user => {
        let dataToken = authJWT.createToken(user);
        let userResponde = {
            acces_token: dataToken[0],
            refresh_token: authJWT.createRefreshToken(user),
            expires_in: dataToken[1],
            role: user.role,
            license_number: user.sportInfo.license_number
        }
        return res.status(200).send(userResponde);
    })
    .catch((err) => handdleError(err, res));
}

function logIn(req, res) {
    if(req.body.password && req.body.email){
        Users.findOne({
            email: req.body.email
        })
        .select("_id password role sportInfo.license_number")
        .exec((err, userResult) => {
            if (err || !userResult) {
                return res.status(401).send({
                    error: "LoginError"
                });
            }

            userResult.comparePassword(req.body.password, userResult.password, function (err, isMatch) {
                if (isMatch & !err) {
                    let dataToken = authJWT.createToken(userResult);
                    return res.status(200).send({                        
                        acces_token: dataToken[0],
                        refresh_token: authJWT.createRefreshToken(userResult),
                        expires_in: dataToken[1],
                        role: userResult.role,
                        license_number: userResult.sportInfo.license_number
                    });
                }else {
                    return res.status(401).send({
                        error: "LoginError"
                    });
                }
            });
        });
    } else {
        return res.status(401).send({
            error: "BadRequest"
        });
    }
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
        .catch((err) => handdleError(err, res));
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
        .catch((err) => handdleError(err, res));
}

function handdleError(err, res) {
    return res.status(400).json(err);
}