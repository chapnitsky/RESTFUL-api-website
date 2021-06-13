const express = require('express')
const path = require('path')
require('./db/mongo')
const routers = require('./routes/routes.js');


const app = express();

app.use('/list', express.static(path.join(__dirname, 'html/index.html')));
app.use('/add_tour', express.static(path.join(__dirname, 'html/add_tour_form.html')));
app.use('/add_guide', express.static(path.join(__dirname, 'html/add_guide_form.html')));
app.use('/update_guide', express.static(path.join(__dirname, 'html/update_guide_form.html')));
app.use('/del_guide', express.static(path.join(__dirname, 'html/del_guide_form.html')));
app.use('/guidetours', express.static(path.join(__dirname, 'html/tour_guide_form.html')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);
const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});