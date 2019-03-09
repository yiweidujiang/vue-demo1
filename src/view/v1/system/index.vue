<template>
  <div class="data-table">
    <div class="nav">
      <!-- <el-button
        v-if="hasPer('upms:system:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加系统</el-button> -->
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" width="240" label="系统名称"></el-table-column>
      <el-table-column label="系统根目录" width="240" prop="basepath"></el-table-column>
      <el-table-column prop="title" label="系统描述"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" type="success" size="medium">正常</el-tag>
          <el-tag v-else type="danger" size="medium">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        v-if="hasPer('upms:system:update') || hasPer('upms:system:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <!-- <el-button
            v-if="hasPer('upms:system:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button> -->
          <el-button
            v-if="hasPer('upms:system:delete')"
            @click="deleteOne(scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="scope.row.status==0"
          >禁用</el-button>
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
      :title="add?'新加系统':'编辑系统'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="系统描述" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="系统地址" prop="basepath">
          <el-input v-model="formData.basepath"></el-input>
        </el-form-item>
        <el-form-item label="系统状态">
          <el-radio v-model="formData.status" :label="1" checked="true">正常</el-radio>
          <el-radio v-model="formData.status" :label="0">禁用</el-radio>
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
import { SystemList, SystemDelete,SystemAdd,SystemOne } from "@/api/v1";
export default {
  name: "role",
  created() {
    this.getSystemList();
  },
  data() {
    return {
      add: true,
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      formData: {
        // 表单数据
        title: "",
        name: "",
        basepath: "",
        status: null
      },
      listA:null,
      rules: {
        //表单验证
        title: [{required:true,message: "不能为空", trigger: "blur"}],
        name: [{required:true,message: "不能为空", trigger: "blur"}],
        basepath: [{required:true,message: "不能为空", trigger: "blur"},{
            pattern: /^[http\:\/\/]/g, message: "必须为http://开头", trigger: "blur" 
        }]
      }
    };
  },
  computed: {
  
  },
  methods: {
    // 新加数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          SystemAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getSystemList({ limit: this.limit, offset: this.offset });
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          userEdit(this.formData.id, this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getSystemList({ limit: this.limit, offset: this.offset });
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
      this.getSystemList()
    },

    getSystemList() {
      let data = { limit: this.limit, offset: this.offset };
      SystemList(data).then(res => {
        let data = res.data.rows;
        this.tableData = data;
        this.total = res.data.total;
      });
    },
    getSystemOne(e){
        SystemOne(e).then(res=>{
            this.formData = res
        })
    },
    //编辑一个
    editOne(e) {
        this.add = false;
        this.dialogVisible = true;
        this.getSystemOne(e)
    },
    deleteOne(e) {
      let data = { id: e.systemId };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            SystemDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getSystemList();
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
      this.getSystemList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getSystemList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
