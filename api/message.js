import request from '@/utils/request'

const group_name = 'user';
const api_name = 'message';
export default {
  getUnRead() {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'get'
    })
  },
  getMessage(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })
  },
  hasRead(id) {
    return request({
      url: `/${group_name}/${api_name}/read/${id}`,
      method: 'get'
    })
  },
}
