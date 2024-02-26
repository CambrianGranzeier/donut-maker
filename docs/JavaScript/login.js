const { response } = require("express");

function login(event){
    event.preventDefault(); // prevent default form submission
    let uname = document.getElementById("unames").value.toUpperCase();
    let psw = document.getElementById("psws").value;
    let isAuthenticated = false;

    const data = { uname, psw };
    const options = {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/apilogin', options)
        .then(response => response.json())
        .then(apiAuth => {
            isAuthenticated = apiAuth.Auth;
            if(isAuthenticated){
                window.location.replace("/html/mainMenu.html");
                
            } else {
                document.getElementById("errorMessage").innerText = "Username or password is incorrect.\npassword is case sensitive.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createbtn(){
    window.location.replace("/html/create.html");
}

function create() {
    let enteruname = document.getElementById("enteruname").value.toUpperCase();
    let enterpsw = document.getElementById("enterpsw").value;
    let renterpsw = document.getElementById("renterpsw").value;
    let email = document.getElementById("enteremail").value.toLowerCase();
    let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
    let info = { enteruname, enterpsw };

    if(enterpsw === renterpsw){
        const settings = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        };
    
        fetch('/apicreate', settings)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let answer = await response.json();
                return answer;
            })
            .then(apiAva => {
                let isAvailable = apiAva.Ava;
                
                if (isAvailable) {
                    if(regx.text(email)){
                        const choices = {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(email)
                        };

                        fetch('/apicreate', choices);
                        window.location.replace("/html/mainmenu.html");
                    } else {
                        document.getElementById("errorMessageEnter3").innerHTML = "Email is not valid.";
                    }
                } else {
                    document.getElementById("errorMessageEnter1").innerHTML = "Username is not available.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });
    } else {
        document.getElementById("errorMessageEnter2").innerHTML = "Passwords do not match.";
    }
}
