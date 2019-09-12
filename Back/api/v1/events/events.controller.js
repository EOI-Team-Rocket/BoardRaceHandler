const EVENTModel = require("./events.model");

module.exports = {
    readAllEvents,
    deleteEvent
}

function readAllEvents(req, res){
    EVENTModel.find().then(events => {
        let result = {data : events};
        res.status(200).send(result);
    });
    return;
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