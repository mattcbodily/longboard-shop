require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const aws = require('aws-sdk');
const ctrl = require('./controller');
const ac = require('./authcontroller');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;
const app = express();
app.use(json());

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

//amazon s3 will be implemented for custom board graphics, with react dropzone?, and react-avatar-editor

app.get('/api/signs3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    };

    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        };

        return res.send(returnData);
    })
})

//authorization endpoints
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);
app.get('/auth/session-user', ac.getSessionUser);
app.put('/auth/update-email/:id', ac.updateEmail); //found in the user component, takes the user_id and new email
app.put('/auth/update-password/:id', ac.updatePassword); //found in the user component, takes the user_id, and new password

//data endpoints
app.get('/api/standard-boards', ctrl.getBoards); //found in the boards component
app.get('/api/board-bar', ctrl.getBoardBar); //found in the selected board and cart component
app.get('/api/boards-by-design/:design', ctrl.getBoardByDesign); //found in the pintail design and drop design components, takes the design name of the board
app.get('/api/boards-price-filter-low', ctrl.filterLowestPrice); //found in the boards component
app.get('/api/boards-price-filter-high', ctrl.filterHighestPrice); //found in the boards component
app.get('/api/boards-low-price-filter/:design', ctrl.filterLowestPriceByDesign); //found in the pintail design and drop design components, takes in the design name of the board
app.get('/api/boards-high-price-filter/:design', ctrl.filterHighestPriceByDesign); //found in the pintail design and drop design components, takes in the design name of the board
app.get('/api/selected-board/:title', ctrl.getSelectedBoard); //found in the boards component
app.get('/api/selected-design/:id', ctrl.getSelectedBoardDesign); //found in the selected board component, takes design id, found in board on state
app.get('/api/selected-grip/:id', ctrl.getSelectedBoardGrip); //found in the selected board component, takes grip id, found in board on state
app.get('/api/selected-trucks/:id', ctrl.getSelectedBoardTrucks); //found in the selected board component, takes trucks id, found in board on state
app.get('/api/selected-wheels/:id', ctrl.getSelectedBoardWheels); //found in the selected board component, takes wheels id, found in board on state
app.get('/api/user-cart/:id', ctrl.getUserCart); //this is found in the cart component, takes the user id
app.get('/api/order-history/:id', ctrl.getOrderHistory); //this is found in the user component, takes the user id

app.post('/api/standard-cart-item', ctrl.addToCartStandardProduct); //found in the boards component, taking a req.body with the order_id, board_id, quantity, and price
app.post('/api/custom-cart-item', ctrl.addToCartCustomProduct); //found in the pictures component in the custom folder. Takes a req.body with order_id, design name, grip name, trucks name, wheels color, graphic url, and total
app.put('/api/item-quantity/:id', ctrl.updateItemQuantity); //found in the cart display component

app.delete('/api/cart-item/:id', ctrl.deleteCartItem); //this is found in the cart display component, taking the order item id in params

//custom board endpoints
app.get('/api/board-design', ctrl.getBoardDesigns); //this is found in the design component in the custom folder
app.get('/api/board-grip', ctrl.getBoardGrips); //this is found in the board grip component in the custom foler
app.get('/api/board-trucks', ctrl.getBoardTrucks); //this is found in trucks component in the custom folder
app.get('/api/board-wheels', ctrl.getBoardWheels); //this is found in the wheels component in the custom folder

//stripe endpoint
app.post('/api/payment', ctrl.chargeCustomer);

const port = SERVER_PORT || 4400;
app.listen(port, () => console.log(`Coding is happening on port ${port}`));