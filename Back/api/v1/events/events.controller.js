const EVENTModel = require("./events.model");

module.exports = {
    readAllEvents,
    readOneEvent,
    updateEvent,
    deleteEvent
}

function readAllEvents(req, res){
    EVENTModel.find().then(events => {
        let result = {data : events};
        res.status(200).send(result);
    });
    return;
}

function readOneEvent(req, res){
    EVENTModel.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(parseError(err)))
    return;
}

function updateEvent(req, res){
    EVENTModel.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    .then(response =>{
        return res.json(response);
    })
    .catch(error => {
        return res.status(400).send(error);
    })
}

function deleteEvent(req, res){
    let eventID = req.params.id;
    EVENTModel.findOne({_id: eventID}).then(async event =>{
        if(event == null || event == undefined){
            res.status(404).send("El evento no existe");
            return;
        } else {
            await event.remove();
            res.status(200).send(event);
            return;
        }
    });
}