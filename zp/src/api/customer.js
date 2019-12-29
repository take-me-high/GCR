/*
 * @Author: subx 
 * @Date: 2019-12-25 14:44:03 
 * @Last Modified by: subx
 * @Last Modified time: 2019-12-28 15:25:17
 */

import axios from '@/utils/axios';
/**
 * 通过id删除客服信息
 * @param {Object} param {id:''} 
 */
export function deleteCustomerServiceById(param) {
  return axios.post('/CustomerService/deleteById', param);
}
/**
 * 查找所有客服信息
 */
export function findAllCustomerService() {
  return axios.get('/CustomerService/findAll');
}
/**
 * 通过状态查找客服信息
 * @param {Object} param {city:''}
 */
export function findCustomerServiceByEducation(param) {
  return axios.get('/CustomerService/findByEducation', {
    params: param
  });
}
/**
 * 通过id查找客服信息
 * @param {Object} param {id:''}
 */
export function findCustomerServiceById(param) {
  return axios.get('/CustomerService/findById', {
    params: param
  });
}


/**
 * 通过性别查找客服信息
 * @param {Object} param {industry:''}
 */
export function findCustomerServiceByGender(param) {
  return axios.get('/CustomerService/findByGender', {
    params: param
  });
}
/**
 * 通过用户名查找客服信息
 * @param {Object} param {location:''}
 */
export function findCustomerServiceByUsername(param) {
  return axios.get('/CustomerService/findByUsername', {
    params: param
  });
}

/**
 * 通过省份查找客服信息
 * @param {Object} param {province:''}
 */
// export function findCustomerServiceByProvince(param) {
//   return axios.get('/CustomerService/findByProvince', {
//     params: param
//   });
// }
/**
 * 通过规模查找客服信息
 * @param {Object} param {scale:''}
 */
// export function findCustomerServiceByScale(param) {
//   return axios.get('/CustomerService/findByScale', {
//     params: param
//   });
// }
/**
 * 保存或更新客服信息
 * @param {Object} param
 */
export function saveOrUpdateCustomerService(param) {
  return axios.post('/CustomerService/saveOrUpdate', param);
}
