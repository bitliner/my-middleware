const test = require('ava')
const MyMiddleware = require('./')
const sinon = require('sinon')

test('MiddleStuff instances should offer method startReceiver(), startClient()', t => {
  const myMiddleware = new MyMiddleware({})
  t.truthy(myMiddleware.send)
  t.truthy(myMiddleware.startServer)
  t.truthy(myMiddleware.startClient)
})

test('use() should set implementation for onMessage() primitive', t => {
  const serverSpy = sinon.spy()
  const clientSpy = sinon.spy()
  const setupSpy = sinon.spy()

  class Implementation {
    setup () {
      setupSpy()
    }
    setOnMessage (msg) {
      serverSpy(msg)
    }
    send (msg) {
      clientSpy(msg)
    }
  }

  const myMiddleware = new MyMiddleware(new Implementation())
  myMiddleware.startServer()
  myMiddleware.startClient()

  const msg = { body: 'this is a message' }

  myMiddleware.send(msg)

  t.truthy(setupSpy.called)
  t.truthy(serverSpy.called)
  t.truthy(clientSpy.called)

  t.truthy(clientSpy.calledWithExactly(msg))
})

// const Queue = {}
// class MyMiddlewareBullImplementation {
//   constructor(opts) {
//     const { name, redisUrl } = opts

//     this.name = name
//     this.redisUrl = redisUrl
//   }
//   setup (opts) {
//     this.queue = new Queue(this.name, this.redisUrl)
//   }
//   onMessage () {
//     this.queue.process(this.name, (job, done) => {
//       done()
//     })
//   }
//   send (msg) {
//     this.queue.add(msg)
//   }
// }
