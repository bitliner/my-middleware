class MyMiddleware {
  constructor(implementation) {
    this.implementation = implementation
  }
  startServer () {
    this.implementation.setup()
    this.implementation.setOnMessage()
  }
  startClient () {
    this.implementation.setup()
  }
  send (msg) {
    this.implementation.send(msg)
  }
}

module.exports = MyMiddleware
