const EVENTModel = require("./events.model");

module.exports = {
    createEvent,
    readAllEvents,
    readOneEvent,
    updateEvent,
    deleteEvent,
    getActiveEvents,
    isOK,
    celebrateEvent,
    cancelEvent
}
function cancelEvent(req, res) {
    return EVENTModel.findByIdAndUpdate(req.params.id, { cancel: true }, { new: true })
        .then(response => {
            return res.status(200).json(response);
        })
        .catch((err) => handdleError(err, res));
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
        .then(data => res.json(data))
        .catch((err) => handdleError(err, res));
}

function updateEvent(req, res) {
    return EVENTModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then(response => {
            return res.json(response);
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

//Function of error
function handdleError(err, res) {
    return res.status(400).json(err);
}
function getActiveEvents(req, res) {
    return EVENTModel.find().then(events => {
        res.status(200).send(getFuturesEvents(events));
    })
        .catch((err) => handdleError(err, res));
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
                celebrateEvent(event)
            }
            return false;
        }
    })
    return finalEvents;
}
/**
 * This will check if the event is canceled or celebrated or the date is in the past
 * @param {JSON} event 
 */
function isOK(event) {
    console.log("-----> Checking: " + event.title)
    console.log("-----> cancel: " + event.cancel)
    console.log("-----> celebrated: " + event.celebrated)
    console.log("-----> celebrated: " + event.date)
    console.log("-----> celebrated: " + new Date(event.date))
    console.log("-----> date: " + (new Date(event.date) > Date.now()))
    if (!event.cancel && !event.celebrated && (new Date(event.date) > Date.now())) {
        console.log("-----> devuelvo true")
        return true
    } else {
        console.log("-----> devuelvo false")
        return false
    }
}
/**
 * This will change the celebrated status to true
 * @param {String} eventId 
 */
function celebrateEvent(event) {
    if (new Date(event.date) < Date.now()) {
        EVENTModel.findByIdAndUpdate(event._id, { celebrated: true }, { new: true })
            .then(response => {
                return response;
            })
            .catch((err) => { err: err });
    } else {
        return false
    }
}
