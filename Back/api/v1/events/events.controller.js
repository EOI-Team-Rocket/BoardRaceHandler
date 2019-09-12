const EventModel = require('./events.model');

module.exports = {
    createEvent: createEvent
}

function createEvent(req, res){
    return EventModel.create(req.body)
        .then(responde => {
            res.status(200).json(responde)
        })
        .catch((err) => handdleError(err, res));
}

function handdleError(err, res){
    return res.status(400).json(err);
}