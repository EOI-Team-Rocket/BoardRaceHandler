const router = require("express").Router();
const {createEvent} = require("./events/events.controller");


router.post('/events', createEvent);

module.exports = router;