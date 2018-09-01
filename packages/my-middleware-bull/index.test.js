const util = require('util')
const test = require('ava')
const MyMiddlewareBull = require('./')
const sinon = require('sinon')
const RedisServer = require('redis-server')
const REDIS_PORT = 7000
const redisServer = new RedisServer(REDIS_PORT)

test('constructor should associate options to this', t => {
  const onMessage = () => { }
  const name = 'queue-name'
  const redisUrl = 'redis://127.0.0.1:6379'

  const myMiddlewareBull = new MyMiddlewareBull({ onMessage, name, redisUrl })

  t.deepEqual(myMiddlewareBull.onMessage, onMessage)
  t.deepEqual(myMiddlewareBull.name, name)
  t.deepEqual(myMiddlewareBull.redisUrl, redisUrl)
})

test('setup() should build the queue', t => {
  const onMessage = () => { }
  const name = 'queue-name'
  const redisUrl = 'redis://127.0.0.1:6379'

  const myMiddlewareBull = new MyMiddlewareBull({ onMessage, name, redisUrl })
  myMiddlewareBull.setup()

  t.truthy(myMiddlewareBull.queue)
})

test.cb('the queue should allow sending and receiving messages', t => {
  const onMessageHandler = sinon.spy()
  const onMessage = (job, done) => { onMessageHandler(job.data); done() }

  const name = 'queue-name'
  const redisUrl = `redis://127.0.0.1:${REDIS_PORT}`

  redisServer.open((err) => {
    if (err === null) {
      const myMiddlewareBull = new MyMiddlewareBull({ onMessage, name, redisUrl })
      myMiddlewareBull.setup()
      myMiddlewareBull.setOnMessage()

      t.falsy(onMessageHandler.called)

      const msg = { body: 'this is a message' }

      myMiddlewareBull.send(msg)

      setTimeout(() => {
        t.truthy(onMessageHandler.called)
        t.truthy(onMessageHandler.calledWithExactly(msg))
        t.end()
      }, 5000)
    }
  })
})
