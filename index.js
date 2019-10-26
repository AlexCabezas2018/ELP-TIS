/*Back-end:
    - Loads the notices
    - It's listening for notices petitions
*/

const Papa = require('papaparse');
const fs = require('fs');

var fakeNews = [];

function init() {
    const file = fs.createReadStream('train.csv');
    const config = {
        delimiter: ',',
        header: true,
        complete: function (results, file) {
            console.log('[INFO] File readed');
            parseData(results.data);
        }
    }

    Papa.parse(file, config);
}

function parseData(data) {
    fakeNews = data.reduce((ac, elem) => {
        ac.push({ "Notice": elem['Statement'], isFake: (elem['Label'] == 'TRUE') ? false : true }); //dataset say if a new is real or not. this field stores if the new is fake or not
        return ac;
    }, []);
    console.log('[INFO] Data parsed');
}

function pickRandomNotice() {
    return fakeNews[Math.floor(Math.random() * fakeNews.length)];
}

init();
