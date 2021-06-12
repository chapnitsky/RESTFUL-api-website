const fs = require('fs');

// variables
const dataPath = './data/tours.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }

            callback();
        });
    };

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
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{
                var obj = JSON.parse(data);
                var arr = Object.entries(obj);
                var sorted = arr.sort(compareDurations);
                res.send(sorted);
            }
        });
    },
    price_sort: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{
                var obj = JSON.parse(data);
                var arr = Object.entries(obj);
                var sorted = arr.sort(comparePrices);
                res.send(sorted);
            }
        });
    },
    date_sort: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{
                var obj = JSON.parse(data);
                var arr = Object.entries(obj);
                var sorted = arr.sort(compareDates);
                res.send(sorted);
            }
        });
    },
    //  LIST
    index: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{
                var obj = JSON.parse(data);
                var arr = Object.entries(obj);
                var sorted = arr.sort(compareStrings);
                res.send(sorted);
            }
        });
    },
    //  READ
    getTours: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{
                var obj = JSON.parse(data);
                var arr = Object.entries(obj);
                var sorted = arr.sort(compareStrings);
                res.send(sorted);
            }
        });
    },
    //  READ TOUR
    getTour: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else{
                const Id = req.params["id"];
                var obj = JSON.parse(data);
                if(!obj[Id]){
                    res.status(400).send(`No such tour`);
                    return;
                }
                res.send(obj[Id]);
            }
        });
    },
    // CREATE
    createTour: function (req, res) {

        readFile(data => {

            // add the new user
            res.setHeader("Access-Control-Allow-Origin", '*');
            const obj = req.body;
            if(!obj.id || !obj.start_date || !obj.duration || !obj.price || 
                !obj.guide || !obj.guide.name || !obj.guide.cellular || !obj.guide.email){
                    res.status(400).send('Missing args.');
                    return;
            }
            data[req.body.id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new tour added');
            });
        },
            true);
    },
    // CREATE SITE
    createSiteInPath: function (req, res) {
        readFile(data => {

            // add the new site
            const Id = req.params["id"];
            const obj = req.body;
            if(!data[Id]){
                res.status(400).send('No such tour');
                return;
            }
            if(!data[Id].path){
                data[Id].path = [];
                data[Id].path.push({
                    "name": obj.name,
                    "country": obj.country
                });
            }else{
                for(var i = 0; i < data[Id].path.length; i++){
                    if(data[Id].path[i].name == obj.name){
                        res.status(400).send('Already created');
                        return;
                    }
                }
                data[Id].path.push({
                    "name": obj.name,
                    "country": obj.country
                });
            }
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new site added');
            });
        },
            true);
},
    // UPDATE
    updateTour: function (req, res) {

        readFile(data => {

            // add the new user
            const Id = req.params["id"];
            if(!data[Id]){
                res.status(400).send('No such tour');
                return;
            }
            const obj = req.body;
            if(obj.start_date)
                data[Id].start_date = obj.start_date;
            if(obj.duration)
                data[Id].duration = obj.duration;
            if(obj.price)
                data[Id].price = obj.price;
            if(obj.guide){
                if(obj.guide.name){
                    let k=false;
                    for(let i=0;i<obj.guide.name.length;i++){
                        if(!isNaN(obj.guide.name[i])){
                            k=true;
                            break;
                        }
                    }
                    if (!k){
                        data[Id].guide.name = obj.guide.name;
                    }
                }
                if(obj.guide.cellular && obj.guide.cellular.length == 10){
                    let k=false;
                    for(let i=0;i<obj.guide.cellular.length;i++){
                        if(isNaN(obj.guide.cellular[i])){
                            k=true;
                            break;
                        }
                    }
                    if (!k){
                        data[Id].guide.cellular = obj.guide.cellular;
                    }
                }
                if(obj.guide.email){
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(re.test(obj.guide.email))
                        data[Id].guide.email = obj.guide.email;
                }
            } 

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${Id} updated`);
            });
        },
            true);
    },
    // DELETE
    deleteTour: function (req, res) {

        readFile(data => {

            // delete the tour
            const Id = req.params["id"];
            if(!data[Id]){
                res.status(400).send('No such tour');
                return;
            }
            delete data[Id];
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${Id} removed`);
            });
        },
            true);
    },
    // DELETE SITE
    deleteSite: function (req, res) {

        readFile(data => {

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
        },
            true);
    }
};