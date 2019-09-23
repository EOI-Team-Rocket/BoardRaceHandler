const BOATModel = require("./boats.model");

module.exports = {
    createBoat,
    readAllBoats,
    readOneBoat,
    updateBoat,
    deleteBoat
}

function createBoat(req, res) {
    return BOATModel.create(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch((err) => handdleError(err, res));
}

function readAllBoats(req, res) {
    return BOATModel.find().then(boats => {
        let result = { data: boats };
        res.status(200).send(result);
    })
        .catch((err) => handdleError(err, res));
}

function readOneBoat(req, res) {
    return BOATModel.find({ name: req.params.name })
        .then(data => res.json(data))
        .catch((err) => handdleError(err, res));
}

function updateBoat(req, res) {
    return BOATModel.update(req.params.id, { $set: req.body }, { new: true })
        .then(response => {
            return res.json(response);
        })
        .catch((err) => handdleError(err, res));
}

function deleteBoat(req, res) {
    return BOATModel.findOne({ name: req.params.name })
        .then(boat => {
            if (boat == null || boat == undefined) {
                return res.status(404).send("El boato no existe");
            } else {
                return boat.remove().then(result => {
                    return res.status(200).send(boat);
                });
            }
        })
        .catch((err) => handdleError(err, res));
}

//Function of error
function handdleError(err, res) {
    return res.status(400).json(err);
}
