/*
 * @Author: liuyr 
 * 用户管理页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: lzb
 * @Last Modified time: 2019-12-26 19:57:52
 */
<template>
  
<div style="margin-top: 15px;">
    <el-select v-model="select" placeholder="请选择" style="width:10%">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width:10%"></el-input>
    <el-button icon="el-icon-search"></el-button> 
</div>

   
</template>

<script>
import config from "@/utils/config.js";
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL="http://127.0.0.1:8899";
export default {
  name: "userManage",
  data() {
    return {
      activeName: "user",
      //学历
      education:'',
      //学历数组
      educationData:[],
      //性别
      gender:'',
      //性别数组
      genderData:[],
      //求职者数组
      jobhunterData:[],
    };
  },
  methods: {
    
  },
  created() {
  },  
};
</script>
<style lang="scss" scoped>
</style>
