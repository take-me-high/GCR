/*
 * @Author: dell 
 *
 * @Date: 2019-12-25 09:02:56 
 * @Last Modified by: dell
 * @Last Modified time: 2019-12-26 10:52:03
 */
import axios from "@/utils/axios";

/**
 * 根据id删除商家
 * @param {Object} param {id:''}
 */
export function deleteBusinessById(param){
    return axios.post('/Business/deleteById',param);
}
/**
 * 查找所有商家信息
 */
export function findAllBusiness(){
    return axios.get('/Business/findAll');
}
/**
 * 查找所有商家信息
 * @param {Object} param {id:''}
 */
export function findBusinessById(param){
    return axios.get('/Business/findById',param);
}
/**
 * 根据城市查找商家
 * @param {Object} param {city:''}
 */
export function findBussinessByCity(param){
    return axios.get('/Business/findByCity',{params:param});
}
/**
 *根据位置查找商家
 * @param {Object} param {location:''}
 */
export function findBusinessByLocation(param){
    return axios.get('/Business/findByLocation',{params:param});
}
/**
 *根据行业类型查找商家
 * @param {Object} param {industry:''}
 */
export function findBusinessByIndustry(param){
    return axios.get('/Business/findByIndustry',{params:param});
}
/**
 *根据省份查找商家
 *@param {Object} param {province:''}
 */
export function findBusinessByProvince(param){
    return axios.get('/Business/findByProvince',{params:param});
}
/**
 *根据规模查找商家
 *@param {Object} param {province:''}
 */
export function findBusinessByScale(param){
    return axios.get('/Business/findByScale',{params:param});
}
/**
 * 新增或修改商家信息
 * @param {Object} param
 */
export function saveOrUpdateBusiness(param){
    return axios.post('/Business/saveOrUpdate',param);
}