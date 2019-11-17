/*Back-end:
    - Loads the notices
    - It's listening for notices petitions
*/
const Express = require('express');
const mails = require('./app/mails.js');
const news = require('./api/news.js')

require('dotenv').config(); //env file


let app = Express();

app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + process.env.PORT + '!');
});

app.use(Express.static('public'));

app.use(function(req,res,next) {
    news.parseFiles();
    next();
})

/* Routes */
app.get(process.env.NEWS_ENDPOINT, (req, res) => {
    res.status(200).json(news.pickRandomNotice()).end();
});

app.post(process.env.CONTACT_ENDPOINT, (req, res) => {
    mails.sendEmail(req, res);
});
