/*
 * @Author: liuyr 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: dell
 * @Last Modified time: 2019-12-27 11:11:26
 */
import axios from '@/utils/axios'
/* 查找数据 */
export function findAllCity() {
  return axios.get('/City/findAll');
}
/**
 * 
 * @param {Object} param {provinceId:''}
 */
export function findCityByProvince(param){
  return axios.get('/City/findByProvinceId',{params:param});
}