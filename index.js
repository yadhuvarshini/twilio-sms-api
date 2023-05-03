const express = require('express');
const app = express();
const sendSms =  require('./twilio');

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 8070;

const udb = [];

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/', function(req, res) {
    const {phn , ddate} = req.body;
    console.log(phn , ddate);
    const user = {
        phn,
        ddate
    }

    udb.push(user);

    const welmsg = 'welcome to hell , delivery date is ' + ddate;

    sendSms("+91"+user.phn, welmsg);


    res.status(201).send({
        message: welmsg,
        data: user
      })

});

app.listen(port, () => {
    console.log("done listening http://localhost:8070");
});

module.exports = app;