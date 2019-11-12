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
    console.log(currentNotice);
});

function getNotice(callback) {
    fetch('api/notice', { mode: 'no-cors' })
        .then(res => res.json())
        .then(res => callback(res));
}

function step(value) {
    getNotice(res => {
        if (value == currentNotice.isFake) {
            console.log("Correct!");
            game.correct++;
        }
        else {
            console.log("Incorrect")
            game.incorrect++;
        }
        game.total++;
        console.log(`% score: ${(game.correct / game.total) * 100}`);
        currentNotice = res;
        console.log(currentNotice);
    });

}