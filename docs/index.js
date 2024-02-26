const express = require('express');
const Datastore = require('nedb');;
let isAuthenticated = false;

const app = express();
app.listen(3002, ()=> console.log("listening at 3002"));
app.use(express.static('docs/'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/apilogin', (request, response) => {
    let uname = request.body.uname;
    let psw = request.body.psw;
    database.find({ enteruname: uname, enterpsw: psw }, function (err, data){
        let unames = data[0].enteruname;
        let psws = data[0].enterpsw;
    
        if(uname === unames && psw === psws){
            isAuthenticated = true;
        }
    
        response.json({
            Auth: isAuthenticated
        })
    });
});

app.post('/apicreate', (request, response) => {
    try {
        let info = request.body;
        let unamecreate = info.enteruname;
        console.log(info);

        // Assuming `database.find()` returns a promise
        database.find({ enteruname: unamecreate }, function (err, data2){
            // retrieve the results as an array
            let searchResults = data2;
    
            let isAvailable = false; // Assuming it's not available by default
    
            if (!searchResults) {
                // Handle case when data2 is undefined
                console.log("No search results found.");
            } else if (searchResults.length > 0) {
                // Username already exists
                console.log("Username already exists.");
            } else {
                // Username is available
                isAvailable = true;
                database.insert(info);
                console.log("Inserted new user:", info);
            }
    
            response.json({
                Ava: isAvailable
            });
        });
    } catch (error) {
        console.error("Error:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});




