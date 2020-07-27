const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('form')
})
app.post('/result', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country',
        qs: { format: 'json', name: req.body.country },
        headers: {
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
            'x-rapidapi-key': 'process.env.API_KEY',
            useQueryString: true
        }
    };
    request(options, function (error, response, body) {
        if (error) {
            res.redirect('/')
        }
            const parsedBody = JSON.parse(body);
            res.render('result', {
                body: parsedBody
            })
    });
})
app.get('*', (req, res) => {
    res.render('404');
})
app.listen(process.env.PORT || 4001, process.env.IP, () => {
    console.log('Server is running on PORT 4001!')
})
