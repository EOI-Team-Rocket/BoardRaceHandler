const router = require("express").Router();
const pass = require('./users/auth');
/*_______________CONTROLLERS_____________*/
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");

/*-------------- EVENTS ROUTES --------------*/
router.post('/events', pass.authAdmin, eventController.createEvent);
router.get("/events", eventController.readAllEvents);
router.get("/events/:id", eventController.readOneEvent);
//router.get('/events/:id/users', eventController.getUsersFromEvent); //TODO
router.patch("/events/:id", pass.authAdmin, eventController.updateEvent);
router.delete("/events/:id", pass.authAdmin, eventController.deleteEvent);

/*-------------- USERS ROUTES --------------*/

router.get('/users/:license_number', pass.authAll, userController.getUsersByAffiliate);
router.patch('/users/:license_number', pass.authAll, userController.patchUser)
router.post('/users', userController.postUser);
router.post('/registerInEvent', pass.authUser, userController.registerInEvent)
router.delete('/users/:license_number', pass.authAll, userController.deleteUser);
router.post('/login', userController.logIn);


module.exports = router;