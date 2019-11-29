/*Aquí va toda la lógica del cliente: acciones al pulsar botones, fetch de los datos, etc....*/

/* Lógica de prueba, para comprobar la integración con la api. */

let currentNotice = undefined;
let game = {
    correct: 0,
    incorrect: 0,
    total: 0
}

window.onload = () => getNotice(res => {
    currentNotice = res;
    printNotice(currentNotice);
    console.log(currentNotice);
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
                console.log("Correct!");
                game.correct++;
            }
            else if (value != currentNotice.isFake) {
                console.log("Incorrect")
                game.incorrect++;
            }
            game.total++;
            progressAnswer(value == currentNotice.isFake, ((game.correct / game.total) * 100).toFixed(2));
        }
        else progressInfo();

        console.log(`% score: ${(game.correct / game.total) * 100}`);
        currentNotice = res;
        console.log(currentNotice);
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

function progressAnswer(correct, score) {
    //GET HTHL elem
    document.getElementById('progress').innerHTML = "";
    const div = document.getElementById('progress');
    //Prepare text
    const text = (correct) ? "Correct, you have " + score + "% questions right" : "Incorrect, you have " + score + "% questions rigth";
    //Style HTML elem
    document.getElementById("progress").style.backgroundColor = (correct) ? "green" : "red";
    document.getElementById("progress").style.color = "white";
    document.getElementById("progress").style.opacity = 1;
    //Put HTML elem
    const content = document.createTextNode(text);
    div.appendChild(content);
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