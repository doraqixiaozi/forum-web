import request from '@/utils/request';

const group_name = 'qa';
const api_name = 'problem';
export default {
  list(page, size, map) {
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: map
    })
  },
  searchOrderByCreateTime(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  searchOrderByReplyTime(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/search/new/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  searchOrderByReply(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/search/hot/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  thumb(id) {
    return request({
      url: `/${group_name}/${api_name}/thumbup/${id}`,
      method: 'put'
    })
  },
  findById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  }
}
