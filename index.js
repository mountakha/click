var score = 0;
var termin = 1;
const socket = io();

History = document.getElementsByTagName("h4")[0].firstChild.data;



//const Account = require('../models/account.js').Account;



var x = document.getElementsByTagName("score");





$(function() {
    var state = true;
    $("#button").on("click", function() {
        if (state) {
            $("#clock").animate({
                backgroundColor: "#aa0000",
                color: "#fff",
                width: 500
            }, 1000);
        } else {
            $("#clock").animate({
                backgroundColor: "#fff",
                color: "#000",
                width: 240
            }, 1000);
        }
        state = !state;
    });
});


function loadPage() {
    $("#background").animate({}, 800, function() {
        $("#clickbtn").animate({ height: "250px", width: "250px" }, 850, function() {
            $("#clickbtn").animate({ fontSize: "45px" }, 850, function() {
                $("#score").animate({ fontSize: "30px" }, 550, function() {})



            })
        })
    })
}


function clickBtn() {
    score++;
    console.log(score);

    x.innerHTML = document.getElementsByTagName("h4")[0].firstChild.data = "bonjour " + Math.floor((Math.random() * 1000) + 1 + score);





    if (score >= 19) {
        score >= 10;
    }


    if (score >= 515) {
        score += -800;
    }
    if (score >= 516) {
        score += -500;
    }
    if (score >= 514) {
        score += 40;
    }
    if (score >= 614) {
        score += 100;
    }
    if (score >= 615) {
        score += -300;
    }


    return score;

}

socket.on('typingIncoming', data => document.querySelector('#typing').innerHTML = ` ${data.name} is typing (${data.message})`);



socket.on('history', data => data.forEach(message => {
    if (message.name !== '') {
        document
            .querySelector('#messages')
            .innerHTML += `<li>${message.name} : ${message.message}</li>`
    }




}));







document
    .querySelector('#score')
    .addEventListener('keyup', () => {
        const message = document
            .querySelector('#score')
            .value;

        socket.emit('typing', {
            message,
            name
        });
    });



document
    .querySelector('.send')
    .addEventListener('click', () => {
        const message = document
            .querySelector('#score')
            .value;

        /* {
          message,
          name
        }
        --->
        {
          message:message,
          name:name
        } */



        {
            message,
            name
        }

        socket.emit('newMessage', {
            message,
            name
        });

        document
            .querySelector('#score')
            .value = document.getElementsByTagName("h4")[0].firstChild.data;
    });

socket.on('incomingMessage', data => document
    .querySelector('#messages')
    .innerHTML += `<span>${data.name} : ${data.message}</span>`);


$('#typing').after($('#typing2'));

/*

$(() => {

    $("send").click(() => {

        var chatMessage = {

            name: $("#{user.username}").val(),
            chat: $("#score").val()

        }

        postChat(chat)

    })

})

function postChat(chat) {

    console.log(chat)

}


function getChats() {

    $.get("/Acount", (Account) => {

        chats.forEach(addChat)

    })

}

function addChat(chatObj) {

    document.getElementsByTagName("h4")[0].firstChild.data.append(`<h5>${chatObj.name} </h5><p>${chatObj.chat}</p>`);

}


app.get("/Account", (req, res) => {

    Chats.find({}, (error, chats) => {

        res.send(Account)

    })

})

*/
