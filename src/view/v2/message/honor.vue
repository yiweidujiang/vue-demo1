<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:honor:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新增荣誉</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="标题" width="240" prop="title"></el-table-column>
      <el-table-column label="图标" width="240">
        <template slot-scope="scope">
          <img v-if="scope.row.reserve3 == 1" src="@/assets/honor1.jpg" style="width:25px;height:25px;" alt="">
          <img v-if="scope.row.reserve3 == 2" src="@/assets/honor2.jpg" style="width:25px;height:25px;" alt="">
          <img v-if="scope.row.reserve3 == 3" src="@/assets/honor3.jpg" style="width:25px;height:25px;" alt="">
          <img v-if="scope.row.reserve3 == 4" src="@/assets/honor4.jpg" style="width:25px;height:25px;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="年级" width="240" prop="reserve1"></el-table-column>
      <el-table-column label="班级" width="240" prop="reserve2"></el-table-column>
      <el-table-column label="创建时间" width="240" prop="createTime"></el-table-column>
      <el-table-column
        v-if="hasPer('cms:honor:update') || hasPer('cms:honor:delete')  "
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:honor:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:honor:delete')"
            @click="deleteOne(scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      :title="add?'新增荣誉':'编辑荣誉'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="班级年级" prop="bjId">
            <!-- <el-button type="primary" @click="t1=!t1">Click</el-button>{{t1}} -->
            <el-input type="hidden" v-show="false" v-model="formData.bjId"></el-input>
           <v-select ref="selectA" v-if="add"  ></v-select>
          <v-select ref="selectA" v-else :selectData="{ xxNjxxId:this.formData.njId,xxBjxxId:this.formData.bjId}"></v-select>
        </el-form-item>
        <el-form-item label="图标" prop="reserve3">
            <el-radio v-model="formData.reserve3" label="1">
                <img src="@/assets/honor1.jpg" :style="{borderColor:formData.reserve3 == 1?'#18c9ff':''}"  class="radio1" alt="">
            </el-radio>
            <el-radio v-model="formData.reserve3" label="2">
                <img src="@/assets/honor2.jpg" :style="{borderColor:formData.reserve3 == 2?'#18c9ff':''}"  class="radio1" alt="">
            </el-radio>
            <el-radio v-model="formData.reserve3" label="3">
                <img src="@/assets/honor3.jpg" :style="{borderColor:formData.reserve3 == 3?'#18c9ff':''}"  class="radio1" alt="">
            </el-radio>
            <el-radio v-model="formData.reserve3" label="4">
                <img src="@/assets/honor4.jpg" :style="{borderColor:formData.reserve3 == 4?'#18c9ff':''}"  class="radio1" alt="">
            </el-radio>
        </el-form-item>
        <el-form-item>
          <el-button v-if="add" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-else type="primary" size="mini" @click="editForm('ruleForm')">提交</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { HonorList, HonorDelete,HonorAdd,HonorUpdate } from "@/api/v2";
import SelectSchool from '@/components/select'

import { constants } from 'fs';
import { setTimeout } from 'timers';
export default {
  name: "role",
  created() {
    this.getHonorList();
    
  },
  components:{
      'v-select':SelectSchool
  },
  data() {
    return {
        t1:true,
      add: true,
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      formData: {
        // 表单数据
        title: "",
        njId : '',
        bjId : '',
        reserve1:'',
        reserve2:'',
        reserve3:''
      },
      listA:null,
      rules: {
        //表单验证
         title: [{required:true,message: "不能为空", trigger: "blur"}],
        reserve3: [{required:true,message: "不能为空", trigger: "blur"}],
        bjId:[{required:true,message: "不能为空", trigger: "blur"}],
      },
      njId:''
    };
  },
  computed: {
     ...mapGetters([
         'organId'
     ])
  },
  methods: {
     
    // 新加数据
    submitForm(formName) {
       this.formData.njId = this.$refs['selectA'].value
       this.formData.bjId = this.$refs['selectA'].value2
       this.formData.xxId = this.organId
       this.formData.reserve1 =  this.$refs['selectA'].label1
       this.formData.reserve2 =  this.$refs['selectA'].label2
        console.log(this.formData)
    
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          HonorAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getHonorList({ limit: this.limit, offset: this.offset });
            this.resetForm(formName);
            this.add = true
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑表单
    editForm(formName) {
        if(this.$refs['selectA'].label2!=""){
            this.formData.njId = this.$refs['selectA'].value
            this.formData.bjId = this.$refs['selectA'].value2
            this.formData.xxId = this.organId
            this.formData.reserve1 = this.$refs['selectA'].label1
            this.formData.reserve2 = this.$refs['selectA'].label2
        }
        this.$refs[formName].validate(valid => {
            if (valid) {
            // 更新用户信息
            HonorUpdate(this.formData).then(res => {
                this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
                });
                this.dialogVisible = false;
                this.getHonorList({ limit: this.limit, offset: this.offset });
                this.resetForm(formName);
            });
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    },
    resetForm(formName) {
     this.$refs[formName].resetFields();
     
    },
    // // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
      this.add = false;
      setTimeout(()=>{
        this.add = true;
      },500)
      this.resetForm("ruleForm");
      this.getHonorList()
    },

    // 获取列表
    getHonorList() {
      let data = { limit: this.limit, offset: this.offset };
      HonorList(data).then(res => {
         
        if(res.data){
            let data = res.data.rows;
            this.tableData = data;
            this.total = res.data.total;
        }
        
      });
    },
    
  

    //编辑一个
    editOne(e) {
        this.add = false;
        this.dialogVisible = true;
        this.formData = e
    },

    // 删除口号
    deleteOne(e) {
        console.log(e)
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            HonorDelete(data).then(res => {
                console.log(res)
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getHonorList();
                }
              });
            });
          }
        }
      });
    },

    //分页
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.offset = val;
    }
  },
  watch: {
    limit(res) {
      this.getHonorList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getHonorList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
    .el-radio__label img{
        width:100px;height:100px;
        border: 1px solid #ddd;
    }
    .el-radio__input{
        display: none;
    }
</style>
