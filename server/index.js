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

app.get('/api/standard-boards', ctrl.getBoards);

const port = SERVER_PORT || 4400;
app.listen(port, () => console.log(`Coding is happening on port ${port}`));