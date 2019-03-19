<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:photo:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加相册</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="标题" width="240" prop="title"></el-table-column>
      <el-table-column label="内容" width="240" prop="content"></el-table-column>
      <el-table-column label="年级" width="240" prop="reserve1"></el-table-column>
      <el-table-column label="班级" width="240" prop="reserve2"></el-table-column>
      <el-table-column
        v-if="hasPer('cms:photo:update') || hasPer('cms:photo:delete')  "
        fixed="right"
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:photo:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >查看相册</el-button>
          <el-button
            v-if="hasPer('cms:photo:detele')"
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
      title="新加相册"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
         <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="班级年级" prop="bjId">
            <!-- <el-button type="primary" @click="t1=!t1">Click</el-button>{{t1}} -->
            <el-input type="hidden" v-show="false" v-model="formData.bjId"></el-input>
            <v-select ref="selectA" v-if="add"  ></v-select>
          <v-select ref="selectA" v-else :selectData="{ xxNjxxId:this.formData.njId,xxBjxxId:this.formData.bjId}"></v-select>
        </el-form-item>
        <el-form-item>
            <v-upload ref="upload1" v-if="add" :allow="true"></v-upload>
           
        </el-form-item>
        <el-form-item>
          <el-button v-if="add" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-else type="primary" size="mini" @click="editForm('ruleForm')">提交</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="查看相册" :visible.sync="dialogVisibleImg" width="80%" @closed='handleClosedImg'>
        <img v-for="(item,index) in ImgList" :key="index" :src="item.picUrl" alt="" class="selectImg">
       
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PhotoList, PhotoDelete,PhotoAdd,PhotoUpdate,PhotoSelect } from "@/api/v2";
import SelectSchool from '@/components/select'
import upload from '@/components/upload'
import { constants } from 'fs';
export default {
  name: "role",
  created() {
    this.getPhotoList();  
  },
  components:{
      'v-select':SelectSchool,
      'v-upload':upload
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
        content:"",
        njId : '',
        bjId : '',
        status: 1,
        reserve1:'',
        reserve2:'',
        file:''
      },
      listA:null,
      rules: {
        //表单验证
        title: [{required:true,message: "不能为空", trigger: "blur"}],
        content: [{required:true,message: "不能为空", trigger: "blur"}],
        bjId:[{required:true,message: "不能为空", trigger: "blur"}],
      },
      njId:'',
      dialogVisibleImg:false,
      ImgList:[]
    };
  },
  computed: {
     ...mapGetters([
         'organId'
     ])
  },
  methods: {
     resetForm(formName) {
        console.log(this.$refs['ruleForm'])
        this.$refs[formName].resetFields();
      },
     // 获取列表
    getPhotoList() {
      let data = { limit: this.limit, offset: this.offset };
      PhotoList(data).then(res => {  
        if(res.data){
            let data = res.data.rows;
            this.tableData = data;
            this.total = res.data.total;
        }
      });
    },
    // 新加数据
    submitForm(formName) {
        let fileList = this.$refs['upload1'].DATA
        let data = []
        fileList.forEach(item=>{
            let a = {picUrl:''}
            a.picUrl = 'http://192.168.17.82/'+item.url
            data.push(a)
        })
        this.formData.data = data
        this.formData.njId = this.$refs['selectA'].value
        this.formData.bjId = this.$refs['selectA'].value2
        this.formData.xxId = this.organId
        this.formData.reserve1 =  this.$refs['selectA'].label1
        this.formData.reserve2 =  this.$refs['selectA'].label2

        this.$refs[formName].validate(valid => {
            if (valid) {
                // 新加用户
                PhotoAdd(this.formData).then(res => {
                this.$message({
                    type: res.code == 1 ? "success" : "error",
                    message: res.message
                });
                this.dialogVisible = false;
                this.getPhotoList({ limit: this.limit, offset: this.offset });
                });
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    },
    //查看相册
    editOne(e) {
        this.dialogVisibleImg = true;
        let data = {id:e.id}
        this.getPhotoSlect(data)
    },
    getPhotoSlect(data){
        PhotoSelect(data).then(res=>{
            if(res.data.rows){
                this.ImgList = res.data.rows
            }  
        })
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
            PhotoUpdate(this.formData).then(res => {
                this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message
                });
                this.dialogVisible = false;
                this.getPhotoList({ limit: this.limit, offset: this.offset });
            });
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    },
    // // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
      this.resetForm("ruleForm");
      this.add = false;
      setTimeout(()=>{
        this.add = true;
      },500)
      this.getPhotoList()
    },
    handleClosedImg(){
        this.dialogVisibleImg= false;
        this.getPhotoList()
    },   
    // 删除
    deleteOne(e) {
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            PhotoDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getPhotoList();
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
      this.getPhotoList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getPhotoList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
    .selectImg{
        width: 150px;
        height: 150px;
        margin: 20px;
    }
</style>
