var secRemaning;
shooted_array = [];
var shootGun = true;
topp = 100;
left = 0;
//var score = 0;
var player = false;


//make spacecraft moving by keyboard
function spacecraft(){
    var left = 0;
    image_space = document.getElementById("spacecraft_id");
    game = document.getElementById("game");
    var scoreId = document.getElementById("score");
    audioShoot = document.getElementById("myAudio"); 
    var score = 0;
    document.onkeydown = function(event){
        switch(event.keyCode){
            case 37: 
                console.log("leftttttt");
                left -= 10;
                if(left >= 0) {
                    image_space.style.left =  left + "px";

                } else {

                    left = 0;
                }
                
                break;

            case 39:
                console.log("right");
                //console.log("test2_left", left);
                left += 10;
                if(left<(window.innerWidth-parseInt(image_space.style.width))) {
                    
                    image_space.style.left = left + "px";
                } else {
                    left = window.innerWidth-parseInt(image_space.style.width);
                }
                
                break;

            case 32:
                console.log("spaaaace");
                
                audioShoot.play();

                    var bull = createGun();
                    var c = window.innerHeight - 100;
                    var stopBull = setInterval(function(){
                        //console.log("tesssssssssssssssst");
                        c -= 10;
                        bull.style.top = c + "px";

                        for(i in shooted_array) {
                            if(collision(bull, shooted_array[i])== true){
                                score += 1;
                                scoreId.innerText = "Score: " + score;
                                if(score >= 20){
                                    player = true;
                                    localStorage.setItem('scoree',score);
                                    clearInterval(stopBull);
                                    alert("congratulation!! winner");
                                    confirm_msg();
                                }
                                var index = shooted_array.indexOf(shooted_array[i]);
                                shooted_array.splice(index,1);

                            }
                        }


                    },20);

                break;
        }
    }; //keyboard
} //spacecraft

//timer finish after 2 min
function timing(){

    secRemaning = 2 * 60;

    var interval = this.setInterval(function(){
        var min = Math.floor(secRemaning / 60);
        var sec = secRemaning - (min * 60);
        
        if(sec < 10){
            sec = "0" + sec;
        }

        var showing = min + ":" + sec;
        time.innerText = "Time: " + showing;

        //console.log("tessssst", showing);

        if(secRemaning == 0){
            //localStorage.setItem('scoree',score);
            //player = true;
            clearInterval(interval);
            alert("Game over");
            confirm_msg();
        }

        secRemaning --;

    }, 1000);
} //fun_timer


//create shooted image plante
function createShooted(){
    
    image_shooted = document.createElement("img");
    image_shooted.setAttribute("src", "images/shooted.png");
    image_shooted.classList.add("pic");
    left += 100;
    //topp += 100;
    image_shooted.style.left = left + "px";
    image_shooted.style.top = topp + "px";

    //console.log("tooop", image_shooted.style.top);
    //console.log("lefttt", image_shooted.style.left);

    shooted_array.push(image_shooted);
    

    game.appendChild(image_shooted);


    return shooted_array;
}

function blackBox() {
    image_black = document.createElement("img");
    image_black.setAttribute("src", "images/black.png");
    image_black.classList.add("pic");

    shooted_array.push(blackBox);

    game.appendChild(image_black);
}

//Gun shooter
function createGun(){

        fire = document.createElement("img");
        fire.setAttribute("src","images/test.png");
        fire.classList.add("gun");
        fire.style.left = parseInt(image_space.style.left) + 20 + "px" ;
        game.appendChild(fire);

        return fire;

} //fire 


//collision between two elements(fire & shooted and shooted & spacecraft)
function collision(e1, e2){

    var object_1 = e1.getBoundingClientRect();
    var object_2 = e2.getBoundingClientRect();
        
    if (object_1.left < object_2.left + object_2.width  && object_1.left + object_1.width  > object_2.left &&
        object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {

            console.log("collllision");
            e1.remove();
            e2.remove();
            shootGun = true;
    
        }

        else {
            shootGun = false;
        }

        return shootGun;

}//collision


//cinfirm by pop up js library bootbox.js
function confirm_msg() {
    bootbox.confirm("Do you want to play again?", function(result){
        if(result == true) {
            location.reload();
        }
        else {
            window.location = "Home_page.html";
        }
    })


} // confirm

window.addEventListener("load",function(){

    //var start = document.getElementById("startbtn");
    //start.onclick = function(){

       //start_div.style.display = "none";


    var user = document.getElementById("user");
    var localuse = this.localStorage.getItem('user');

    user.innerHTML = "welcome " + localStorage.getItem('user') + " !";

    if(localuse !== null) {
        var scorelocal =  localStorage.getItem('scoree');
        if(scorelocal !== null) {
            high.innerText = "Last score " + scorelocal;
    }

    }

    timing();

    spacecraft();

    for(i = 0; i< 7; i++){

        createShooted();
    }

    left = 0;
    topp += 80;

    var stopp = setInterval(function(){
        for(i = 0; i< 7; i++){
            createShooted();
        }

        left = 0;
        topp += 80;
        for(i in shooted_array){

            if(collision(shooted_array[i],image_space)== true){
                //localStorage.setItem('scoree',score);
                clearInterval(stopp);
                alert("Loser !!!!");
                confirm_msg();
                
            }

        }

    }, 5000)


//} //start_click


}); //load
