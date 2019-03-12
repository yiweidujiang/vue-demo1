<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:slogans:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加口号</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="口号" width="240" prop="slogans"></el-table-column>
      <el-table-column label="年级" width="240" prop="reserve1"></el-table-column>
      <el-table-column label="班级" width="240" prop="reserve2"></el-table-column>
      <el-table-column label="状态" width="240" prop="status"></el-table-column>
      <el-table-column label="创建时间" width="240" prop="createTime"></el-table-column>
      <el-table-column
        v-if="hasPer('cms:slogans:update') || hasPer('cms:slogans:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:slogans:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:slogans:delete')"
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
      :title="add?'新加口号':'编辑口号'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="口号" prop="slogans">
          <el-input v-model="formData.slogans"></el-input>
        </el-form-item>
        <el-form-item label="班级年级" prop="bjId">
            <!-- <el-button type="primary" @click="t1=!t1">Click</el-button>{{t1}} -->
            <el-input type="hidden" v-show="false" v-model="formData.bjId"></el-input>
           <v-select ref="selectA" v-if="add"  ></v-select>
          <v-select ref="selectA" v-else :selectData="{ xxNjxxId:this.formData.njId,xxBjxxId:this.formData.bjId}"></v-select>
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
import { SlognsList, SlognsDelete,SlognsAdd,SlognsUpdate } from "@/api/v2";
import SelectSchool from '@/components/select'
import { constants } from 'fs';
export default {
  name: "role",
  created() {
    this.getSlognsList();
    
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
        slogans: "",
        njId : '',
        bjId : '',
        status: 1
      },
      listA:null,
      rules: {
        //表单验证
        slogans: [{required:true,message: "不能为空", trigger: "blur"}],
        bjId:[{required:true,message: "不能为空", trigger: "blur"}],
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
        console.log(this.$refs['selectA'])
       this.formData.njId = this.$refs['selectA'].value
       this.formData.bjId = this.$refs['selectA'].value2
       this.formData.xxId = this.organId

        // SlognsAdd(this.formData).then(res=>{
        //     console.log(res)
        // })
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          console.log(1111111)
          SlognsAdd(this.formData).then(res => {
              console.log(222222)
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getSlognsList({ limit: this.limit, offset: this.offset });
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
        this.formData.njId = this.$refs['selectA'].value
        this.formData.bjId = this.$refs['selectA'].value2
        this.formData.xxId = this.organId
        this.$refs[formName].validate(valid => {
            if (valid) {
            // 新加用户
            SlognsUpdate(this.formData.id, this.formData).then(res => {
                this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
                });
                this.dialogVisible = false;
                this.getSlognsList({ limit: this.limit, offset: this.offset });
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
      this.resetForm("ruleForm");
      this.getSlognsList()
    },

    getSlognsList() {
      let data = { limit: this.limit, offset: this.offset };
      SlognsList(data).then(res => {
         
        if(res.data){
            let data = res.data.rows;
            this.tableData = data;
            this.total = res.data.total;
        }
        
      });
    },
    
    getSlognsUpdate(e){
        SlognsUpdate(e).then(res=>{
            this.formData = res
        })
    },

  

    //编辑一个
    editOne(e) {
        this.add = false;
        this.dialogVisible = true;
        this.formData = e
        // this.getSlognsUpdate(e)
    },
    deleteOne(e) {
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            SlognsDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getSlognsList();
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
      this.getSlognsList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getSlognsList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
