const FEDERATIONModel = require("./federations.model");

module.exports = {
    createFederation,
    readAllFederations,
    readOneFederation,
    updateFederation,
    deleteFederation
}

function createFederation(req, res) {
    return FEDERATIONModel.create(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch((err) => handdleError(err, res));
}

function readAllFederations(req, res) {
    return FEDERATIONModel.find().then(events => {
        let result = { data: events };
        res.status(200).send(result);
    })
        .catch((err) => handdleError(err, res));
}

function readOneFederation(req, res) {
    return FEDERATIONModel.find({ name: req.params.name })
        .then(data => res.json(data))
        .catch((err) => handdleError(err, res));
}

function updateFederation(req, res) {
    return FEDERATIONModel.update(req.params.id, { $set: req.body }, { new: true })
        .then(response => {
            return res.json(response);
        })
        .catch((err) => handdleError(err, res));
}

function deleteFederation(req, res) {
    return FEDERATIONModel.findOne({ name: req.params.name })
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
