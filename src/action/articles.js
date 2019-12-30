// 专门放置文章请求的
// 获取文章
import request from '../utils/request' // 这里就是axios请求

import { URL_ARTICLES, URL_CHANNELS } from '../constant/url' // 把地址解构出来

export function getArticles (params) { // 直接倒出函数   在这里面去处理请求
  return request({
    url: URL_ARTICLES,
    params
  })
}
export function getChannels () {
  return request({
    url: URL_CHANNELS
  })
}
