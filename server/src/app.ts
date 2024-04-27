
import indexRouter from './routes/index';
import createError from 'http-errors';
import path from 'path';
import express from 'express';
import ExpressErrorYup from './middlewares/express_error_yup';
import ExpressErrorResponse from './middlewares/express_error_response';
import ExpressAutoHandleTransaction from './middlewares/express_auto_handle_transaction';
import ExpressErrorSequelize from './middlewares/express_error_sequelize';



const app = express();

// Routers
app.use(indexRouter);

app.set('views', path.join(`${__dirname}/../`, 'views'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(
  express.json({
    limit: '200mb',
    type: 'application/json',
  })
);

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals,only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  async function handleRollbackTransaction(
    err: any,
    req: any,
    res: any,
    next: any,
  ) {
    try {
      await req.rollbackTransactions()
      // eslint-disable-next-line no-empty
    } catch (e) { }
    next(err)
  }

  app.use('/v1', handleRollbackTransaction);
  app.use('/v1', ExpressErrorYup);
  app.use('/v1', ExpressErrorSequelize);
  app.use('/v1', ExpressErrorResponse);
  app.use(ExpressAutoHandleTransaction);

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});
module.exports = app
