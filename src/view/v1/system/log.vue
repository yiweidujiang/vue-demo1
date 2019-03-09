<template>
  <div class="data-table">
    <div class="nav">
      <!-- <el-button
        v-if="hasPer('upms:system:create')"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        size="mini"
      >新加系统</el-button>-->
      <el-row>
        <el-col :span="6">
          <el-form>
            <el-form-item>
              <el-input v-model="search" placeholder="输入内容搜索">
                   <el-button type="success" slot="append" icon="el-icon-search" @click="getSearch"></el-button>
              </el-input>
              
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="logId" label="ID"></el-table-column>
      <el-table-column prop="description" width="240" label="描述"></el-table-column>
      <el-table-column prop="userName" width="240" label="操作者"></el-table-column>
      <el-table-column prop="spendTime" width="240" label="用时(/ms)"></el-table-column>
      <el-table-column prop="basePath" width="240" label="IP地址"></el-table-column>
      <el-table-column prop="startTime" width="240" label="时间"></el-table-column>

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
          >编辑</el-button>-->
          <el-button
            v-if="hasPer('upms:log:delete')"
            @click="deleteOne(scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="scope.row.status==0"
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { LogList, LogDelete } from "@/api/v1";
export default {
  name: "role",
  created() {
    this.getLogList();
  },
  data() {
    return {
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      search:""
    };
  },
  computed: {},
  methods: {
      getSearch(e){
        let data =  {search:this.search};
        this.getLogList(data)
      },
    getLogList(e) {
        let data = { limit: this.limit, offset: this.offset,search:e?e.search:""};
     
      LogList(data).then(res => {
        let data = res.data?res.data.rows:null;
        this.tableData = data;
        this.total = res.data.total;
      });
    },
    getSystemOne(e) {
      SystemOne(e).then(res => {
        this.formData = res;
      });
    },
    deleteOne(e) {
      let data = { id: e.logId };
      this.$msgbox({
        title: "删除操作",
        message: "确定要删除吗?",
        callback: e => {
          if (e == "confirm") {
            LogDelete(data).then(res => {
              this.$message({
                type: res.code == 1 ? "success" : "error",
                message: res.message,
                onClose: () => {
                  this.getLogList();
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
      this.getLogList({ limit: res, offset: this.offset,search:this.search });
    },
    offset(res) {
      this.getLogList({ limit: this.limit, offset: res,search:this.search });
    }
  }
};
</script>

<style>
</style>
