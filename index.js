const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbURL = process.env.DB_URL.replace(
    '<password>',
    process.env.DB_PASSWORD
);

mongoose.connect(dbURL);
const dataSchema = {
    id: Number,
    quotes: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
}

const Data = mongoose.model('Data', dataSchema);

app.post('/addQuotes', (req, res) => {
    const data = new Data({
        id: req.body.id,
        quotes: req.body.quotes,
        author: req.body.author
    })
    data.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(400).send(err)
    })
})

app.get("/featchData", (req, res) => {
    var randID = Math.floor(Math.random() * 10);
    // Using Promises with .then() and .catch()
    Data.findOne({ id:randID})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/index.html');
})

app.listen(PORT, () => {
    console.log("connection established on port " + PORT);

});

