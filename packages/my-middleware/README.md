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

const onMessage = (job, done) => { console.log(job) }
const myMiddlewareAmpq = new MyMiddlewareAmq({ onMessage })

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

const msg = { body:'a message...' }

distributedSystem.send(msg)
```

## Supported middleware

- [my-middleare-bull](https://github.com/bitliner/my-middleware/tree/master/packages/my-middleware-bull)

**TODO**

- [ ] my-middleare-kafka
- [ ] my-middleare-ampq

## How to add a middleware

TBD