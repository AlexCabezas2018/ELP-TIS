/*Back-end:
    - Loads the notices
    - It's listening for notices petitions
*/

const Papa = require('papaparse');
const fs = require('fs');
const Express = require('express');
const mail = require('./mail.js');

require('dotenv').config(); //env file

var fakeNews = [];

function init() {
    parseFile('api/dataset/fake-news.csv', data => {
        data.forEach(elem => {
            fakeNews.push({
                notice: elem.Statement,
                isFake: (elem.Label == 'TRUE') ? false : true,
                notice_url: ""
            }); //dataset say if a new is real or not. this field stores if the new is fake or not
        })
    });

    parseFile('api/dataset/gossipcop_fake.csv', data => {
        data.forEach(elem => {
            fakeNews.push({
                notice: elem.title,
                isFake: true,
                notice_url: elem.news_url
            })
        });
    });

    parseFile('api/dataset/politifact_fake.csv', data => {
        data.forEach(elem => {
            fakeNews.push({
                notice: elem.title,
                isFake: true,
                notice_url: elem.news_url
            })
        });
    })

    let app = Express();

    app.listen(process.env.PORT, function () {
        console.log('Listening on port 3000!');
    });

    app.use(Express.static('public'));


    /* Routes */
    app.get('/api/notice', (req, res) => {
        res.status(200).json(pickRandomNotice()).end();
    });

    app.post('/api/contact/', (req, res) => {
        mail.sendEmail(req, res);
    });

}

function parseFile(fileName, parseFunction) {
    const file = fs.createReadStream(fileName);
    const config = {
        delimiter: ',',
        header: true,
        complete: function (results, file) {
            console.log(`[INFO] File ${fileName} readed`);
            parseFunction(results.data);
            console.log(`[INFO] Data from ${fileName} parsed`);
        }
    }

    Papa.parse(file, config);
}

function pickRandomNotice() {
    return fakeNews[Math.floor(Math.random() * fakeNews.length)];
}

init();
