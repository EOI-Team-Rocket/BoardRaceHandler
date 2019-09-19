const router = require("express").Router();
const controller = require("./events/events.controller");

router.post('/createEvent', controller.createEvent);
router.get("/events", controller.readAllEvents);
router.get("/event/:id", controller.readOneEvent);
router.put("/updateEvent/:id", controller.updateEvent);
router.delete("/deleteEvent/:id", controller.deleteEvent);












/*-------------- FEDERATIONS ROUTES --------------*/
router.post('/federations', controller.createEvent);
router.get("/federations", controller.readAllEvents);
router.get("/federations/:name", controller.readOneEvent);
router.put("/federations/:name", controller.updateEvent);
router.delete("/federations/:name", controller.deleteEvent);



module.exports = router;