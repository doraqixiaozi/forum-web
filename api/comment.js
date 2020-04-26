import request from '@/utils/request'

const group_name = 'article';
const api_name = 'comment';
export default {
  search(articleId, page, size) {
    return request({
      url: `/${group_name}/${api_name}/${articleId}/${page}/${size}`,
      method: 'get'
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'delete'
    })
  }
}
