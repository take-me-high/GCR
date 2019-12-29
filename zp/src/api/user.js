/*
 * @Author: lzb 
 * @Date: 2019-12-26 15:05:56 
 * @Last Modified by: dell
 * @Last Modified time: 2019-12-28 15:30:06
 */
import axios from "@/utils/axios";
/**
 * 根据id删除求职者
 * @param {Object} param {id:''} 
 */
export function deleteJobhunterById(param){
  return axios.post('/Jobhunter/deleteById',param);
}
/**
 * 查询所有求职者接口
 */
export function findAllJobhunter() {
  return axios.get('/Jobhunter/findAll');
}
/**
 * 根据学历查找求职者
 * @param {Object} param {id:''}
 */
export function findJobhunterByEducation(param) {
  return axios.get('/Jobhunter/findByEducation', {
    params: param
  });
}
/**
 * 根据性别查找求职者
 * @param {Object} param {provinceId:''}
 */
export function findJobhunterByGender(param) {
  return axios.get('/Jobhunter/findByGender', {
    params: param
  });
}
/**
 * 根据id查询求职者
 * @param {Object} param {id:''}
 */
export function findJobhunterById(param) {
  return axios.get('/Jobhunter/findById', {
    params: param
  });
}
/**
 * 根据手机号查找求职者
 */
export function findJobhunterByTelephone(param) {
    return axios.get('/Jobhunter/findByTelephone',{params:param});
  }
  /**
   * 根据用户名查找求职者
   * @param {Object} param {id:''}
   */
  export function findJobhunterByUsername(param) {
    return axios.get('/Jobhunter/findByUsername', {
      params: param
    });
  }
  /**
   * 快速注册&报名
   * @param {Object} param {provinceId:''}
   */
  export function JobhunterquickRegistration(param) {
    return axios.post('/Jobhunter/quickRegistration', param);
  }
  /**
   * 新增或修改求职者信息
   * @param {Object} param
   */
  export function saveOrUpdateJobhunter(param) {
    return axios.post('/Jobhunter/saveOrUpdate', param);
  }