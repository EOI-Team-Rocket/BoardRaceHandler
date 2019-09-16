const router = require("express").Router();
const controller = require("./events/events.controller");

router.post('/createEvent', controller.createEvent);
router.get("/events", controller.readAllEvents);
router.get("/event/:id", controller.readOneEvent);
router.put("/updateEvent/:id", controller.updateEvent);
router.delete("/deleteEvent/:id", controller.deleteEvent);

module.exports = router;