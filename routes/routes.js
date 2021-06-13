const express = require('express'),
    tourRoutes = require('./tours');

var router = express.Router();

router.get('/', (req, res) => {
   res.send('Welcome to our TRIPS!!!');
});

//CRUD - create read update delete
router.get('/tours_duration', tourRoutes.duration_sort);
router.get('/tours_price', tourRoutes.price_sort);
router.get('/tours_date', tourRoutes.date_sort);
router.get('/tours', tourRoutes.getTours); //read
router.get('/list', tourRoutes.index); //list of all things..
router.get('/tours/:id', tourRoutes.getTour); //read tour
router.post('/tours', tourRoutes.createTour); //create tour
router.post('/guides', tourRoutes.createGuide); //create guide
router.post('/tours/:id/sites', tourRoutes.createSiteInPath); //create site
router.put('/tours/:id', tourRoutes.updateTour); //update
router.delete('/tours/:id', tourRoutes.deleteTour); //delete tour
router.delete('/guides/:id', tourRoutes.deleteGuide); //delete guide
router.delete('/tours/:id/sites/:name', tourRoutes.deleteSite); //delete site

module.exports = router;