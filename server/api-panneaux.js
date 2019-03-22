const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 8080;

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}
app.use(cors());

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -CORS

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:panneaux' ]);

app.get('/', function (req, res) {
  res.send('Hello Worldy!')
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});


app.get('/api/public', function(req, res) {
  res.send({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});


app.get('/api/private', checkJwt, checkScopes, function(req, res) {
  res.send({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
});

app.listen(port);

console.log('Server listening on http://localhost:'+port);
