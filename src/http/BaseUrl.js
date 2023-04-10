const URL_ENV = {
  DEV: {  //  封装开发环境所需要的url前缀
    BMDURL: 'http://localhost:3010',
    UPLOADURL: 'http://localhost:9000'
  },
  PRO: {  //  封装生产环境所需要的url前缀
    BMDURL: 'https://web.codeboy.com/bmdapi',
    UPLOADURL: 'https://web.codeboy.com/bmduploadapi'
  }
}
// 在此选择导出 开发环境 或 生产环境 的URL前缀
export default URL_ENV.DEV
