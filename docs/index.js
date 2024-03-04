const express = require('express');
const Datastore = require('nedb');
const CryptoJS = require('crypto-js');
require('dotenv').config();
const key = process.env.SECRET_KEY;

const app = express();
app.listen(3002, ()=> console.log("listening at 3002"));
app.use(express.static('docs/'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/apilogin', (request, response) => {
    let uname = request.body.uname;
    let psw = request.body.psw;

    database.find({ uname: uname }, function (err, data){
        if (err) {
            console.error("Error:", err);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (data.length === 0) {
            // No matching document found in the database
            console.log("No matching user found.");
            response.json({
                Auth: false
            });
            return;
        }

        // Assuming there's only one matching user
        let userData = data[0];

        let unames = userData.uname;
        let encryptedPsw = userData.password;
        
        // Decrypt the password
        let decryptedPsw;
        try {
            decryptedPsw = CryptoJS.AES.decrypt(encryptedPsw, key).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Error decrypting password:", error);
        }

        // Check if the provided credentials match
        if (uname === unames && psw === decryptedPsw) {
            response.json({
                Auth: true
            });
        } else {
            response.json({
                Auth: false
            });
        }
    });
});

app.post('/apicreate', (request, response) => {
    try {
        let info = request.body;
        let email = CryptoJS.AES.encrypt(info.email, key).toString(); // Convert encrypted data to string
        let password = CryptoJS.AES.encrypt(info.enterpsw, key).toString(); // Convert encrypted data to string
        let unamecreate = info.enteruname;
        let donutMaker = {
            highScore: 0,
            auto: 0,
            autoCost: 100,
            multi: 0,
            multiCost: 100,
            donut: 0,
            multiDonut: 1
        };
        let Cinfo = { 
            uname: unamecreate, 
            password: password, 
            email: email,
            donutMaker
        };

        // Assuming `database.find()` returns a promise
        database.findOne({ uname: unamecreate }, function (err, data){
            if (err) {
                console.error("Error:", err);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (data) {
                // Username already exists
                console.log("Username already exists.");
                response.json({
                    Ava: false
                });
            } else {
                // Username is available
                database.insert(Cinfo, function(err, newDoc) {
                    if (err) {
                        console.error("Error:", err);
                        response.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    response.json({
                        Ava: true
                    });
                });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/apiDonutMaker', (request, response) => {
    let details = request.body;
    let username = details.username;
    let highScore = details.highScore;
    let auto = details.auto;
    let autoCost = details.autoCost;
    let multi = details.multi;
    let multiCost = details.multiCost;
    let donut = details.donut;
    
    // Create an object with the fields and values to update
    let updateObject = {
        highScore: highScore,
        auto: auto,
        autoCost: autoCost,
        multi: multi,
        multiCost: multiCost,
        donut: donut
    };

    database.update({ uname: username }, { $set: updateObject }, { upsert: true }, function (err, numReplaced, upsert) {
        if (err) {
            console.error("Error updating document:", err);
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        console.log("Number of documents replaced:", numReplaced);
        console.log("Upsert:", upsert);

        // Send a response indicating the update was successful
        response.json({ success: true });
    });
});
