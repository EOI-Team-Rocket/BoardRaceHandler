const router = require("express").Router();
const controller = require("./events/events.controller");


router.post('/events', createEvent);

module.exports = router;