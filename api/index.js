/*Back-end:
    - Loads the notices
    - It's listening for notices petitions
*/

const Papa = require('papaparse');
const fs = require('fs');
const Express = require('express');
const session = require('express-session');
const logger = require('log-to-file');

let visits = 0;

require('dotenv').config(); //env file

var fakeNews = [];

function init() {
    parseFile('api/dataset/fake-news.csv', data => {
        data.forEach(elem => {
            fakeNews.push({
                notice: elem.Statement,
                isFake: (elem.Label == 'TRUE') ? false : true,
                notice_url: ""
            }); //dataset say if a news item is real or not. this field stores if the news item is fake or not
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

    function addVisit(req, res, next) {
        if(!req.session.logged) {
            req.session.logged = true;
            logger("[INFO] Current visits: " + (++visits));
        }

        next();
    }

    let app = Express();
    app.use(Express.static('public'));

    app.use(session({
        saveUninitialized: false,
        secret: 'foobar34',
        resave: false,
    }));

    app.use(addVisit);

    app.get('/', (req, res) => {
        res.redirect('/game.html')
    });

    /* Routes */
    app.get('/api/notice', (req, res) => {
        res.status(200).json(pickRandomNotice()).end();
    });

    app.listen(process.env.PORT, "0.0.0.0", function () {
        console.log(`Listening on port ${process.env.PORT}!`);
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
