"use strict";

const Papa = require('papaparse');
const fs = require('fs');

var fakeNews = [];

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

function parseFiles() {
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
}

function pickRandomNotice() {
    return fakeNews[Math.floor(Math.random() * fakeNews.length)];
}

module.exports = {
    pickRandomNotice: pickRandomNotice,
    parseFiles: parseFiles
}