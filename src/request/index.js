/*
 *@description: promise构造请求
 *@author: codeWen666
 *@date: 2021-11-06 15:32:23
 *@version: V1.0.5
*/
const request = require('request')
function createRequest (header) {
  return new Promise((resolve, reject) => {
    request(header, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = createRequest
