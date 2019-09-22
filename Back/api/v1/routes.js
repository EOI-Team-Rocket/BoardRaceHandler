const router = require("express").Router();
/*_______________CONTROLLERS_____________*/
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");
const federationController = require("./federations/federations.controller");
const clubController = require("./clubs/clubs.controller");
/*-------------- EVENTS ROUTES --------------*/
router.post('/events', eventController.createEvent);
router.get("/events", eventController.readAllEvents);
router.get("/events/:id", eventController.readOneEvent);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);
/*-------------- USERS ROUTES --------------*/
router.get('/users', userController.getUsers);
router.get('/users/:license_number', userController.getUsersByAffiliate);
router.patch('/users/:license_number', userController.patchUser)
router.post('/users', userController.postUser);
router.delete('/users/:license_number', userController.deleteUser);
/*-------------- FEDERATIONS ROUTES --------------*/
router.post('/federations', federationController.createFederation);
router.get("/federations", federationController.readAllFederations);
router.get("/federations/:name", federationController.readOneFederation);
router.put("/federations/:name", federationController.updateFederation);
router.delete("/federations/:name", federationController.deleteFederation);
/*-------------- CLUBS ROUTES --------------*/
router.post('/clubs', clubController.createClub);
router.get("/clubs", clubController.readAllClubs);
router.get("/clubs/:name", clubController.readOneClub);
router.put("/clubs/:name", clubController.updateClub);
router.delete("/clubs/:name", clubController.deleteClub);



module.exports = router;