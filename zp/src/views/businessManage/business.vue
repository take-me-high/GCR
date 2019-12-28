/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: dell
 * @Last Modified time: 2019-12-27 17:03:17
 */
<template>
    
    <div id="businessList">
      <div class="searchDiv">
    <el-select v-model="province" placeholder="省份" @change="provinceChange" clearable>
    <el-option v-for="item in ProvinceData" :key="item.value" :label="item.province" :value="item.name"></el-option>
    </el-select>
    <el-select v-model="city" placeholder="城市" @change="cityChange" clearable>
    <el-option v-for="item in CityData" :key="item.value" :label="item.city" :value="item.name"></el-option>
    </el-select>
    <el-select v-model="industry" placeholder="行业" @change="industryChange" clearable>
    <el-option v-for="item in IndustryData" :key="item.value" :label="item.industry" :value="item"></el-option>
    </el-select>
    <el-select v-model="scale" placeholder="规模" @change="scaleChange" clearable>
    <el-option v-for="item in ScaleData" :key="item.value" :label="item.scale" :value="item"></el-option>
    </el-select></div>

  <div class="footable">
  <el-table ref="multipleTable" :data="businessPage" tooltip-effect="dark" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="公司名称" ><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>   
    <el-table-column prop="contactName" label="联系人"></el-table-column>
    <el-table-column prop="contactPhone" label="联系方式"></el-table-column>
    <el-table-column prop="industry" label="行业"></el-table-column>
    <el-table-column label="所在地"><template slot-scope="scope">{{ scope.row.province }}--{{scope.row.city}}</template></el-table-column>
    <el-table-column prop="scale" label="公司规模"></el-table-column>
    <el-table-column label="详情"><template slot-scope="scope">
      <el-button @click="toSee(scope.row)" type="primary" size="small" icon="el-icon-info">查看</el-button></template></el-table-column>
    <el-table-column label="操作" show-overflow-tooltip><template slot-scope="scope">
        <el-button @click="open(scope.row.id)" type="primary" size="small" icon="el-icon-delete">删除</el-button>
        <el-button @click="toEdit(scope.row)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
      </template>
    </el-table-column>  
  </el-table>
  </div>
  
  <div class="btnDiv" style="float:left">
    <el-button type="danger" icon="el-icon-delete" @click="toDeleteMore">批量删除</el-button>
  </div>
  <div class="pagDiv" style="float:right">
    <el-pagination @current-change="currentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="businessData.length*2"></el-pagination>
  </div>

  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible"  >
  <el-form :model="business" :rules="rules" ref="business">
    <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="business.name" ></el-input>
      </el-form-item>
          </el-col>
          <el-col :span="10">
     <el-form-item label="联系人" :label-width="formLabelWidth" prop="contactName">
      <el-input v-model="business.contactName" ></el-input>
      </el-form-item>
          </el-col>
        </el-row>


      <el-row :gutter="20" >
          <el-col :span="10">
            <el-form-item label="联系电话" :label-width="formLabelWidth" prop="contactPhone">
              <el-input v-model="business.contactPhone" ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="10">
          <el-form-item label="所属行业" :label-width="formLabelWidth" prop="industry"> 
              <el-input v-model="business.industry"></el-input>
          </el-form-item>
          </el-col>
        </el-row>

      <el-row :gutter="20" >
          <el-col :span="10">
              <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city">
                <el-row>
                  <el-col :span="12" prop="province">
                <el-select v-model="business.province" @change="tocity">
                    <el-option v-for="(item,index) in ProvinceData" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="12" prop="city">
                <el-select v-model="business.city" >
                    <el-option v-for="(item,index) in citybyprovince" :key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-col>
            </el-row>
          </el-form-item>
      </el-col>
      <el-col :span="10">
          <el-form-item label="公司规模" :label-width="formLabelWidth" prop="scale">
        <el-select v-model="business.scale">
          <el-option label="100-200" value="100-200"></el-option>
          <el-option label="200-400" value="200-400"></el-option>
          <el-option label="400-600" value="400-600"></el-option>
          <el-option label="600-800" value="600-800"></el-option>
          <el-option label="800-1000" value="800-1000"></el-option>
          <el-option label=">1000" value=">1000"></el-option>
        </el-select>
        </el-form-item>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="location">
          <el-input v-model="business.location"></el-input>
          </el-form-item>
        </el-col>
    </el-row>
     
     <el-row :gutter="20">
        <el-col :span="20">
    <el-form-item label="详细信息" :label-width="formLabelWidth" prop="description">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"  v-model="business.description"></el-input>
    </el-form-item>
    </el-col>
    </el-row>
  </el-form>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="toCancel('business')">取 消</el-button>
    <el-button type="primary" @click="toSave('business')" >确 定</el-button>
  </div>
  </el-dialog>

  <!-- 查看模态框 -->
    <el-dialog :title="business.name" :visible.sync="visiable">
      <div class="seeDiv">
        <span>行业类型：</span>
        {{business.industry}}
      </div>
      <div class="seeDiv">
        <span>成立时间：</span>
        {{business.establishedTime}}
      </div>
      <div class="seeDiv">
        <span>注册资本：</span>
        {{business.registeredCapital}}
      </div>
      <div class="seeDiv">
        <span>公司规模：</span>
        {{business.scale}}
      </div>
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{business.description}}</div>
      <div class="imgDiv">
        <a :href="business.businessLicense" target="_blank">
          <img :src="business.businessLicense" alt width="200" height="150" />
        </a>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import {findAllProvince,findProvinceById} from "@/api/province.js";
import config from "@/utils/config.js";
import {findAllCity,findCityByProvince} from "@/api/city.js"
import {findAllBusiness,findBusinessByProvince,saveOrUpdateBusiness,deleteBusinessById,findBussinessByCity,findBusinessByIndustry,findBusinessByScale} from "@/api/business.js"
//设置基础路径
export default {
  data() {
    return {
      //所有商家数据
      businessData:[],
      //省份数据
      ProvinceData:[],
      //城市数据
      CityData:[],
      //商家行业
      IndustryData:[],
      //商家规模
      ScaleData:[],
      citybyprovince:[],
      provinceid:'',
      province:'',
      city:'',
      industry:'',
      scale:'',
      currentPage:1,
      dialogFormVisible: false,
      dialogTitle:'',
      formLabelWidth:'180px',
      visiable:false,
      able:"display:none",
      hideen:"display:block",
      chickiable:true,
      business:{
        id:'',
        contactName:'',
        contactPhone:'',
        industry:'',
        location:'',
        province:'',
        city:'',
        name:'',
        scale:'',
        establishedTime:'',
        registeredCapital:'',
        description:'',
        businessLicense:'',
        status:'',
      },
      multipleSelection: [],
        rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          ],
          contactPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          industry: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          scale: [
            { required: true, message: '请选择规模', trigger: 'change' }
          ],
          location: [
            { required: true, message: '请填写所在地', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }; 
      
  },
  computed: {
    businessPage(){
          let temp = [...this.businessData];
          //截取数组
          let pageSize = 5;
          let page = this.currentPage;
          return temp.slice((page-1)*pageSize,page*pageSize);//开始位置，结束位置（不包括结束位置）
      },
  },
  methods: {
    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["business"].resetFields();
      this.dialogFormVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } 
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
        let res = val.map((item)=>{
            return item.id;
        });
        this.multipleSelection = res;
    },
    toDeleteMore(){
      let ids = this.multipleSelection;
      if(ids.length > 0)
      {
          this.$confirm('此操作将永久删除这些信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          ids.forEach((id)=>{
            this.toDelete(id);
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      else
      {
        this.$message({
          message: '请选择要删除的信息',
          type: 'warning'
        });
      }
    },
    open(id) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.toDelete(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    //改变省份
    async provinceChange(val){
      try{
        if(this.province != '')
        {
          let res = await findBusinessByProvince({province:val});
        this.city='',
        this.industry='',
        this.scale='',
        this.businessData = res.data;
        this.currentPage=1;
        }
        else{
          this.init();
        }
      }
      catch(error){
        config.errorMsg(this,'通过省份查找错误')
      }
    },
    async cityChange(val){
      try{
        if(this.city !=''){
        let res = await findBussinessByCity({city:val});
        this.province='',
        this.industry='',
        this.scale='',
        this.businessData = res.data;
        this.currentPage=1;
        }
        else{
          this.init();
        }
      }
      catch(error){
        config.errorMsg(this,'通过城市查找错误')
      }
    },
    async scaleChange(val){
      try{
        if(this.scale !=''){
        let res = await findBusinessByScale({scale:val});
        this.province='',
        this.city='',
        this.industry='',
        this.businessData = res.data;
        this.currentPage=1;
        }
        else{
          this.init();
        }
      }
      catch(error){
        config.errorMsg(this,'通过规模查找错误')
      }
    },
    async industryChange(val){
      try{
        if(this.industry !=''){
        let res = await findBusinessByIndustry({industry:val});
        this.province='',
        this.city='',
        this.scale='',
        this.businessData = res.data;
        this.currentPage=1;
        }
        else{
          this.init();
        }
      }
      catch(error){
        config.errorMsg(this,'通过行业查找错误')
      }
    },
    async init(){
      try{
        let res = await findAllBusiness();
        this.businessData = res.data;
        //行业数组
        let industryArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.IndustryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        //去重
        this.ScaleData = [...new Set(scaleArr)];
        }
        catch(error){
          config.errorMsg(this,'查找错误')
      } 
    },
    //省份对应城市
    async tocity(id){
      this.business.city='';
      try{
        let res = await findCityByProvince({provinceId:id});
        this.citybyprovince = res.data;
      }
      catch(error){
        config.errorMsg(this,'通过id查找错误')
      }
    },
    toSee(row){
      this.business={...row};
      this.visiable=true;
    },
    toEdit(row){
      this.business={...row};
      this.visiable=false,
      this.able='display:none',
      this.hideen='display:block',
      this.dialogTitle='编辑商家信息';
      this.dialogFormVisible=true;
    },
    async toSave(formName){
        this.$refs[formName].validate(async valid => {
          if (valid) {
          //通过验证
            let province = this.business.province;
          // console.log(province);
          // console.log(typeof province);
          // console.log(+province);    NaN  8
          //如果省份发生更改
            if (+province) {
            //将省份id处理为省份名字，过滤省份数组
              let result = this.ProvinceData.filter(item => {
                return item.id === +province;
                })[0];
            // result 是省份对象
              this.business.province = result.name;
              }
            try{             
                await saveOrUpdateBusiness(this.business);
                config.successMsg(this,'修改成功')
                this.dialogFormVisible=false;
                this.init();
                }
            catch(error){
              config.errorMsg(this,'修改失败');
                }
        }
        else {
          console.log("error submit!!");
          return false;
            }
        });
    },
    async toDelete(id){
      try{
        await deleteBusinessById({id:id});
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.init();
        }
        catch(error){
          config.errorMsg(this,'删除失败')
      }
    },
    
    currentChange(val){
        this.currentPage=val;      
      },
    async findAllPro(){
      try{
        let res = await findAllProvince();
        this.ProvinceData = res.data;
        }
        catch(error){
          config.errorMsg(this,'查找错误')
      }
    },
    async findCity(){
      try{
        let res = await findAllCity();
        this.CityData = res.data;
        }
        catch(error){
          config.errorMsg(this,'查找错误')
      }
    }
  },
  created() {
    this.init();
    this.findAllPro();
    this.findCity();
    
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .imgDiv {
  text-align: center;
}
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  font-weight: bold;
  span {
    color: #777;
  }
}
.descDiv {
  font-weight: bold;
  color: #777;
  font-size: 16px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
</style>