/*
 *@description: 多进程执行爬虫
 *@author: codeWen666
 *@date: 2021-11-06 14:08:21
 *@version: V1.0.5
*/
const child_process = require('child_process')
const cpuCorsNum = require('os').cpus().length

child_process.fork(__dirname, './producer/index.js')
for (let i = 0; i < cpuCorsNum; i++) {
  child_process.fork(__dirname, './consumer/index.js')
}
