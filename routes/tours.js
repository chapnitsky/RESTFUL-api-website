const fs = require('fs');
const Tour = require('../patterns/tour')
const Guide = require('../patterns/guide')

// variables
const dataPath = './data/tours.json';

// helper methods
// const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
//     fs.readFile(filePath, encoding, (err, data) => {
//             if (err) {
//                 console.log(err);
//             }
//             callback(returnJson ? JSON.parse(data) : data);
//        });
// };

// const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
//         fs.writeFile(filePath, fileData, encoding, (err) => {
//             if (err) {
//                 console.log(err);
//             }

//             callback();
//         });
//     };

const compareStrings = (a, b) => {
    // Assuming you want case-insensitive comparison
    a = a[1].id.toLowerCase();
    b = b[1].id.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

const compareDates = (a, b) =>{
    var dateA = new Date(a[1].start_date), dateB = new Date(b[1].start_date)
	return dateA - dateB
}
const comparePrices = (a, b) =>{
	a = parseInt(a[1].price);
    b = parseInt(b[1].price);
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
const compareDurations = (a, b) =>{
	a = parseInt(a[1].duration);
    b = parseInt(b[1].duration);
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}


module.exports = {
    duration_sort: function (req, res) {
    
        Tour.find().then(tours=>{
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareDurations);
            res.send(sorted);
        })
    },
    price_sort: function (req, res) {
            
        Tour.find().then(tours=>{
            var arr = Object.entries(tours);
            var sorted = arr.sort(comparePrices);
            res.send(sorted);
        })
            
    },
    date_sort: function (req, res) {
        Tour.find().then(tours=>{
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareDates);
            res.send(sorted);
        })
            
    },
    //  LIST
    index: function (req, res) {
        Tour.find().then(tours=>{
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareStrings);
            res.send(sorted);
        });
    },
    //  READ
    getTours: function (req, res) {
        Tour.find().then(tours=>{
            var arr = Object.entries(tours);
            var sorted = arr.sort(compareStrings);
            res.send(sorted);
        });
                
    },
    //  READ TOUR
    getTour: function (req, res) {
        const Id = req.params["id"];
        Tour.findOne({id:Id}, (err,data)=>{
            if(err){
                res.status(400).send(`No such tour`);
                return;
            }else{
                res.status(200).send(data);
            }
        })
    },
    // CREATE
    createTour: function (req, res) {
            // add the new tour
            res.setHeader("Access-Control-Allow-Origin", '*');
            const obj = req.body;
            // || !obj.guide || !obj.guide.name || !obj.guide.cellular || !obj.guide.email
            if(!obj.id || !obj.start_date || !obj.duration || !obj.price){
                    res.status(400).send('Missing args.');
                    return;
            }
            const tour = new Tour(req.body);
            const guide = new Guide(req.body);
            tour.save().then(t=>{
                res.status(200).send("Tour added successfully.");
                console.log("Inserted: " + t);
            });
        
    },
    // CREATE SITE
    createSiteInPath: function (req, res) {
            // add the new site
            const obj = req.body;
            const Id = req.params["id"];
            console.log(req.body.name);
            console.log(req.body.country);
            Tour.findOne({id:Id}, (err,data)=>{
                if(err){
                    res.status(400).send(`No such tour`);
                    return;
                }else{
                    let exists = (data.path.length!=0);
                    if(!exists){
                        console.log("in if path: " + data.path);
                        let arr = [];
                        arr.push({"name": obj.name, "country": obj.country});
                        console.log(arr[0]);
                        Tour.findOneAndUpdate({id:Id}, {path: arr}, (err,dat)=>{});
                        res.status(200).send("Added site successfully from scratch.");
                        return;
                    }else{
                        for(var i = 0; i < data.path.length; i++){
                            if(data.path[i].name == obj.name){
                                res.status(400).send('Already created');
                                return;
                            }
                        }
                        let arr = data.path;
                        arr.push({"name": obj.name, "country": obj.country});
                        Tour.findOneAndUpdate({id:Id}, {path: arr}, (err,dat)=>{});
                        res.status(200).send("Added site successfully.");
                    }
                }
            })
    },
    // UPDATE
    updateTour: function (req, res) {

            // add the new tour
            const Id = req.params["id"];
            Tour.findOne({id:Id}, (err, data)=>{
                if(err){
                    res.status(400).send(`No such tour`);
                    return;
                }else{
                    Tour.findOneAndUpdate({id:Id}, req.body, (err,dat)=>{});
                    res.status(200).send("Updated tour.");
                }
            });
            // if(obj.guide){
            //     if(obj.guide.name){
            //         let k=false;
            //         for(let i=0;i<obj.guide.name.length;i++){
            //             if(!isNaN(obj.guide.name[i])){
            //                 k=true;
            //                 break;
            //             }
            //         }
            //         if (!k){
            //             data[Id].guide.name = obj.guide.name;
            //         }
            //     }
            //     if(obj.guide.cellular && obj.guide.cellular.length == 10){
            //         let k=false;
            //         for(let i=0;i<obj.guide.cellular.length;i++){
            //             if(isNaN(obj.guide.cellular[i])){
            //                 k=true;
            //                 break;
            //             }
            //         }
            //         if (!k){
            //             data[Id].guide.cellular = obj.guide.cellular;
            //         }
            //     }
            //     if(obj.guide.email){
            //         const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //         if(re.test(obj.guide.email))
            //             data[Id].guide.email = obj.guide.email;
            //     }
    },
    // DELETE
    deleteTour: function (req, res) {
        // delete the tour
        const Id = req.params["id"];
        Tour.findOne({id:Id}, (err,data)=>{
            if(err){
                res.status(400).send('No such tour');
                return;
            }else{
                Tour.findOneAndDelete({id:Id}, (err, dat)=>{});
                res.status(200).send("Deleted the specified tour.")
            }
        })
    },
    // DELETE SITE
    deleteSite: function (req, res) {


            // delete the site
            const Id = req.params["id"];
            const site_name = req.params["name"];
            if(!data[Id]){
                res.status(400).send('No such tour');
                return;
            }
            if(site_name == null){
                res.status(400).send('Wrong arguments');
                return;
            }
            if(site_name != 'ALL'){
                var found = false;
                for(var i = 0; i < data[Id].path.length; i++){
                    if(data[Id].path[i].name == site_name){
                        delete data[Id].path[i];
                        found = true;
                        if(data[Id].path.length == 1)
                            delete data[Id].path;
                        else
                            data[Id].path = data[Id].path.filter(site => site !== null)
                        break;
                    }
                }
                if(!found){
                    res.status(400).send('No such site');
                    return;
                }
            }else{
                delete data[Id].path;
            }
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${Id} removed`);
            });
    }
};