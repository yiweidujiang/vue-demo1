<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:handPaper:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加手抄报</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="标题" width="240" prop="title"></el-table-column>
      <el-table-column label="内容" width="240" prop="content"></el-table-column>
      <el-table-column label="作者" width="240" prop="author"></el-table-column>
      <el-table-column label="年级" width="240" prop="reserve1"></el-table-column>
      <el-table-column label="班级" width="240" prop="reserve2"></el-table-column>

      <el-table-column
        v-if="hasPer('cms:handPaper:update') || hasPer('cms:handPaper:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:handPaper:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:handPaper:delete')"
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
      :title="add?'新加手抄报':'编辑手抄报'"
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
        <el-form-item label="作者" prop="author">
          <el-input v-model="formData.author"></el-input>
        </el-form-item>
        <el-form-item label="班级年级" prop="bjId">
          <!-- <el-button type="primary" @click="t1=!t1">Click</el-button>{{t1}} -->
          <el-input type="hidden" v-show="false" v-model="formData.bjId"></el-input>
          <v-select ref="selectA" v-if="add"></v-select>
          <v-select
            ref="selectA"
            v-else
            :selectData="{ xxNjxxId:this.formData.njId,xxBjxxId:this.formData.bjId}"
          ></v-select>
        </el-form-item>
        <el-form-item>
          <v-upload :model="formData.picUrl" @successUpload="setFileUrl" :allow="false"></v-upload>
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
import {
  HandPaperList,
  HandPaperDelete,
  HandPaperAdd,
  HandPaperUpdate
} from "@/api/v2";
import SelectSchool from "@/components/select";
import upload from "@/components/upload";

import { constants } from "fs";
import { debug } from "util";
export default {
  name: "role",
  created() {
    this.getHandPaperList();
  },
  components: {
    "v-select": SelectSchool,
    "v-upload": upload
  },
  data() {
    return {
      t1: true,
      add: true,
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      formData: {
        // 表单数据
        title: "",
        content: "",
        author: "",
        njId: "",
        bjId: "",
        status: 1,
        reserve1: "",
        reserve2: "",
        picUrl: ""
      },
      listA: null,
      rules: {
        //表单验证
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        content: [{ required: true, message: "不能为空", trigger: "blur" }],
        author: [{ required: true, message: "不能为空", trigger: "blur" }],

        bjId: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      njId: ""
    };
  },
  computed: {
    ...mapGetters(["organId"])
  },
  methods: {
    // 上传成功设置路径
    setFileUrl(e) {
      console.log(e);
      this.formData.picUrl = e;
   
    },

    // 新加数据
    submitForm(formName) {
      this.formData.njId = this.$refs["selectA"].value;
      this.formData.bjId = this.$refs["selectA"].value2;
      this.formData.xxId = this.organId;
      this.formData.reserve1 = this.$refs["selectA"].label1;
      this.formData.reserve2 = this.$refs["selectA"].label2;

      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          HandPaperAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getHandPaperList({ limit: this.limit, offset: this.offset });
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
      if (this.$refs["selectA"].label2 != "") {
        this.formData.njId = this.$refs["selectA"].value;
        this.formData.bjId = this.$refs["selectA"].value2;
        this.formData.xxId = this.organId;
        this.formData.reserve1 = this.$refs["selectA"].label1;
        this.formData.reserve2 = this.$refs["selectA"].label2;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 更新用户信息
          HandPaperUpdate(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getHandPaperList({ limit: this.limit, offset: this.offset });
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
      this.formData.title = "";
      this.formData.content = "";
      this.formData.author = "";
      this.formData.njId = "";
      this.formData.bjId = "";
      this.formData.status = 1;
      this.formData.reserve1 = "";
      this.formData.reserve2 = "";
      this.formData.picUrl = "";
      this.getHandPaperList();
    },

    // 获取列表
    getHandPaperList() {
      let data = { limit: this.limit, offset: this.offset };
      HandPaperList(data).then(res => {
        if (res.data) {
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
      this.formData.title = e.title;
      this.formData.content = e.content;
      this.formData.author = e.author;
      this.formData.njId = e.njId
      this.formData.bjId = e.bjId
      this.formData.status =e.status
      this.formData.reserve1 =e.reserve1
      this.formData.reserve2 =e.reserve2
      this.formData.picUrl = e.picUrl
    },

    // 删除口号
    deleteOne(e) {
      console.log(e);
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            HandPaperDelete(data).then(res => {
              console.log(res);
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getHandPaperList();
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
      this.getHandPaperList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getHandPaperList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
