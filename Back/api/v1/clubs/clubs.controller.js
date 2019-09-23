const CLUBModel = require("./clubs.model");

module.exports = {
    createClub,
    readAllClubs,
    readOneClub,
    updateClub,
    deleteClub
}

function createClub(req, res) {
    return CLUBModel.create(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch((err) => handdleError(err, res));
}

function readAllClubs(req, res) {
    return CLUBModel.find().then(events => {
        let result = { data: events };
        res.status(200).send(result);
    })
        .catch((err) => handdleError(err, res));
}

function readOneClub(req, res) {
    return CLUBModel.find({ name: req.params.name })
        .then(data => res.json(data))
        .catch((err) => handdleError(err, res));
}

function updateClub(req, res) {
    return CLUBModel.update(req.params.id, { $set: req.body }, { new: true })
        .then(response => {
            return res.json(response);
        })
        .catch((err) => handdleError(err, res));
}

function deleteClub(req, res) {
    return CLUBModel.findOne({ name: req.params.name })
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
