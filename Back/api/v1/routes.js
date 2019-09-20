const router = require("express").Router();
const controller = require("./events/events.controller");
const federationController = require("./federations/federations.controller");

router.post('/createEvent', controller.createEvent);
router.get("/events", controller.readAllEvents);
router.get("/event/:id", controller.readOneEvent);
router.put("/updateEvent/:id", controller.updateEvent);
router.delete("/deleteEvent/:id", controller.deleteEvent);












/*-------------- FEDERATIONS ROUTES --------------*/
router.post('/federations', federationController.createFederation);
router.get("/federations", federationController.readAllFederations);
router.get("/federations/:name", federationController.readOneFederation);
router.put("/federations/:name", federationController.updateFederation);
router.delete("/federations/:name", federationController.deleteFederation);



module.exports = router;