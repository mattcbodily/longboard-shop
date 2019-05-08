require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const sessions = require('express-session');
const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();
app.use(json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.get('/api/standard-boards', ctrl.getBoards); //found in the boards component
app.get('/api/boards-by-design/:design', ctrl.getBoardByDesign); //found in the pintail design and drop design components, takes the design name of the board
app.get('/api/boards-price-filter-low', ctrl.filterLowestPrice); //found in the boards component
app.get('/api/boards-price-filter-high', ctrl.filterHighestPrice); //found in the boards component
app.get('/api/boards-low-price-filter/:design', ctrl.filterLowestPriceByDesign); //found in the pintail design and drop design components, takes in the design name of the board
app.get('/api/boards-high-price-filter/:design', ctrl.filterHighestPriceByDesign); //found in the pintail design and drop design components, takes in the design name of the board
app.get('/api/selected-board/:title', ctrl.getSelectedBoard); //found in the boards component

const port = SERVER_PORT || 4400;
app.listen(port, () => console.log(`Coding is happening on port ${port}`));