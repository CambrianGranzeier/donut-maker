function donutmaker(){
    window.location.replace("/html/DonutMaker.html");
}

function snake(){
    window.location.replace("/html/snake.html");
}

function logout(){
    let input;
    if(confirm("Are you sure you want to logout?")){
        window.location.replace("/index.html");
    }
}