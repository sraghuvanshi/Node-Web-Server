var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

// handlebars
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

//Express Midlleware

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`Unable to connect`);
        }
    });
    next();
});

//  ----- Maintenance ----------
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
// -----------------------------

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'Welcome to this site',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });

});

app.get('/bad', (req, res) => {
    res.send({
        Type: 'Error!',
        Error: [404, 'PageNotFound']
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});