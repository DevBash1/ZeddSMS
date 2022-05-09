const express = require('express')
const parser = require("./parser.js");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.post('/sms', (req, res) => {
    // We will be coding here
    // console.log(req.body);
    if(req.body.sender == "9mobile"){
        let response = parser.mobile(req.body.message);
        console.log(response);
    }else if(req.body.sender == "GLO"){
        let response = parser.glo(req.body.message);
        console.log(response);
    }else if(req.body.sender == "AirtelERC"){
        let response = parser.airtel(req.body.message);
        console.log(response);
    }else if(req.body.sender == "777"){
        let response = parser.mtn(req.body.message);
        console.log(response);
    }
    // Store Messages Just Incase
    fs.writeFileSync('sms.txt', "\n\n" + JSON.stringify(req.body));
});

app.get('/sms', (req, res) => {
    // We will be coding here
    res.send('Mehn hit me with a post request!!!');
});

app.get('/', (req, res) => {
    // We will be coding here
    res.send('Am working blah blah blah');
});

app.listen(port, () => console.log(`listening on port ${port}!`));
