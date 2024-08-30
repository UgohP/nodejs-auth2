const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();
//passport config
// require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, dbName: 'nodejs-auth'})
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err)); 


//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');

//Bodyparser middleware
app.use(express.urlencoded({ extended: false }));

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
 }));

//Passport session
app.use(passport.initialize());
app.use(passport.session());

//connect-flash middleware
 app.use(flash());

 //Global variables
//  app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
//  });

//static folder

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/user'))

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server is listening on ${PORT}`));