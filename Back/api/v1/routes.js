const router = require("express").Router();
/*_______________CONTROLLERS_____________*/
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");

/*-------------- EVENTS ROUTES --------------*/
router.post('/events', eventController.createEvent);
router.get("/events", eventController.readAllEvents);
router.get("/events/:id", eventController.readOneEvent);
//router.get('/events/:id/users', eventController.getUsersFromEvent); //TODO
router.patch("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

/*-------------- USERS ROUTES --------------*/

router.get('/users/:license_number', userController.getUsersByAffiliate);
router.patch('/users/:license_number', userController.patchUser)
router.post('/users', userController.postUser);
router.post('/registerInEvent', userController.registerInEvent)
router.delete('/users/:license_number', userController.deleteUser);
router.post('/login', userController.logIn);


module.exports = router;