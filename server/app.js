 var createError   = require('http-errors');
 var express       = require('express');
 var cookieParser  = require('cookie-parser');
 var logger        = require('morgan');
/**
 * 中间件
 */
 const { authorizeMiddleware } = require('./middleware/auth');

 var loginRouter   = require('./routes/login');
 var bookRouter    = require('./routes/book');
 var userRooter    = require('./routes/user');
 var commentRouter = require('./routes/comment');
 var orderRouter   = require('./routes/order');

 var app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login',       authorizeMiddleware, loginRouter);
app.use('/api/user',    userRooter);
app.use('/api/book',    bookRouter);
app.use('/api/comment', commentRouter);
app.use('/api/order',   orderRouter);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
