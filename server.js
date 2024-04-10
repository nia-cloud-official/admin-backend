const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const mysql = require('mysql2');
const { randomBytes } = require('crypto');

// Generate a random string of 32 characters
const secretKey = randomBytes(32).toString('hex');

console.log(secretKey);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secretKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


/* // MySQL Connection
const db = mysql.createConnection({
  user: 'vznvqlqg', // User & Default database
  host: 'manny.db.elephantsql.com', // Server
  database: 'vznvqlqg', // User & Default database
  password: 'xL8tr6iPEOAYvR40tHwh8Y7wub53_79k', // Password (replace with your actual password)
  port: 5432, // Default PostgreSQL port
});
*/
// Passport configuration
passport.use(new Auth0Strategy({
  domain: 'niacloud.us.auth0.com',
  clientID: '0mOWQuQOQB32P3HKMPNtBq1ndq7DNFki',
  clientSecret: '0aDzJuzhsGcjG2CPZYIf-FcU9Q6PSThXT0bdoTzpZtaPWMrToGt0finUnzPlw3rH',
  callbackURL: 'https://admin-backend-fmkg.onrender.com/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the COHS Admin Dashboard');
});

// Login Route
app.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), (req, res) => {
  res.redirect('/');
});

// Callback Route
app.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/dashboard');
});

// Dashboard Route
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('https://dashboard.cohs.education/');
  } else {
    res.redirect('/login');
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(() => {}); // Log out the user
  res.redirect('https://cohs.education'); // Redirect the user to the home page or any other appropriate page
});


// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
