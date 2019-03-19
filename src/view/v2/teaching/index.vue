<template>
  <div class="data-table">
    <el-row>
      <el-col :span="4">
        <el-tree ref="tree" :data="data2" default-expand-all @node-click="getCurrentKey"></el-tree>
      </el-col>
      <el-col :span="20">
        <el-button
          v-if="hasPer('cms:bookVersion:create')"
          type="primary"
          icon="el-icon-plus"
          @click="dialogVisible = true"
          size="mini"
        >新增教材</el-button>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="phaseName" label="学段"></el-table-column>
          <el-table-column prop="gradeName" label="年级"></el-table-column>
          <el-table-column prop="subjectName" label="学科"></el-table-column>
          <el-table-column prop="semesterName" label="学期"></el-table-column>
          <el-table-column prop="editionName" label="教材版本"></el-table-column>
          <el-table-column prop="bookName" label="书籍名称"></el-table-column>
          <el-table-column prop="yxbz" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.yxbz == 'Y'" style="color:#1C84C6">正常</span>
              <span v-else style="color:#ED5565">禁用</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                v-if="hasPer('cms:bookVersion:update')"
                @click="editOne(scope.row)"
                type="primary"
                icon="el-icon-edit-outline"
                size="mini"
                :disabled="scope.row.userId==1"
              >编辑</el-button>
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
      </el-col>
    </el-row>

    <!-- 弹出窗 -->
    <el-dialog
      :title="add?'新增教材':'编辑教材'"
      :visible.sync="dialogVisible"
      width="60%"
      @close="handleClosed"
    >
      <el-form :rules="rules" ref="ruleForm" :model="formData" label-width="80px">
        <el-form-item label="学段" prop="phase">
          <el-select v-model="formData.phaseId" :disabled="add?false:true">
            <el-option
              v-for="(item,index) in phaseList"
              :key="index"
              :label="item.phaseName"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科" prop="subject">
          <el-select v-model="formData.subjectId" :disabled="add?false:true">
            <el-option
              v-for="(item,index) in subjectList"
              :key="index"
              :label="item.subjectName"
              :value="item.subjectId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" prop="semester">
          <el-select v-model="formData.semester" :disabled="add?false:true">
            <el-option
              v-for="(item,index) in semesterList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教材版本" prop="edition">
          <el-select v-model="formData.editionId">
            <el-option
              v-for="(item,index) in editionList"
              :key="index"
              :label="item.editionName"
              :value="item.editionId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍名称" prop="book">
          <el-select v-model="formData.bookId">
            <el-option
              v-for="(item,index) in bookList"
              :key="index"
              :label="item.bookName"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="formData.yxbz" label="1">正常</el-radio>
          <el-radio v-model="formData.yxbz" label="0">禁用</el-radio>
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
import { PhaseList, SubjectList, EditionList, BookList } from "@/api/b1";
import { bookVersionAdd, bookVersionList, bookVersionUpdate } from "@/api/v2";
export default {
  name: "bookVersion",
  created() {
    this.gradeId = this.data2[0].children[0].id;
    this.getbookVersionList({
      limit: this.limit,
      offset: this.offset,
      gradeId: this.gradeId
    });
    this.getPhaseList();
  },
  data() {
    return {
      //topModelId:'59c1c48e4130a7401770154e',
      add: true,
      tableData: [],
      dialogVisible: false,
      gradeId: "", // 年级id
      phaseList: [], // 学段列表
      subjectList: [], // 学科列表
      semesterList: [
        // 学期
        { id: "92b8f7cd121b4246ba428294", name: "上学期" },
        { id: "92b8f7cd121b4246ba428295", name: "下学期" }
      ],
      editionList: [], // 教材版本列表
      bookList: [], // 课本列表
      formData: {
        phaseId: "",
        subjectId: "",
        semester: "",
        editionId: "",
        bookId: "",
        yxbz: "1"
      },
      rules: {
        // phase:[{required:true,message:'不能为空',trigger:"blur"}],
        // subject:[{required:true,message:'不能为空',trigger:"blur"}],
        // semester:[{required:true,message:'不能为空',trigger:"blur"}],
        // edition:[{required:true,message:'不能为空',trigger:"blur"}],
        // book:[{required:true,message:'不能为空',trigger:"blur"}]
      },
      total: 0,
      limit: 10,
      offset: 1,

      data2: [
        {
          label: "小学",

          children: [
            {
              label: "一年级",
              id: "5b97372c4af5851834f4b7a7"
            },
            {
              label: "二年级",
              id: "5b97373a4af5851834f4b7a8"
            },
            {
              label: "三年级",
              id: "5b9737494af5851834f4b7a9"
            },
            {
              label: "四年级",
              id: "5b9737574af5851834f4b7aa"
            },
            {
              label: "五年级",
              id: "5b9737634af5851834f4b7ab"
            },
            {
              label: "六年级",
              id: "5b9737734af5851834f4b7ac"
            }
          ]
        },
        {
          label: "初中",

          children: [
            {
              label: "七年级",
              id: "5b9737a04af5851834f4b7ad"
            },
            {
              label: "八年级",
              id: "5b9737ad4af5851834f4b7ae"
            },
            {
              label: "九年级",
              id: "5b9737bb4af5851834f4b7af"
            }
          ]
        },
        {
          label: "高中",
          children: [
            {
              label: "高一级",
              id: "5b9737ed4af5851834f4b7b0"
            },
            {
              label: "高二级",
              id: "5b9737fb4af5851834f4b7b1"
            },
            {
              label: "高三级",
              id: "5b97380a4af5851834f4b7b2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    ...mapGetters(["topModelId"])
  },
  methods: {
    // 获取列表
    getbookVersionList(data) {
      bookVersionList(data).then(res => {
        this.tableData = res.data ? res.data.rows : res.data;
        this.total = res.data.total;
        console.log(this.tableData);
      });
    },

    // 获取学段列表
    getPhaseList() {
      let data = { topModelId: this.topModelId };
      PhaseList(data).then(res => {
        if (res.resources.data) {
          this.phaseList = res.resources.data;
        }
      });
    },
    // 选择学段, 获取学科列表
    choosePhase(data) {
      SubjectList(data).then(res => {
        if (res.resources.data) {
          this.subjectList = res.resources.data;
        }
      });
    },

    // 选择学科,获取教材版本列表
    chooseSubject(data) {
      EditionList(data).then(res => {
        if (res.resources.data) {
          this.editionList = res.resources.data;
        }
      });
    },

    // 选择教材版本,获取课本列表
    chooseEdition(data) {
      BookList(data).then(res => {
        if (res.resources.data) {
          this.bookList = res.resources.data;
        }
      });
    },

    // 添加教材
    submitForm(formName) {
      if (this.formData.yxbz == 1) {
        this.formData.yxbz = "Y";
      } else {
        this.formData.yxbz = "Z";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新加用户
          console.log(1111111);
          bookVersionAdd(this.formData).then(res => {
            console.log(222222);
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getbookVersionList({
              gradeId: this.gradeId,
              limit: this.limit,
              offset: this.offset
            });
            this.resetForm(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 打开编辑
    editOne(e) {
      console.log(e);
      this.getPhaseList();
      this.choosePhase({ topModelId: this.topModelId, phaseId: e.phaseId });
      this.chooseSubject({
        topModelId: this.topModelId,
        phaseId: e.phaseId,
        subjectId: e.subjectId
      });
      this.chooseEdition({
        topModelId: this.topModelId,
        phaseId: e.phaseId,
        subjectId: e.subjectId,
        editionId: e.editionId
      });
      this.add = false;
      this.dialogVisible = true;

      if (this.formData.yxbz == "Y") {
        this.formData.yxbz = "1";
      } else {
        this.formData.yxbz = "0";
      }
      this.$nextTick(() => {
        this.formData = e;
      });
    },
    // 提交编辑
    editForm(formName) {
      if (this.formData.yxbz == 1) {
        this.formData.yxbz = "Y";
      } else {
        this.formData.yxbz = "Z";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 更新用户信息
          console.log(this.formData);
          bookVersionUpdate(this.formData).then(res => {
            this.$message({
              type: res.code == 1 ? "success" : "error",
              message: res.message
            });
            this.dialogVisible = false;
            this.getbookVersionList({
              gradeId: this.gradeId,
              limit: this.limit,
              offset: this.offset
            });
            this.resetForm(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 点击左侧tree切换年级
    getCurrentKey(e) {
      if (e.id && e.id != "") {
        console.log(e.id);
        this.gradeId = e.id;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭弹窗
    handleClosed() {
      this.dialogVisible = false;
      this.add = true;
      this.resetForm("ruleForm");
      this.formData.phaseId = "";
      this.formData.subjectId = "";
      this.formData.semester = "";
      this.formData.editionId = "";
      this.formData.bookId = "";
      this.formData.yxbz = "1";

      this.getbookVersionList({
        gradeId: this.gradeId,
        limit: this.limit,
        offset: this.offset
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
    ["formData.phaseId"]: function(res) {
      let data = { topModelId: this.topModelId, phaseId: res };
      this.choosePhase(data);
      this.formData.subjectId = "";
    },
    ["formData.subjectId"]: function(res) {
      console.log(res);
      let data = {
        topModelId: this.topModelId,
        phaseId: this.formData.phaseId,
        subjectId: res
      };
      this.chooseSubject(data);
      this.formData.editionId = "";
    },
    ["formData.editionId"]: function(res) {
      console.log(res);
      let data = {
        topModelId: this.topModelId,
        phaseId: this.formData.phaseId,
        subjectId: this.formData.subjectId,
        editionId: res
      };
      this.chooseEdition(data);
      this.formData.bookId = "";
    },
    limit(res) {
      this.getbookVersionList({
        gradeId: this.gradeId,
        limit: res,
        offset: this.offset
      });
    },
    offset(res) {
      this.getbookVersionList({
        gradeId: this.gradeId,
        limit: this.limit,
        offset: res
      });
    },
    gradeId(res) {
      console.log(res);
      this.getbookVersionList({
        gradeId: res,
        limit: 10,
        offset: 1
      });
    }
  }
};
</script>

<style>
</style>
