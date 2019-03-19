<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:eduNotice:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新增通知</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="标题" width="240" prop="title"></el-table-column>
      <el-table-column label="副标题" width="240" prop="subTitle"></el-table-column>
      <el-table-column label="内容" width="240" prop="content"></el-table-column>
      <el-table-column label="状态" width="240">
        <template slot-scope="scope"> 
          <span v-if="new Date(scope.row.overTime).getTime() > new Date().getTime()" style="color:#1C84C6">正常</span>
          <span v-else style="color:#ED5565">过期</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="240" prop="ctime"></el-table-column>
      <el-table-column
        v-if="hasPer('cms:eduNotice:update') || hasPer('cms:eduNotice:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:eduNotice:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:eduNotice:delete')"
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
      :title="add?'新加通知':'编辑通知'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle">
            <el-input v-model="formData.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <el-input v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="nj">
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(item,index) in ClassList" :key="index" :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发布日期" prop="publishTime">
          <el-date-picker
            v-model="formData.publishTime"
            type="date"
            placeholder="请选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions0"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布天数" prop="lastDay">
          <el-input v-model="formData.lastDay"></el-input>
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
import { CompanyList, CompanyDelete,CompanyAdd,CompanyUpdate } from "@/api/v2";
import SelectSchool from "@/components/select"
import { constants } from 'fs';
export default {
  name: "company",
  created() {
    this.getCompanyList();
    
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
      pickerOptions0:{
        disabledDate(time){
          return time.getTime() < Date.now() - 8.64e7
        } 
      },
      formData: {
        // 表单数据
        title: "",
        subTitle : '',
        content : '',
        publishTime: '',
        nj:'',
        lastDay:''
      },
      listA:null,
      rules: {
        //表单验证
        title: [{required:true,message: "不能为空", trigger: "blur"}],
        subTitle:[{required:true,message: "不能为空", trigger: "blur"}],
        content:[{required:true,message: "不能为空", trigger: "blur"}],
        publishTime:[{required:true,message: "不能为空", trigger: "blur"}],
        nj:[{required:true,message: "不能为空", trigger: "blur"}],
        lastDay:[{required:true,message: "不能为空", trigger: "blur"}]
      },
      njId:'',
      ClassList:[
          {id:11,name:'一年级'},
          {id:12,name:'二年级'},
          {id:13,name:'三年级'},
          {id:14,name:'四年级'},
          {id:15,name:'五年级'},
          {id:16,name:'六年级'},
          {id:17,name:'七年级'},
          {id:18,name:'八年级'},
          {id:19,name:'九年级'}
      ],
      checkList:[]
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
      this.formData.pubType = 1   
      this.formData.nj = this.checkList.join(',')
      console.log(this.formData)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          CompanyAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getCompanyList({ limit: this.limit, offset: this.offset });
            this.resetForm(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑一个
    editOne(e) {
        this.add = false;
        this.dialogVisible = true;
        this.formData = e
        let check = this.formData.nj.split(',').map(item=> Number(item))
        this.checkList = check
    },
    // 编辑表单
    editForm(formName) {
        this.formData.nj = this.checkList.join(',')
        
        this.$refs[formName].validate(valid => {
            if (valid) {
            // 更新用户信息
            console.log(this.formData)
            CompanyUpdate(this.formData).then(res => {
                this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
                });
                this.dialogVisible = false;
                this.getCompanyList({ limit: this.limit, offset: this.offset });
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
     this.checkList = []
    },
    // // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
      this.add = false;
      setTimeout(()=>{
        this.add = true;
      },500)
      this.resetForm("ruleForm");
      this.getCompanyList()
      this.checkList = []
    },

    // 获取列表
    getCompanyList() {
      let data = { limit: this.limit, offset: this.offset };
      CompanyList(data).then(res => {
         
        if(res.data){
            let data = res.data.rows;
            this.tableData = data;
            this.total = res.data.total;
            
        }
        
      });
    },

    // 删除
    deleteOne(e) {
      let data = { id: e.id };

      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            CompanyDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getCompanyList();
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
      this.getCompanyList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getCompanyList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
