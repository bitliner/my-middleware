# my-middleware

`my-middleware` offers an abstraction for distributed systems.

You can use `my-middleware` to:

- easily setup a distributed and scalable system based on queues (e.g. bull, AMPQ, ZeroMQ, etc.)
- easily switch from a queue system to another one - e.g. switch from ZeroMQ to bull etc.

## Usage

Example of a job server

```js

// server.js
//
//
const MyMiddleware = require('my-middleware')
const MyMiddlewareAmpq = require('my-middleware-ampq')

const workerCb(job, done)=>{ console.log(job) }
const myMiddlewareAmpq = new MyMiddlewareAmq({ workerCb })

const distributedSystem = new MyMiddleware(myMiddlewareAmpq)

distributedSystem.startServer()

// client.js
//
//
const MyMiddleware = require('my-middleware')
const MyMiddlewareAmpq = require('my-middleware-ampq')


const myMiddlewareAmpqClient = new MyMiddlewareAmq({ /* options */})
const distributedSystem = new MyMiddleware(myMiddlewareAmpqClient)

distributedSystem.startClient()

distributedSystem.send()
```

## Supported middleware

- [my-middleare-bull](http://github.com/bitliner/my-middleare-bull)

**TODO**

- [ ] my-middleare-kafka
- [ ] my-middleare-ampq

## How to add a middleware

