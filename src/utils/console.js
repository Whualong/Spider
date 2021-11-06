/*
 *@description: 不同颜色打印日志
 *@author: codeWen666
 *@date: 2021-11-06 21:42:43
 *@version: V1.0.5
*/
const colors = require('colors-console')
module.exports = {
  success: function (result) {
    console.log(colors(['green', 'underline'], result))
  },
  warn: function (warn) {
    console.log(colors(['orange', 'underline'], warn))
  },
  error: function (error) {
    console.log(colors(['red', 'underline'], error))
  }
}
