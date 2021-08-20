const express = require('express');
const path = require('path');
const session = require('express-session')
const mongoose= require('mongoose')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRoutes = require('./routes/BlogRoutes');
const passport = require('passport');
const app = express();

mongoose.connect("mongodb://localhost:27017/homeWork",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}, ()=> {
  console.log(`database is connected`);
})

require('./config/passport')(passport)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(session({
  secret:"hello world",
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000*60*60*24
  },
  store:MongoStore.create({
    mongoUrl:"mongodb://localhost:27017/homeWork"
})
  
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRoutes);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const PORT = process.env.PORT || 3000

app.get("*", function(req,res){
  res.render("error")
})
app.listen(PORT,() => {
  console.log(`Server is running at port ${PORT}`);
})
