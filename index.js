const { MongoClient, ServerApiVersion } = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
mongoose.Promise = require('bluebird');
var app = express();
const uri = "mongodb+srv://hilongwedding:RNOk9QN6lQKVq5Ws@longwedding.c9mhpew.mongodb.net/longthuywedding";

const loichucSchema = require('./model/loichuc');
const khachmoiSchema = require('./model/khachmoi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

mongoose.connect(uri, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log("Connected to Database")
});


app.get('/', function (req, res) {
    res.json({
        status: 0,
        msg: "Xin Chao"
    })
});


app.post('/getkhachmoi', async function (req, res) {
    console.log("Co khach moi truy cap")
    try {
        var khachmoi = await khachmoiSchema.find({ idperson: req.body.idperson })
        khachmoi.length == 0 ? res.json({
            status: 0
        }) : res.json({
            status: 1,
            body: khachmoi[0]
        })

    } catch (err) {
        console.log(err)
    }

});

app.post('/themkhachmoi', async function (req, res) {
    var idperson = Math.floor(Date.now() / 1000)
    var name = req.body.name
    var avatar = req.body.avatar

    const khachmoi = new khachmoiSchema({
        idperson: idperson,
        name: name,
        avatar: avatar
    })

    try {
        const result = await khachmoi.save()
        console.log(result)
        result ? res.json({
            status: 1
        }) : res.json({
            status: 0
        })
    } catch (err) {
        console.log(err)
    }
});

app.post('/ghiloichuc', async function (req, res) {
    var id = Math.floor(Date.now() / 1000)
    var name = req.body.name
    var loichuc = req.body.loichuc

    const loichucmoi = new loichucSchema({
        id: id,
        name: name,
        loichuc: loichuc
    })

    try {
        const result = await loichucmoi.save()
        result ? res.json({
            status: 1
        }) : res.json({
            status: 0
        })
    } catch (err) {
        console.log(err)
    }

});

app.get('/layloichuc', async function (req, res) {
    try {
        var listloichuc = await loichucSchema.find({})
        res.send(listloichuc);
    } catch (err) {
        console.log(err)
    }
});


app.listen(process.env.PORT, function () {
    console.log('XIN CHAO LONG WEDDING');
});