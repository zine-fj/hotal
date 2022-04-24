
let theUrl = null

if (process.env.NODE_ENV === 'development') {
  theUrl = '/mock/home.json'
} else if (process.env.NODE_ENV === 'test') {
  theUrl = '...'
} else { // 生产环境，可放后台接口
  theUrl = '/mock/home.json'
}

const Home_API = {
  getHomeInfo: {
    method: 'get',
    url: theUrl
  }
}
export default Home_API