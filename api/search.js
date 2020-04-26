import request from '@/utils/request'
const group_name = 'search';
const api_name = 'articleES';
export default {
  search(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/${page}/${size}`,
      method: 'put',
      data: searchMap
    })
  }
}
