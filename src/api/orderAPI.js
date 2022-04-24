
let theUrl = null
if (process.env.NODE_ENV === 'development') {
  theUrl = '/mock/order.json'
} else if (process.env.NODE_ENV === 'test') {
  theUrl = '...'
} else { // 生产环境，可放后台接口
  theUrl = '/mock/order.json'
}
const ORDER_API = {
  getOrderInfo: {
    method: 'get',
    url: theUrl
  }
}
export default ORDER_API