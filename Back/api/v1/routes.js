const router = require("express").Router();
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");

/*-------------- EVENTS ROUTES --------------*/
router.post('/createEvent', eventController.createEvent);
router.get("/events", eventController.readAllEvents);
router.get("/event/:id", eventController.readOneEvent);
router.put("/updateEvent/:id", eventController.updateEvent);
router.delete("/deleteEvent/:id", eventController.deleteEvent);


/*-------------- USERS ROUTES --------------*/
router.get('/users', userController.getUsers);
router.get('/users/:license_number', userController.getUsersByAffiliate);
router.patch('/users/:license_number', userController.patchUser)
router.post('/users', userController.postUser);
router.delete('/users/:license_number', userController.deleteUser);

module.exports = router;