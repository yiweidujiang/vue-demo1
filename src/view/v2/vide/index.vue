<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:videoShop:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新增图书馆资源</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="资源名称" width="240" prop="resName"></el-table-column>
      <el-table-column label="资源作者" width="240" prop="resAuthor"></el-table-column>
      <el-table-column label="资源描述" width="240" prop="desp"></el-table-column>
      <el-table-column label="资源状态" width="240" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color:#1C84D0">常用</span>
          <span v-else style="color:#F8AC59">不常用</span>
        </template>
      </el-table-column>

      <el-table-column label="资源封面" width="240">
        <template slot-scope="scope">
          <img :src="'http://192.168.17.82/' + scope.row.cover" style="width:50px;height:50px;" alt>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="240" prop="ctime"></el-table-column>

      <el-table-column
        v-if="hasPer('cms:videoShop:update') || hasPer('cms:videoShop:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:videoShop:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:videoShop:delete')"
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
      :title="add?'新增图书馆资源':'编辑图书馆资源'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="资源名称" prop="resName">
          <el-input v-model="formData.resName"></el-input>
        </el-form-item>
        <el-form-item label="资源描述" prop="desp">
          <el-input v-model="formData.desp"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="libTypeCode ">
          <el-input type="hidden" v-show="false" v-model="formData.libTypeCode "></el-input>
          <el-select v-model="formData.libTypeCode">
            <el-option
              v-for="(item,index) in noticeTypeList"
              :key="index"
              :label="item.dictName"
              :value="item.dictCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源封面">
          <v-upload ref="upload1"></v-upload>
        </el-form-item>
        <el-form-item label="资源文件">
          <v-upload ref="upload2"></v-upload>
        </el-form-item>
        <el-form-item label="资源作者" prop="resAuthor">
          <el-input v-model="formData.resAuthor"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
          <el-checkbox-group v-model="gradeList">
            <el-checkbox
              v-for="(item,index) in ClassList"
              :key="index"
              :label="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ddd"></el-switch>
          <span>是否常用</span>
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
  VideoShopList,
  VideoShopDelete,
  VideoShopAdd,
  VideoShopUpdate,
  VideoTypeList
} from "@/api/v2";
import { constants } from "fs";
import upload from "@/components/upload";
export default {
  name: "livePut",
  created() {
    this.getVideoShopList();
    this.getVideoTypeList();
  },
  data() {
    return {
      t1: true,
      t2: true,
      add: true,
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      formData: {
        // 表单数据
        resName: "",
        desp: "",
        libTypeCode: "",
        resAuthor: "",
        gradeId: "",
        status: true
      },
      time: [],
      noticeTypeList: [],
      ClassList: [
        { id: 11, name: "一年级" },
        { id: 12, name: "二年级" },
        { id: 13, name: "三年级" },
        { id: 14, name: "四年级" },
        { id: 15, name: "五年级" },
        { id: 16, name: "六年级" },
        { id: 17, name: "七年级" },
        { id: 18, name: "八年级" },
        { id: 19, name: "九年级" }
      ],
      gradeList: [],
      rules: {
        //表单验证
        resName: [{ required: true, message: "不能为空", trigger: "blur" }],
        desp: [{ required: true, message: "不能为空", trigger: "blur" }],
        libTypeCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        resAuthor: [{ required: true, message: "不能为空", trigger: "blur" }],
        gradeId: [{ required: true, message: "不能为空", trigger: "blur" }],
        status: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      njId: ""
    };
  },
  components: {
    "v-upload": upload
  },
  computed: {
    ...mapGetters(["organId"])
  },
  methods: {
    // 新加数据
    submitForm(formName) {
      console.log(this.$refs["upload1"].DATA);
      if (this.$refs["upload1"].DATA) {
        this.formData.cover = this.$refs["upload1"].DATA[0].url;
      }
      if (this.formData.status) {
        this.formData.status = 1;
      } else {
        this.formData.status = 0;
      }

      this.formData.gradeId = this.gradeList.join(",");

      console.log(this.formData);

      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          console.log(this.formData);
          VideoShopAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getVideoShopList({ limit: this.limit, offset: this.offset });
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
      console.log(e);
      let check = e.gradeId.split(",").map(item => Number(item));
      this.gradeList = check;
      this.formData = e;
    },
    // 编辑表单
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           if (this.formData.status == 1) {
              this.formData.status = 1;
            } else {
              this.formData.status = 0;
            }
          // 更新用户信息
          VideoShopUpdate(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getVideoShopList({ limit: this.limit, offset: this.offset });
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
      this.getVideoShopList();
      this.gradeList = [];
    },

    // 获取列表
    getVideoShopList() {
      let data = { limit: this.limit, offset: this.offset };
      VideoShopList(data).then(res => {
        console.log(res)
        if (res.data) {
          let data = res.data.rows;
          this.tableData = data;
          this.total = res.data.total;
        }
      });
    },
    // 获取资源类型列表
    getVideoTypeList() {
      VideoTypeList().then(res => {
        console.log(res)
        this.noticeTypeList = res.data ? res.data.rows : [];
        this.total = res.data ? res.data.total : 0;
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
            VideoShopDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getVideoShopList();
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
      this.getVideoShopList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getVideoShopList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
