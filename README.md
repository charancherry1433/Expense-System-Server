# Expense Management System Server part using node js and mysql

The quickest way to get start with Node.Js, Express & MySQL, just clone the project:

```bash
$ git clone https://github.com/charancherry1433/Expense-System-Server.git
```

Install dependencies:

```bash
$ npm install
```

Start Express.js app at `http://localhost:3000/`:

```bash
$ npm start
```

# Nodemon

Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

Start Express.js app with nodemon at `http://localhost:3000/`:

```bash
$ nodemon bin/www
```

# Nodejs Cluster

Node.js runs in a single process, by default. Ideally, we want one process for each CPU core, so we can distribute the workload across all the cores. Hence improving the scalability of web apps handling HTTP requests and performance in general. In addition to this, if one worker crashes, the others are still available to handle requests.

```js
var cluster = require("cluster");
var workers = process.env.WORKERS || require("os").cpus().length;

if (cluster.isMaster) {
  console.log(
    "Master cluster is running on %s with %s workers",
    process.pid,
    workers
  );
  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork().process;
    console.log("worker %s on %s started", i + 1, worker.pid);
  }
  cluster.on("exit", function (worker, code, signal) {
    console.log("worker %s died. restarting...", worker.process.pid);
    cluster.fork();
  });
}

if (cluster.isWorker) {
  // Server code
}
```

# MySQL Database Connectivity (with connection pool)

This is a node.js driver for mysql. Also implemented the connection pool, it is a cache of database connections maintained so that the connections can be reused when future requests to the database are required. Connection pools are used to enhance the performance of executing commands on a database.

```js
module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST, // The hostname of the database you are connecting to. (Default: localhost)
    user: process.env.DB_USER, // The MySQL user to authenticate as.
    password: process.env.DB_PASSWORD, // The password of that MySQL user.
    database: process.env.DB_NAME, // Name of the database to use for this connection.
    charset: "utf8",
  },
  pool: {
    max: 10, // The maximum number of connections to create at once. (Default: 10)
    min: 3, // The minimum number of connections to create at once. (Default: 10)
  },
  acquireTimeout: 60 * 1000, // The milliseconds before a timeout occurs during the connection acquisition. (Default: 10000)
  debug: false,
};
```
