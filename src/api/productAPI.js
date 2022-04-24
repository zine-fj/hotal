
let theUrl = null
let detailUrl = null

if (process.env.NODE_ENV === 'development') {
  theUrl = '/mock/product.json'
  detailUrl = '/mock/detail.json'
} else if (process.env.NODE_ENV === 'test') {
  theUrl = '...'
  detailUrl = '...'
} else { // 生产环境，可放后台接口
  theUrl = '/mock/product.json'
  detailUrl = '/mock/detail.json'
}
const PRO_API = {
  getProInfo: {
    method: 'get',
    url: theUrl
  },

  getDetail: {
    method: 'get',
    url: detailUrl
  }
}
export default PRO_API