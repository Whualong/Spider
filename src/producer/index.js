/*
 *@description: 生产者生产id
 *@author: codeWen666
 *@date: 2021-11-06 16:31:23
 *@version: V1.0.5
*/
const print = require('../utils/console.js')
const config = require('../config.js')
const EventEmitter = require('events')
const redis = require('redis')
const bluebird = require('bluebird')
let startID = config.startID
const client = redis.createClient(config.redisPort, config.redisHost)
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

client.on('error', function (error) {
  print.error(error)
  process.exit()
})

client.on('ready', async function () {
  const currentID = await client.lpopAsync('biliId')
  print.success(currentID)
  if (currentID) {
    startID = currentID
  }
  const length = await getListLength()
  if (length < 1000) {
    producer.emit('begin')
  }
})

class Producer extends EventEmitter {
  constructor () {
    super()
    this.status = 'ready'
    this.id = startID
  }
}
const producer = new Producer()

producer.on('begin', async function () {
  this.status = 'begin'
  while (true) {
    // 如果当前状态变为pause，停止生产
    if (this.status === 'pause') {
      break
    }
    const msg = this.id
    // 写入redis
    await client.lpushAsync('biliId', msg)
    ++this.id
  }
})

producer.on('pause', function () {
  if (this.status === 'begin') {
    print.warn('Producer will pause')
    this.status = 'pause'
  }
})

producer.on('resume', function () {
  if (this.status === 'pause') {
    print.warn('producer ready to resume')
    this.emit('begin')
  }
})

async function getListLength () {
  // 获取缓冲区大小
  const length = await client.llenAsync('biliId')
  return length
}

setInterval(async function () {
  const length = await getListLength()

  if (length > 1000 && producer.status === 'begin') {
    print.warn('producer will pause')
    producer.emit('pause')
  }

  if (length < 1000 && producer.status === 'pause') {
    producer.emit('resume')
  }
}, 100)// 每隔100ms检查一次
