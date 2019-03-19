<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:inspectionNotice:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新增通报</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="通报类型" width="240" prop="noticeTypeName"></el-table-column>
      <el-table-column label="通报内容" width="240" prop="content"></el-table-column>
      <el-table-column label="得分" width="240">
        <template slot-scope='scope'>
          <span v-if="scope.row.result > 0" style="color:#1C84C6" v-text="scope.row.result"></span>
          <span v-else style="color:#ED5565" v-text="scope.row.result"></span>
        </template>
      </el-table-column>
      <el-table-column label="年级" width="240" prop="reserve1"></el-table-column>
      <el-table-column label="班级" width="240" prop="reserve2"></el-table-column>
      <el-table-column label="创建时间" width="240" prop="createTime"></el-table-column>
      <el-table-column
        v-if="hasPer('cms:inspectionNotice:update') || hasPer('cms:inspectionNotice:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:inspectionNotice:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:inspectionNotice:delete')"
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
      :title="add?'新增通报':'编辑通报'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="通报类型" prop="noticeType">
            <el-input type="hidden" v-show="false" v-model="formData.noticeType"></el-input>
          <el-select v-model="formData.noticeType">
              <el-option
                v-for="(item,index) in noticeTypeList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级年级" prop="bjId">
            <!-- <el-button type="primary" @click="t1=!t1">Click</el-button>{{t1}} -->
            <el-input type="hidden" v-show="false" v-model="formData.bjId"></el-input>
           <v-select ref="selectA" v-if="add"  ></v-select>
          <v-select ref="selectA" v-else :selectData="{ xxNjxxId:this.formData.njId,xxBjxxId:this.formData.bjId}"></v-select>
        </el-form-item>
        <el-form-item label="通报内容" prop="content">
            <el-input v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="得分" prop="result">
            <el-input-number v-model="formData.result" :min="-5" :max="5"></el-input-number>
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
import { BriefingList, BriefingDelete,BriefingAdd,BriefingUpdate } from "@/api/v2";
import SelectSchool from '@/components/select'
import { constants } from 'fs';
export default {
  name: "role",
  created() {
    this.getBriefingList();
    
  },
  components:{
      'v-select':SelectSchool
  },
  data() {
    return {
        t1:true,
        t2:true,
      add: true,
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      formData: {
        // 表单数据
        noticeType: "",
        content:'',
        result:'',
        njId : '',
        bjId : '',
        reserve1:'',
        reserve2:''
      },
      noticeTypeList:[
          {id:'1',name:'卫生'},
          {id:'2',name:'纪律'},
          {id:'3',name:'其他'}
      ],
      rules: {
        //表单验证
        noticeType: [{required:true,message: "不能为空", trigger: "blur"}],
        content:[{required:true,message: "不能为空", trigger: "blur"}],
        result:[{required:true,message: "不能为空", trigger: "blur"}],
        bjId:[{required:true,message: "不能为空", trigger: "blur"}]
      },
      njId:'',
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
          console.log(1111111)
          BriefingAdd(this.formData).then(res => {
              console.log(222222)
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getBriefingList({ limit: this.limit, offset: this.offset });
            this.resetForm(formName);
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
            BriefingUpdate(this.formData).then(res => {
                this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
                });
                this.dialogVisible = false;
                this.getBriefingList({ limit: this.limit, offset: this.offset });
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
      this.add = true;
      //this.t2 = false
      this.resetForm("ruleForm");
      this.getBriefingList()
    },

    // 获取列表
    getBriefingList() {
      let data = { limit: this.limit, offset: this.offset };
      BriefingList(data).then(res => {
         
        if(res.data){
            let data = res.data.rows;
            data.map(item=>{
                if(item.noticeType == 1){
                    item.noticeTypeName = '纪律'
                } else if(item.noticeType == 2) {
                    item.noticeTypeName = '卫生'
                } else {
                    item.noticeTypeName = '其他'
                }
            })
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
    deleteOne(e) {
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            BriefingDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getBriefingList();
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
      this.getBriefingList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getBriefingList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
