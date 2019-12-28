import axios from "@/utils/axios";
/**
 * 根据id删除城市信息
 * @param {Object} param {id:''}
 */
export function deleteProvinceById(param){
    return axios.post('/Province/deleteById',{params:param});
}
/**
 * 查询所有城市
 */
export function findAllProvince(){
    return axios.get('/Province/findAll');
}
/**
 * 根据id查询城市
 * @param {Object} param {id:''}
 */
export function findProvinceById(param){
    return axios.get('/Province/findById',{params:param});
}
/**
 * 新增或修改城市信息
 * @param {Object} param
 */
export function saveOrUpdateProvince(param){
    return axios.post('/Province/saveOrUpdate',param);
}