const router = require("express").Router();
/*_______________CONTROLLERS_____________*/
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");


/*-------------- EVENTS ROUTES --------------*/
router.post("/events", eventController.createEvent);
router.get("/events", eventController.readAllEvents);
router.get("/events/active", eventController.getActiveEvents)
router.get("/events/:id", eventController.readOneEvent);
router.patch("/events/:id", eventController.updateEvent);
router.patch("/events/cancel/:id", eventController.cancelEvent)
router.delete("/events/:id", eventController.deleteEvent);

/*-------------- USERS ROUTES --------------*/

router.get("/users/:license_number", userController.getUsersByAffiliate);
router.patch("/users/:license_number", userController.patchUser);
router.post("/users", userController.postUser);
router.post("/registerInEvent", userController.registerInEvent);
router.post("/unSubscription", userController.unregisterInEvent);
router.delete("/users/:license_number", userController.deleteUser);

module.exports = router;