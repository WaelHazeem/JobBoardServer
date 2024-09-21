const companies=require('./routes/companies');
const express = require('express')
const app = express()
const port = 3000



var apiKeys = ['foo', 'bar', 'baz'];

var jobs = [
    { name: 'express', url: 'https://github.com/expressjs/express' },
    { name: 'stylus', url: 'https://github.com/learnboost/stylus' },
    { name: 'cluster', url: 'https://github.com/learnboost/cluster' }
];

var users = [
    { name: 'tobi' }
    , { name: 'loki' }
    , { name: 'jane' }
];

var userJobs = {
    tobi: [jobs[0], jobs[1]]
    , loki: [jobs[1]]
    , jane: [jobs[2]]
};

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

app.get('/', (req, res) => {
    res.send('Hello World!')
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