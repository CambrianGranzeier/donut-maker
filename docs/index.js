const express = require('express');
const Datastore = require('nedb');
let unames = ["USERNAME"];
let psws = ["password"];
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

    for (var i = 0; i < unames.length; i++) {
        if(uname === unames[i] && psw === psws[i]){
            isAuthenticated = true;
            break;
        }
    }

    response.json({
        Auth: isAuthenticated
    })
});

app.post('/apicreate', async (request, response) => {
    try {
        let info = request.body;
        let unamecreate = info.enteruname;
        let pswcreate = info.enterpsw;
        let repswcreate = info.renterpsw;

        // Assuming `database.find()` returns a promise
        let searchUname = await database.find({ Username: unamecreate });

        let isAvailable = false; // Assuming it's available by default

        if (searchUname.length > 0) { // Assuming searchUname is an array
            isAvailable = false;
        } else if(isAvailable && pswcreate === repswcreate){
            await database.insert(info);
        }

        response.json({
            Ava: isAvailable
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
