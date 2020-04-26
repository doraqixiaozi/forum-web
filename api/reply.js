import request from '@/utils/request';
import search from "./search";

const group_name = 'qa';
const api_name = 'reply';

export default {
  search(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  searchByProblemId(page, size, id) {
    let searchMap = {problemid: id};
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  delete(item) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'put',
      data:item
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
