const express = require('express'),
    tourRoutes = require('./tours');

var router = express.Router();

router.get('/', (req, res) => {
   res.send('For trips list goto /list');
});

//CRUD - create read update delete
//sort
router.get('/duration_sort', tourRoutes.duration_sort);
router.get('/price_sort', tourRoutes.price_sort);
router.get('/date_sort', tourRoutes.date_sort);

router.get('/tours_guide/:id', tourRoutes.getToursByGuide);
router.get('/tours', tourRoutes.getTours); //read
router.get('/guides', tourRoutes.getGuides); //read guides
router.get('/list', tourRoutes.index); //list of all tours
router.get('/tours/:id', tourRoutes.getTour); //read tour

router.post('/tours', tourRoutes.createTour); //create tour
router.post('/guides', tourRoutes.createGuide); //create guide
router.post('/tours/:id/sites', tourRoutes.createSiteInPath); //create site

router.put('/tours/:id', tourRoutes.updateTour); //update tour
router.put('/guides/:id', tourRoutes.updateGuide); //update guide

router.delete('/tours/:id', tourRoutes.deleteTour); //delete tour
router.delete('/guides/:id', tourRoutes.deleteGuide); //delete guide
router.delete('/tours/:id/sites/:name', tourRoutes.deleteSite); //delete site

module.exports = router;