const router = require("express").Router();
const controller = require("./events/events.controller");

router.get("/events", controller.readAllEvents);
router.delete("/events/:id", controller.deleteEvent);

module.exports = router;