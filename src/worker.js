/*
 *@description:
 *@author: codeWen666
 *@date: 2021-11-06 19:01:42
 *@version: V1.0.5
*/
const createHeader = require('./header/getHeader.js')
const resolveResult = require('./response/index.js')
const rp = require('./request/index.js')
const colors = require('colors-console')

async function onceRequest (id) {
  const option = createHeader(id.toString())
  const response = await rp(option).catch((err) => {
    console.log(colors(['red'], err))
  })
  if (response && response.statusCode === 200) {
    const msg = resolveResult.processPage(id, response)
    return msg
  } else {
    return undefined
  }
}

module.exports = onceRequest
