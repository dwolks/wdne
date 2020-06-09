var express = require('express');
var app = express();
var motto = require('./lib/motto.js');

//set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//Static middleware, for public files like CSS, imgs,JS
app.use(express.static(__dirname + '/public'));

//Middleware detecting test=1 querystring
app.use((request, response, next) => {
    response.locals.showTests = app.get('env') !== 'production' && request.query.test === '1';
    next();
});


app.get('/', (request, response) => {
    response.render('home');
});

app.get('/about', (request, response) => {
    response.render('about', {
        motto: motto.getMotto(),
        pageTestScript: '/qa/tests-about.js'
        }
    );
});

app.get('/tours/hood-river', (request, response) => {
    response.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (request, response) => {
    response.render('tours/request-group-rate');
});



//404 catch-all handler (middleware)
app.use((request, response, next) => {      
    response.status(404);
    response.render('404');
});

//Custom 500 page 
app.use((err, request, response, next) => {
    console.error(err.stack);
    response.status(500);
    response.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + 
    app.get('port') + '; press Crtl + C to terminate.');
});

