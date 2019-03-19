<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:studioConfig:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新增直播</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="直播位置" width="240" prop="name"></el-table-column>
      <el-table-column label="直播地址" width="240" prop="url"></el-table-column>
      <el-table-column label="状态" width="240">
        <template slot-scope="scope">
          <el-radio v-if="scope.row.status == 1"></el-radio>
          <el-radio v-else v-model="scope.row.status"></el-radio>
          
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="240" prop="ctime"></el-table-column>
      <el-table-column
        v-if="hasPer('cms:studioConfig:update') || hasPer('cms:studioConfig:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:studioConfig:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:studioConfig:delete')"
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
      :title="add?'新增直播':'编辑直播'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="直播类型" prop="type">
            <el-input type="hidden" v-show="false" v-model="formData.type"></el-input>
          <el-select v-model="formData.type">
              <el-option
                v-for="(item,index) in noticeTypeList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直播位置" prop="name">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="直播地址" prop="url">
            <el-input v-model="formData.url"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-switch
                v-model="formData.status"
                active-color="#13ce66"
                inactive-color="#ddd"
            >
            </el-switch>
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
import { LiveIndexList, LiveIndexDelete,LiveIndexAdd,LiveIndexUpdate } from "@/api/v2";
import { constants } from 'fs';
export default {
  name: "role",
  created() {
    this.getLiveIndexList();
    
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
        name:'',
        url:'',
        type:'',
        status:true
      },
      noticeTypeList:[
          {id:1,name:'会议室'},
          {id:2,name:'电视台'},
          {id:3,name:'录播教室'}
      ],
      rules: {
        //表单验证
        name: [{required:true,message: "不能为空", trigger: "blur"}],
        url:[{required:true,message: "不能为空", trigger: "blur"}],
        status:[{required:true,message: "不能为空", trigger: "blur"}],
        type:[{required:true,message: "不能为空", trigger: "blur"}]
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
       if(this.formData.status){
           this.formData.status = 1
       }else{
           this.formData.status = 0
       }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          LiveIndexAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getLiveIndexList({ limit: this.limit, offset: this.offset });
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
         if(this.formData.status){
           this.formData.status = 1
       }else{
           this.formData.status = 0
       }
        this.$refs[formName].validate(valid => {
            if (valid) {
            // 更新用户信息
            LiveIndexUpdate(this.formData).then(res => {
                this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
                });
                this.dialogVisible = false;
                this.getLiveIndexList({ limit: this.limit, offset: this.offset });
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
      this.getLiveIndexList()
    },

    // 获取列表
    getLiveIndexList() {
      let data = { limit: this.limit, offset: this.offset };
      LiveIndexList(data).then(res => {
         
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
        if(this.formData.status == 1){
          this.formData.status = true
        }else{
          this.formData.status = false
        }
    },
    deleteOne(e) {
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            LiveIndexDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getLiveIndexList();
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
      this.getLiveIndexList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getLiveIndexList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
