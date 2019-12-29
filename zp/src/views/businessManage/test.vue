/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lzb
 * @Last Modified time: 2019-12-27 18:24:32
 */
/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lzb
 * @Last Modified time: 2019-12-25 11:29:55
 */
<template>
  <div id="businessList">
    <div class="searchDiv">
      <el-select size="mini" v-model="province" clearable placeholder="省份">
        <el-option
          v-for="item in provinceData"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select size="mini" v-model="city" clearable placeholder="城市">
        <el-option v-for="item in cityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select size="mini" v-model="industry" clearable placeholder="行业">
        <el-option v-for="item in industryData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select size="mini" v-model="scale" clearable placeholder="规模">
        <el-option v-for="item in scaleData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="businessData2"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="contactName" label="联系人"></el-table-column>
        <el-table-column align="center" prop="industry" label="行业"></el-table-column>
        <el-table-column align="center" label="所在地">
          <template slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="toEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagi">
        <el-pagination 
        @current-change="currentChange"
        :current-page.sync="currentPage"
        size="mini"
        background
        layout="prev, pager, next"
        :total="businessData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { findAllProvince } from "@/api/province.js";
import { findAllCity } from "@/api/city.js";
import { findAllBusiness } from "@/api/business.js";
import config from "@/utils/config.js";
import axios from "axios";
import qs from "qs";

axios.defaults.baseURL="http://127.0.0.1:8899";
export default {
  data() {
    return {
      //省份
      province: "",
      //城市
      city: "",
      //行业
      industry: "",
      //规模
      scale: "",
      //省份数组
      provinceData: [],
      //城市数组
      cityData: [],
      //行业数组
      industryData: [],
      //规模数组
      scaleData: [],
      //商家数组
      businessData: [],
      //商家列表，表格数据
      businessList: [],
      //当前页
      currentPage:1,
    };
  },
  computed: {
    businessData2(){
      //current
      let temp = [...this.businessData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page-1)*pageSize,pageSize*page);
    }
  },
  methods: {
    currentChange(val){
      //val是当前点击的页数
      this.currentPage= val;
    },
    //查看
    toSee(row) {
      alert("查看");
    },
    //编辑
    toEdit(row) {
      alert("编辑");
    },
    //删除
    toDelete(id){
          //row代表当前要删除的city对象
          axios.post('/Business/deleteById',{id}).then((res)=>{
               this.$notify({
                 title: '成功',
                 message: '删除成功',
                 type: 'success'
        });
          })
      },

    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      console.log(val);
    },
    //查找所有省份信息
    async findAllPro() {
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找所有城市信息
    async findAllCi() {
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找所有的商家信息
    async findAllBus() {
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
        //行业数组
        let industryArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.industryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        //去重
        this.scaleData = [...new Set(scaleArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
  },
  created() {
    this.findAllPro();
    this.findAllCi();
    this.findAllBus();
  },
  mounted() {}
};
</script>
<style scoped>
.tableDiv {
  margin-top: 10px;
}
/*分页 */
.pagi{
  text-align: right;
  margin-top:10px;
}
</style>


    //查找求职者学历
    async findAllEdu() {
      try {
        let res = await findAllJobhunter();
        this.educationData = res.data;
       // this.currentPage = 1;
        //学历数组
        let educationArr = res.data.map((item)=>{
          return item.education;
        });
        //去重
        this.educationData = [...new Set(educationArr)];console.log(this.educationData);
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找求职者性别
    async findAllGen() {
      try {
        let res = await findAllJobhunter();
        this.genderData = res.data;
        //性别数组
        let genderArr = res.data.map((item)=>{
          return item.gender;
        });
        //去重
        this.genderData = [...new Set(genderArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },


          rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        realname: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        telephone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        birth: [
          { required: true, message: "请输入出生年月", trigger: "blur" }
        ],
        education: [
          { required: true, message: "请输入最高学历", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "请输入性别", trigger: "blur" }
        ],





        <!-- 修改模态框 -->
    <el-dialog title="修改求职者信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose">
      <el-form :model="currentBus" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="currentBus.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="realname" label="姓名" :label-width="formLabelWidth">
              <el-input v-model="currentBus.realname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="scale" label="公司规模" :label-width="formLabelWidth">
              <el-input v-model="currentBus.scale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="性别" :label-width="formLabelWidth">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="gender">
                    <el-select
                      clearable
                      @change="dialogProChange"
                      v-model="currentBus.gender"
                      placeholder="请选择省份"
                    >
                      <el-option
                        v-for="item in genderData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-form-item required label="最高学历" :label-width="formLabelWidth">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="education">
                    <el-select
                      clearable
                      @change="dialogProChange"
                      v-model="currentBus.education"
                      placeholder="请选择学历"
                    >
                      <el-option
                        v-for="item in educationData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>


    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.editVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.editVisible = false;
    },