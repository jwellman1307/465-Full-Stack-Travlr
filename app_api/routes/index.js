const express = require("express"); //Express App
const router = express.Router(); //Router Logic

const tripsController = require("../controllers/trips");

//define routes for endpoint
router  
    .route('/trips')
    .get(tripsController.tripsList) //GET Method routes tripList
    .post(tripsController.tripsAddTrip); //Post Method Adds a Trip

//GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;