const express = require("express"); //Express App
const router = express.Router(); //Router Logic

const tripsController = require("../controllers/trips");

//define routes for endpoint
router  
    .route('/trips')
    .get(tripsController.tripsList); //GET Method routes tripList

//GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;