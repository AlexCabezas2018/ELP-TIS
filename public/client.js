/*Aquí va toda la lógica del cliente: acciones al pulsar botones, fetch de los datos, etc....*/

/* Lógica de prueba, para comprobar la integración con la api. */

let currentNotice = undefined;
let game = {
    correct: 0,
    incorrect: 0,
    total: 0,
    incorrectStreak: 0
}

window.onload = () => getNotice(res => {
    currentNotice = res;
    printNotice(currentNotice);
});

function getNotice(callback) {
    fetch('api/notice', { mode: 'no-cors' })
        .then(res => res.json())
        .then(res => callback(res));
}

function step(value, info) {
    getNotice(res => {
        if (!info) {
            if (value == currentNotice.isFake) {
                game.correct++;
                game.incorrectStreak = 0;
            }
            else if (value != currentNotice.isFake) {
                game.incorrect++;
                game.incorrectStreak++;
            }
            game.total++;
            game.score = ((game.correct / game.total) * 100).toFixed(2);
            progressAnswer(value == currentNotice.isFake, game);
        }
        else progressInfo();
        currentNotice = res;
        printNotice(currentNotice);
    });
}

function printNotice(currentNotice) {
    //si ponemos link
    /*if (currentNotice.notice_url=="") document.getElementById("notice").innerHTML = currentNotice.notice + "<br>";
    else  document.getElementById("notice").innerHTML= currentNotice.notice + "<center><a href="+currentNotice.notice_url + "\" id =\"notice-link\">Click here to see the Notice!</a></center>";
    */
    document.getElementById("notice").innerHTML = currentNotice.notice
}

function progressAnswer(correct, game) {


    //GET HTHL elem
    document.getElementById('progress').innerHTML = "";
    const div = document.getElementById('progress');
    //Prepare text
    const text = (correct) ? "Correct, you have " + game.score + "% questions right" : "Incorrect, you have " + game.score + "% questions rigth";
    //Style HTML elem
    document.getElementById("progress").style.backgroundColor = (correct) ? "green" : "red";
    document.getElementById("progress").style.color = "white";
    document.getElementById("progress").style.opacity = 1;

    //Put HTML elem
    const content = document.createTextNode(text);
    div.appendChild(content);

    //Put link 
    if (game.incorrectStreak > 2) {
        let a = document.createElement('a');
        let link = document.createTextNode("Do you want to know how to beat Fake News?");
        a.appendChild(link);
        a.href = "./manual.html";
        a.style.color = "white";
        document.getElementById("progress").appendChild(a);
    }
}

function progressInfo() {
    //GET HTHL elem
    document.getElementById('progress').innerHTML = "";
    const div = document.getElementById('progress');
    //Prepare text
    const text = "RESULT";
    //Style HTML elem
    document.getElementById("progress").style.backgroundColor = "white";
    document.getElementById("progress").style.color = "black";
    document.getElementById("progress").style.opacity = 0;
    //Put HTML elem
    const content = document.createTextNode(text);
    div.appendChild(content);
}