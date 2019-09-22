const router = require("express").Router();

/*_______________CONTROLLERS_____________*/
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");
const federationController = require("./federations/federations.controller");
const clubController = require("./clubs/clubs.controller");
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