<template>
  <div class="data-table">
    <div class="nav">
      <el-button
        v-if="hasPer('cms:studioPublish:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新增直播</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="直播标题" width="240" prop="title"></el-table-column>
      <el-table-column label="发布人" width="240" prop="host"></el-table-column>
      <el-table-column label="直播描述" width="240" prop="content"></el-table-column>
      <el-table-column label="直播封面" width="240">
        <template slot-scope="scope">
          <img
            :src="'http://192.168.17.82/' + scope.row.headImg"
            style="width:50px;height:50px;"
            alt
          >
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="240" prop="starttime"></el-table-column>
      <el-table-column label="结束时间" width="240" prop="endtime"></el-table-column>

      <el-table-column
        v-if="hasPer('cms:studioPublish:update') || hasPer('cms:studioPublish:delete')  "
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="hasPer('cms:studioPublish:update')"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="hasPer('cms:studioPublish:delete')"
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
              :label="item.dictName"
              :value="item.dictCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直播标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="主讲人" prop="host">
          <el-input v-model="formData.host"></el-input>
        </el-form-item>
        <el-form-item label="直播内容" prop="content">
          <el-input v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="上传封面" prop="headImg">
          <v-upload ref="upload1"></v-upload>
          <img
            v-if="!add"
            :src="'http://192.168.17.82/' + formData.headImg"
            alt=" "
            style="width:80px;height:80px;"
          >
        </el-form-item>
        <el-form-item label="起止时间" prop="time">
          <!-- <el-input type="hidden" v-show="false" v-model="formData.time"></el-input> -->
          <el-date-picker
            v-model="time"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            :picker-options="pickerOptions0"
          ></el-date-picker>
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
  LivePutList,
  LivePutDelete,
  LivePutAdd,
  LivePutUpdate
} from "@/api/v2";
import { constants } from "fs";
import upload from "@/components/upload";
export default {
  name: "livePut",
  created() {
    this.getLivePutList();
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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      formData: {
        // 表单数据
        title: "",
        host: "",
        type: "",
        content: ""
      },
      time: [],
      noticeTypeList: [
        { id: 1, name: "会议室" },
        { id: 2, name: "电视台" },
        { id: 3, name: "录播教室" }
      ],
      rules: {
        //表单验证
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        host: [{ required: true, message: "不能为空", trigger: "blur" }],
        content: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }]
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
      console.log(this.time);
      this.formData.starttime = this.time[0];
      this.formData.endtime = this.time[1];
      console.log(this.$refs["upload1"]);
      if (this.$refs["upload1"].DATA.length > 0) {
        this.formData.headImg = this.$refs["upload1"].DATA[0].url;
      } else {
        this.$message({
          message: "请一个选择封面上传",
          type: "warning"
        });
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          console.log(this.formData);
          LivePutAdd(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getLivePutList({ limit: this.limit, offset: this.offset });
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
      let arr = [];
      arr.push(e.starttime);
      arr.push(e.endtime);
      this.time = arr;
     // this.formData = e;
      this.formData.title = e.title;
      this.formData.host = e.host;
      this.formData.type = e.type;
      this.formData.content = e.content;
    },
    // 编辑表单
    editForm(formName) {
      this.formData.starttime = this.time[0];
      this.formData.endtime = this.time[1];
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 更新用户信息
          LivePutUpdate(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getLivePutList({ limit: this.limit, offset: this.offset });
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
      this.getLivePutList();
      this.formData.title = "";
      this.formData.host = "";
      this.formData.type = "";
      this.formData.content = "";
      this.time = [];
    },

    // 获取列表
    getLivePutList() {
      let data = { limit: this.limit, offset: this.offset };
      LivePutList(data).then(res => {
        if (res.data) {
          let data = res.data.rows;
          this.tableData = data;
          this.total = res.data.total;
        }
      });
    },

    deleteOne(e) {
      let data = { id: e.id };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            LivePutDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getLivePutList();
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
      this.getLivePutList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getLivePutList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
