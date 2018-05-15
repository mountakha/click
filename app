var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');






// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://login:motdepasse@ds149138.mlab.com:49138/mongoose');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/register', (req, res) => register.find({}).exec((err, register) => res.json(register)));

app.post('/register', (req, res) => new register({
    username: "",
    password: ""
}).save((err) => {
    if (err) {
        res.send(err);
    } else {
        res.send('success');
    }
}));


/*

app.post('./sockets/base.js', function(req, res) {


    var product;
    console.log("POST: ");
    console.log(req.body);
    var History = new Schema({
        history: String
    });
    product.save(function(err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(product);




});


*/



/*

function postChat(chat) {

    $.post("http://localhost:3001/Account", chat)

}

app.post("/Account", async(req, res) => {

    try {

        var chat = new Account(req.body)

        await chat.save()

        res.sendStatus(200)

    } catch (error) {

        res.sendStatus(500)

        console.error(error)

    }

})
*/


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
