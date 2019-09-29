const EVENTModel = require("./events.model");

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
    return EVENTModel.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch((err) => handdleError(err, res));
}
<<<<<<< HEAD
function getUniqueEvent(req, res) {
    req.body.title = req.params.title;
    return EVENTModel.find(req.body)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.send(err);
        });
}
=======

>>>>>>> 43911531e013fe90750aa87369b3d4cf627056fd
function updateEvent(req, res) {
    return EVENTModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then(response => {
            return res.status(200).json(response);
        })
        .catch((err) => handdleError(err, res));
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
