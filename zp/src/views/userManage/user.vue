/*
 * @Author: liuyr 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lzb
 * @Last Modified time: 2019-12-28 10:08:35
 */
<template>
  <div id="jobhunterList">
    <div class="searchDiv">
      <el-select @change="educationChange" v-model="education" clearable placeholder="学历">
        <el-option
        v-for="item in educationData"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
        </el-select>
        <el-select @change="genderChange" v-model="gender" clearable placeholder="性别">
        <el-option
        v-for="item in genderData"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
        </el-select>
        <div style="float:right">
          <div>
          <el-select v-model="select" clearable placeholder="关键字" style="width:30%">
            <el-option label="用户名" value="username" ></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="手机号" value="3"></el-option>
            <el-option label="出生年月" value="2"></el-option>
          </el-select>
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width:55%"></el-input>
          <el-button icon="el-icon-search" @change="usernameChange"></el-button> 
      </div>
      </div>
    </div>
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="jobhunterList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="realname" label="姓名"></el-table-column>
        <el-table-column align="center" prop="telephone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="gender" label="性别"></el-table-column>
        <el-table-column align="center" prop="birth" label="出生年月"></el-table-column>
        <el-table-column align="center" prop="education" label="最高学历"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="toEdit(scope.row)" size="small">修改</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="jobhunterData.length"
        ></el-pagination>
      </div>
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
            <el-form-item prop="telephone" label="手机号" :label-width="formLabelWidth">
              <el-input v-model="currentBus.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="birth" label="出生年月" :label-width="formLabelWidth">
              <el-input v-model="currentBus.birth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item required label="性别" :label-width="formLabelWidth">
                  <el-form-item prop="gender">
                    <el-select
                      clearable
                      v-model="currentBus.gender"
                      placeholder="请选择性别"
                    >
                      <el-option
                        v-for="item in genderData"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item required label="最高学历" :label-width="formLabelWidth">
                  <el-form-item prop="education">
                    <el-select
                      clearable
                      v-model="currentBus.education"
                      placeholder="请选择学历"
                    >
                      <el-option
                        v-for="item in educationData"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  </el-form-item>
                </el-col>
        </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
import {
 deleteJobhunterById,findAllJobhunter,findJobhunterByEducation,
findJobhunterByGender,findJobhunterById,findJobhunterByTelephone,
findJobhunterByUsername,JobhunterquickRegistration,saveOrUpdateJobhunter } from "@/api/user.js";
import config from "@/utils/config.js";
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL="http://127.0.0.1:8899";
export default {
  data() {
    return {
      activeName: "user",
      //求职者数组
      jobhunterData:[],
      // jobhunterList:[],
      //学历
      education:'',
      //学历数组
      educationData:[],
      //性别
      gender:'',
      //性别数组
      genderData:[],
      //用户名
      username:'',
      //用户名数组
      usernameData:[],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,
      //选择关键字
      select:'',
      //输入关键字
      input3:'',
      //当前修改的对象
      currentBus: {},
      //修改模态框标题名称所占宽度
      formLabelWidth: "80px",
      //修改模态框显示与否
      editVisible: false,
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
        ],}
    };
  },
  computed: {
    //分页数据
    jobhunterList(){
      let temp = [...this.jobhunterData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
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
    //保存
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.currentBus);
            if (res.status === 200) {
              this.findAllUser();
              this.editVisible = false;
              config.successMsg(this, "修改成功");
            } else {
              config.errorMsg(this, "修改失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "修改失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑
    toEdit(row) {
      this.currentBus = { ...row };
      this.editVisible = true;
    },
    //删除
    toDelete(id) {
      // alert("删除");
      console.log(id);
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteJobhunterById({ id:id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllUser();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //学历发生改变
    async educationChange(val) {
      this.gender = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findJobhunterByEducation({ education: val });
          this.jobhunterData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过学历查找求职者信息错误");
        }
      } else {
        this.findAllUser();
      }
    },
    //性别发生改变
    async genderChange(val) {
      this.education = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findJobhunterByGender({ gender: val });
          this.jobhunterData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过性别查找求职者信息错误");
        }
      } else {
        this.findAllUser();
      }
    },
     //用户名发生改变
    async usernameChange(val) {
      //val 是option的value值
      if (val) {
        try {
          let res = await findJobhunterByUsername({ username: val });
          this.jobhunterData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过用户名查找求职者信息错误");
        }
      } else {
        this.findAllUser();
      }
    },
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },

    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    //查找所有信息
    async findAllUser() {
      try {
        let res = await findAllJobhunter();
        this.jobhunterData = res.data;
        //学历数组
        let educationArr = res.data.map((item)=>{
          return item.education;
        });
        //去重
        this.educationData = [...new Set(educationArr)];
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
    //通过用户名查找求职者
    async findAllname() {
      try {
        let res = await findAllJobhunter();
        this.jobhunterData = res.data;
        //用户名数组
        let usernameArr = res.data.map((item)=>{
          return item.username;
        });
        //去重
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
  },
  created() {
    this.findAllUser();
    this.findAllname()
  },
  mounted() {}
};
</script>
<style scoped>
.tableDiv {
  margin-top: 10px;
}
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
}
.dialog-footer {
  text-align: center;
  margin-top: -30px;
}
.pageDiv {
    float: right;
    overflow: hidden;
    margin-top: 10px;
  }
</style>
