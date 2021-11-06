/*
 *@description: 生成请求头信息
 *@author: codeWen666
 *@date: 2021-11-06 12:50:37
 *@version: V1.0.5
*/
const activeUrl = require('./urlList.js')
const activeCookie = require('./cookieList.js')
function createHeader (id) {
  const option = {
    url: `${activeUrl}` + id,
    timeout: 5000,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-charset': 'utf8',
      'Cache-Control': 'max-age=0',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, sdch, br',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,zh-TW;q=0.2',
      Cookie: `${activeCookie}`,
      Referer: 'https://www.pixiv.net/',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36'
    }
  }
  return option
}
module.exports = createHeader
