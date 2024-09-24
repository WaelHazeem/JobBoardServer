const express = require('express');
const companies=require('./routes/companies');
const   apiKeys  = require('./db').apiKeys;
const   jobs  = require('./db').jobs;
const  users  = require('./db').users;
const   userJobs  = require('./db').userJobs;

const app = express();
const port = 3000;

const router = express.Router()

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['my-auth']) return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/api/admin', router, (req, res) => {
  res.sendStatus(401)
})

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/users',(req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  });

  app.get('/api/user/:id', (req, res, next) => {
 // if the user ID is 0, skip to the next route
 if (req.params.id === '0') next('route')
    // otherwise pass the control to the next middleware function in this stack
    else next()
  }, (req, res, next) => {
    // send a regular response
    res.send('regular')
  })
  
  // handler for the /user/:id path, which sends a special response
  app.get('/api/user/:id', (req, res, next) => {
    res.send('special')
  })

  // handler for the /user/:id path, which prints the user ID
  app.get('/user/:id', (req, res, next) => {
    res.send(req.params.id)
  })

app.get('/api/users', function (req, res) {
    res.send(users);
});

app.get('/api/jobs', function (req, res) {
    res.send(jobs);
});

app.get('/api/user/:name/jobs', function (req, res, next) {
    var name = req.params.name;
    var user = userJobs[name];

    if (user) res.send(user);
    else next();
});


app.use('/companies',companies);
app.use('/api', function (req, res, next) {
    var key = req.query['api-key'];

    // key isn't present
    if (!key) return next(error(400, 'api key required'));

    // key is invalid
    if (apiKeys.indexOf(key) === -1) return next(error(401, 'invalid api key'))

    // all good, store req.key for route access
    req.key = key;
    next();
});
app.use(function (err, req, res, next) {
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    res.status(err.status || 500);
    res.send({ error: err.message });
});

app.use(function (req, res) {
    res.status(404);
    res.send({ error: "Sorry, can't find that" })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})