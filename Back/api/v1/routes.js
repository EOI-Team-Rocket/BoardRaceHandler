const router = require("express").Router();
/*_______________CONTROLLERS_____________*/
const eventController = require("./events/events.controller");
const userController = require("./users/users.controller");
const federationController = require("./federations/federations.controller");
const clubController = require("./clubs/clubs.controller");
const boatController = require("./boats/boats.controller");
/*-------------- EVENTS ROUTES --------------*/
router.post('/events', eventController.createEvent);
router.get("/events", eventController.readAllEvents);
router.get("/events/:id", eventController.readOneEvent);
router.patch("/events/:id", eventController.updateEvent);
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
router.patch("/federations/:name", federationController.updateFederation);
router.delete("/federations/:name", federationController.deleteFederation);
/*-------------- CLUBS ROUTES --------------*/
router.post('/clubs', clubController.createClub);
router.get("/clubs", clubController.readAllClubs);
router.get("/clubs/:name", clubController.readOneClub);
router.patch("/clubs/:name", clubController.updateClub);
router.delete("/clubs/:name", clubController.deleteClub);
/*-------------- BOATS ROUTES --------------*/
router.post('/boats', boatController.createBoat);
router.get("/boats", boatController.readAllBoats);
router.get("/boats/:name", boatController.readOneBoat);
router.patch("/boats/:name", boatController.updateBoat);
router.delete("/boats/:name", boatController.deleteBoat);


module.exports = router;