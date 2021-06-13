const Tour = require('../patterns/tour')
const Guide = require('../patterns/guide')

const compareStrings = (a, b) => {
    // Assuming you want case-insensitive comparison
    a = a[1].id.toLowerCase();
    b = b[1].id.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
const compareDates = (a, b) => {
    var dateA = new Date(a[1].start_date), dateB = new Date(b[1].start_date)
    return dateA - dateB
}
const comparePrices = (a, b) => {
    a = parseInt(a[1].price);
    b = parseInt(b[1].price);
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
const compareDurations = (a, b) => {
    a = parseInt(a[1].duration);
    b = parseInt(b[1].duration);
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

module.exports = {
    duration_sort: function (req, res) {
        Tour.find().then(tours => {
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareDurations);
            res.send(sorted);
        })
    },
    price_sort: function (req, res) {
        Tour.find().then(tours => {
            var arr = Object.entries(tours);
            var sorted = arr.sort(comparePrices);
            res.send(sorted);
        })

    },
    date_sort: function (req, res) {
        Tour.find().then(tours => {
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareDates);
            res.send(sorted);
        })
    },
    //  LIST
    index: function (req, res) {
        Tour.find().then(tours => {
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareStrings);
            res.send(sorted);
        });
    },
    getGuides: function (req, res) {
        Guide.find().then(tours => {
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareStrings);
            res.send(sorted);
        });
    },
    //  READ
    getTours: function (req, res) {
        Tour.find().then(tours => {
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareStrings);
            res.send(sorted);
        });
    },
    //  READ TOUR
    getTour: function (req, res) {
        const Id = req.params["id"];
        Tour.findOne({ id: Id }, (err, data) => {
            if (err) {
                res.status(400).send(`No such tour`);
                return;
            } else {
                res.status(200).send(data);
            }
        })
    },
    //  READ TOUR
    getToursByGuide: function (req, res) {
        const Id = req.params["id"]; //ID of guide
        let arr = [];
        Tour.find().then(tours =>{
            for(let i = 0; i < tours.length; i++){
                if(tours[i].guide == Id)
                    arr.push(tours[i]);
            }
        })
        res.status(200).send(arr);
    },
    // CREATE
    createGuide: function (req, res) {
        // add the new guide
        res.setHeader("Access-Control-Allow-Origin", '*');
        const obj = req.body;
        if (!obj.name || !obj.phone || !obj.email){
            res.status(400).send('Missing args.');
            return;
        }
        if(obj.name){
            let k=false;
            for(let i=0;i<obj.name.length;i++)
                if(!isNaN(obj.name[i])){
                    k=true;
                    break;
                }
            if (k){
                res.status(400).send('Wrong name.');
                return;
            }
        }
        if(obj.phone && obj.phone.length == 10){
            let k=false;
            for(let i=0;i<obj.phone.length;i++){
                if(isNaN(obj.phone[i])){
                    k=true;
                    break;
                }
            }
            if (k){
                res.status(400).send('Wrong phone.');
                return;            
            }
        }
        if(obj.email){
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(obj.email)){
                res.status(400).send('Wrong email.');
                return;
            }
        }
        const guide = new Guide(obj);
        guide.save().then(t => {
            res.status(200).send("Guide added successfully.");
            console.log("Inserted: " + t);
        });
    },
    // CREATE
    createTour: function (req, res) {
        // add the new tour
        res.setHeader("Access-Control-Allow-Origin", '*');
        const obj = req.body;
        if (!obj.id || !obj.start_date || !obj.duration || !obj.price || !obj.guide) {
            res.status(400).send('Missing args.');
            return;
        }
        const tour = new Tour(obj);
        tour.save().then(t => {
            res.status(200).send("Tour added successfully.");
            console.log("Inserted: " + t);
        });
    },
    // CREATE SITE
    createSiteInPath: function (req, res) {
        // add the new site
        const obj = req.body;
        const Id = req.params["id"];
        Tour.findOne({ id: Id }, (err, data) => {
            if (err) {
                res.status(400).send(`No such tour`);
                return;
            } else {
                let exists = (data.path.length != 0);
                if (!exists) {
                    let arr = [];
                    arr.push({ "name": obj.name, "country": obj.country });
                    Tour.findOneAndUpdate({ id: Id }, { path: arr }, (err, dat) => { });
                    res.status(200).send("Added site successfully from scratch.");
                    return;
                } else {
                    for (var i = 0; i < data.path.length; i++) {
                        if (data.path[i].name == obj.name) {
                            res.status(400).send('Already created');
                            return;
                        }
                    }
                    let arr = data.path;
                    arr.push({ "name": obj.name, "country": obj.country });
                    Tour.findOneAndUpdate({ id: Id }, { path: arr }, (err, dat) => { });
                    res.status(200).send("Added site successfully.");
                }
            }
        })
    },
    // UPDATE
    updateTour: function (req, res) {

        // add the new tour
        const Id = req.params["id"];
        Tour.findOne({ id: Id }, (err, data) => {
            if (err) {
                res.status(400).send(`No such tour`);
                return;
            } else {
                Tour.findOneAndUpdate({ id: Id }, req.body, (err, dat) => { });
                res.status(200).send("Updated tour.");
            }
        });
        
    },
    // UPDATE
    updateGuide: function (req, res) {

        // update the guide
        const Id = req.params["id"];
        Guide.findOne({ id: Id }, (err, data) => {
            if (err) {
                res.status(400).send(`No such tour`);
                return;
            } else {
                Guide.findOneAndUpdate({ id: Id }, req.body, (err, dat) => { });
                res.status(200).send("Updated tour.");
            }
        });
        
    },
    // DELETE
    deleteTour: function (req, res) {
        // delete the tour
        const Id = req.params["id"];
        Tour.findOne({ id: Id }, (err, data) => {
            if (err) {
                res.status(400).send('No such tour');
                return;
            } else {
                Tour.findOneAndDelete({ id: Id }, (err, dat) => { });
                res.status(200).send("Deleted the specified tour.")
            }
        })
    },
    // DELETE
    deleteGuide: function (req, res) {
        // delete the guide
        const Id = req.params["id"];
        Guide.findOne({ name: Id }, (err, data) => {
            if (err) {
                res.status(400).send('No such guide');
                return;
            } else {
                Guide.findOneAndDelete({ name: Id }, (err, dat) => { });
                res.status(200).send("Deleted the specified guide.")
            }
        })
    },
    // DELETE SITE
    deleteSite: function (req, res) {
        // delete the site
        const Id = req.params["id"];
        const site_name = req.params["name"];
        if (site_name == null) {
            res.status(400).send('Wrong arguments');
            return;
        }

        Tour.findOne({ id: Id }, (err, data) => {
            if (err) {
                res.status(400).send('No such tour');
                return;
            }
            
            arr = data.path;
            if (site_name != 'ALL') {
                var found = false;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].name == site_name) {
                        arr.splice(site_name, 1);
                        found = true;
                        arr = arr.filter(site => site !== null)
                        break;
                    }
                }
                if (!found) {
                    res.status(400).send('No such site');
                    return;
                }
            }else{
                arr = [];
            }
            Tour.findOneAndUpdate({id: Id}, {path: arr}, (err, dat) => {})
            res.status(200).send("Deleted the specified tour.")
        })
    }
};