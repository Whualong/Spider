/*
 *@description: 存取cookies的map
 *@author: codeWen666
 *@date: 2021-11-06 13:09:38
 *@version: V1.0.5
*/
const cookieList = {
  imgCookie: {
    test: "_uuid=F5BBE2CE-B97A-4351-7B14-435979B082A271169infoc; buvid3=143902D8-C152-42A4-9B8E-742F9AC89AE2138386infoc; sid=8n7h4ggr; CURRENT_FNVAL=80; blackside_state=1; rpdid=|(J~k|JmJRul0J'uY|lJYl|ku; PVID=1; fingerprint=d3052cb812e15686b829c5e79f8f09eb; buvid_fp=143902D8-C152-42A4-9B8E-742F9AC89AE2138386infoc; buvid_fp_plain=ECEA6105-EAED-40E1-BC77-D3EA51EA1E42148812infoc; DedeUserID=289372838; DedeUserID__ckMd5=4eeab9f0425f68b4; SESSDATA=7695f941%2C1642554406%2C94d60*71; bili_jct=a5d56706f20c7a802e6ce307c1b59f0c; CURRENT_BLACKGAP=1; CURRENT_QUALITY=64; innersign=0; bsource=search_baidu"
  }
}
const activeCookie = cookieList.imgCookie.test
module.exports = activeCookie
