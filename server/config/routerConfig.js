var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var goodsRouter = require('../routes/goods');


module.exports=(app)=>{
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/goods', goodsRouter);
}