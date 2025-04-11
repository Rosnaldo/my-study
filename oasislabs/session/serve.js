const express = require('express');  // Include ExpressJS
const app = express();  // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware
const session = require('express-session');  // express-sessions
const { v4: uuidv4 } = require('uuid'); //To call: uuidv4
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization

app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Route to Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

//  /login post route
app.post('/login', (req, res) => {
   console.log(req.body)
   req.session.username = req.body.username;
   console.log(req.session)
   res.send(`Hello ${req.session.username}. Your session ID is   
   ${req.sessionID} and your session expires in  
   ${req.session.cookie.maxAge} milliseconds.`);
});

app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
});

// Route to Log out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));
