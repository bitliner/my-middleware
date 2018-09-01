const Queue = require('bull')

class MyMiddlewareBull {
  constructor({ onMessage, redisUrl, name }) {
    this.onMessage = onMessage
    this.redisUrl = redisUrl
    this.name = name
  }
  setup () {
    this.queue = new Queue(this.name, this.redisUrl)
  }
  setOnMessage () {
    this.queue.process(this.onMessage)
  }
  send (msg) {
    this.queue.add(msg)
  }
}

module.exports = MyMiddlewareBull
