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

var companiesList=[{name:"c1"},{name:"c2"},{name:"c3"},{name:"c4"}]

module.exports= {apiKeys,jobs,users,userJobs,companiesList};