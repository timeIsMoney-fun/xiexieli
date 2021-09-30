let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  // BASE_URL =
  //   'https://www.fastmock.site/mock/639d882ed530649e09bcd9893cf5ad91/douban'
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/pro'
} else {
  BASE_URL = 'http://baidu.org/test'
}

export { BASE_URL, TIME_OUT }
