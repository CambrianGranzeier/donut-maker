const e = require("express");
const { response } = require("express");


// When the "remember me" box is checked, set the boolean value in localStorage
function rememberMeCheckboxChanged() {
    let rememberMeCheckbox = document.getElementById("rememberMeCheckbox");
    localStorage.setItem("boxChecked", rememberMeCheckbox.checked);
}

// Function to remember the username if the "remember me" box was checked
function remember() {
    let box = localStorage.getItem("boxChecked");
    console.log("Box value:", box);
    
    // Check if the "remember me" box was checked
    if (box === "true") { // Note: Check for string "true"
        let rememberCheck = localStorage.getItem("remember");
        console.log("Remember value:", rememberCheck);

        if (rememberCheck != null) {
            document.getElementById("unames").value = rememberCheck;
            console.log("Value set to 'unames' input field.");
        } else {
            console.log("No value found for 'remember' key in localStorage.");
        }
    } else {
        console.log("The 'remember me' box was not checked last time.");
    }
}

function login(event){
    event.preventDefault(); // prevent default form submission
    let checkbox = document.getElementById('remember');
    let uname = document.getElementById("unames").value.toUpperCase();
    let psw = document.getElementById("psws").value;
    localStorage.setItem("boxChecked", checkbox.checked);
    let isAuthenticated = false;

    if(checkbox.checked){
        localStorage.setItem("remember", uname)
    }

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
    let email = document.getElementById("enteremail").value;
    
    if(enterpsw === renterpsw){
        if(email.match(/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/)){
            let info = { enteruname, enterpsw, email };

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
                        window.location.replace("/html/mainmenu.html");
                    } else {
                        document.getElementById("errorMessageEnter1").innerHTML = "Username is not available.";
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error here
                });
            } else {
                document.getElementById("errorMessageEnter3").innerHTML = "Email is not valid.";
            }
    } else {
        document.getElementById("errorMessageEnter2").innerHTML = "Passwords do not match.";
    }
}