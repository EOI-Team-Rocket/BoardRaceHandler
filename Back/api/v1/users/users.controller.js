var Users = require("./users.model");

module.exports = { 
    getUsers, 
    getUsersByAffiliate, 
    postUser, 
    patchUser, 
    deleteUser 
}

function getUsers(req, res) {
    Users.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
        });
}
function getUsersByAffiliate(req, res) { 
    Users.find({
        "sportInfo.license_number": {$in: [req.params.license_number]}
    })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
        });
}
function postUser(req, res) {
    Users.create(req.body)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err);
        });
}

//To do: Tests in front
function patchUser(req, res) {

    Users.findOneAndUpdate({
        "sportInfo.license_number": {$in: [req.params.license_number]}
    }, req.body)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
}
function deleteUser(req, res) {
    Users.findOneAndDelete({
        "sportInfo.license_number": {$in: [req.params.license_number]}
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
}
