var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(cookieParser('pezarana'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos:
app.use(function(req, res, next) {

    // guardar path en session.redir para después de login
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    // Hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
}); 

// Helper autologout
app.use(function (req, res, next) {
  // Define el tiempo de autologout - 2min - 120000ms
  // Para pruebas - 15s - 15000ms
  var tiempoAutoLogout = 120000;
  
  // Actualiza la hora del sistema del último acceso
  req.session.horaAccesoAnterior = req.session.horaAccesoActual || new Date().getTime();
  console.log("Acceso anterior: " + req.session.horaAccesoAnterior);
  
  // Memoriza la hora del sistema del acceso actual
  req.session.horaAccesoActual  = new Date().getTime();
  console.log("Acceso actual..: " + req.session.horaAccesoActual);
  
  // Comprueba la vigencia del tiempo de sesión
  req.session.tiempoSesionExcedido =
    req.session.horaAccesoActual - 
    req.session.horaAccesoAnterior > 
    tiempoAutoLogout;
  console.log("Excedido.......: " + req.session.tiempoSesionExcedido);
  
  // Borra el usuario de la sesión
  if (req.session.tiempoSesionExcedido) {
    delete req.session.user;
  }
  
  // Pasa el control al siguiente MW
  next();  
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
