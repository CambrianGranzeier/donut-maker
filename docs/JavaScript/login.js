let Datastore = require('nedb');
let accounts = new Datastore(data.db);
accounts.loadDatabase();


function login(event){
    event.preventDefault(); // prevent default form submission
    let uname = document.getElementById("unames").value.toUpperCase();
    let psw = document.getElementById("psws").value.toUpperCase();

    let isAuthenticated = false;

    for (var i = 0; i < unames.length; i++) {
        if(uname === unames[i] && psw === psws[i]){
            isAuthenticated = true;
            break;
        }
    }

    if(isAuthenticated){
        window.location.replace("/docs/html/DonutMaker.html");
    } else {
        document.getElementById("errorMessage").innerHTML = "Username or password is incorrect";
    }
}

function createbtn(){
    window.location.replace("/docs/html/create.html");
}

function create(){
    let enteruname = document.getElementById("enteruname").value.toUpperCase();
    let enterpsw = document.getElementById("enterpsw").value.toUpperCase();
    let renterpsw = document.getElementById("renterpsw").value.toUpperCase();

    console.log("function");
    for (var i = 0; i < unames.length; i++) {
        console.log("for loop");
        if(enteruname == unames[i]){
            document.getElementById("errorMessageEnter1").innerHTML = "Username is not available.";
        }
        
        if (enterpsw != renterpsw) {
            document.getElementById("errorMessageEnter2").innerHTML = "Password dose not match.";
        }

        if(enteruname != unames[i] && enterpsw == renterpsw){
            console.log("test");
            window.location.replace("/docs/html/DonutMaker.html");
            unames.push(enteruname);
            unames.push(enterpsw);
            break;
        }
    }
}