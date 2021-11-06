/*
 *@description: 消费者
 *@author: codeWen666
 *@date: 2021-11-06 17:30:44
 *@version: V1.0.5
*/
const request = require('../worker.js')
const colors = require('colors-console')
const redis = require('redis')
const EventEmitter = require('events')
const bluebird = require('bluebird')
const client = redis.createClient('6379', '127.0.0.1')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

client.on('error', function (err) {
  console.log(colors(['red', 'underline'], err))
  process.exit()
})
client.on('ready', function () {
  console.log('ready')
  consumer.emit('begin')
})
class Consumer extends EventEmitter {
  constructor () {
    super()
    this.status = 'ready'
  }
}
const consumer = new Consumer()

consumer.on('begin', async function () {
  this.status = 'begin'
  while (true) {
    const value = await client.rpopAsync('biliId')
    // 调用封装好的request方法
    const result = await Promise.race([request(value), timeout(5000)])

    // 提供的默认持久化方法
    if (result) {
      console.log(result)
      // persist(JSON.stringify(result))
    }

    if (this.status === 'pause') {
      break
    }
  }
})

consumer.on('pause', function () {
  console.log('Consumer will pause')
  this.status = 'pause'
})

consumer.on('resume', () => {
  if (this.status === 'pause') {
    this.status = 'begin'
    this.emit('begin')
  }
})

function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'timeout')
  })
}

async function getListLength () {
  console.log('Cousumer status ', consumer.status)
  // 获取缓冲区大小
  const length = await client.llenAsync('mqTest')

  if (length === 0 && consumer.status === 'begin') {
    console.log('consumer will pause')
    consumer.emit('pause')
  } else if (consumer.status === 'pause' && length > 1000) {
    // 设置当缓冲区大于1000时才启动消费者，避免在临界值附近反复切换状态
    consumer.emit('resume')
  }
}

setInterval(getListLength, 30000)// 每隔30s检查一次缓冲区
