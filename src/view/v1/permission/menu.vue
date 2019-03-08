<template>
  <div class="data-table">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==1" type="info" size="medium">一级菜单</el-tag>
          <el-tag v-else-if="scope.row.type==2" type="success" size="medium">二级菜单</el-tag>
          <el-tag v-else type="warning" size="medium">操作</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="uri" width="240" label="接口地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" type="success" size="medium">正常</el-tag>
          <el-tag v-else type="danger" size="medium">禁用</el-tag>
        </template>
      </el-table-column>
      <!-- v-if="hasPer('dispatch:edit')||hasPer('dispatch:delete')" -->
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==0"
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >使用</el-button>
          <el-button
            v-else
            @click="editOne(scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { menuList, menuStatus } from "@/api/v1";
export default {
  name: "role",
  created() {
    this.getMenuList();
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1
    };
  },
  computed: {
    ...mapGetters(["appid"])
  },
  methods: {
    getCheckedKeys() {
      this.CheckedKeys = this.$refs.tree.getCheckedKeys();
    },
    // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
    },

    getMenuList() {
      let data = { limit: this.limit, offset: this.offset };
      menuList(data).then(res => {
        let data = res.data.rows;
        this.tableData = data;
        this.total = res.data.total;
      });
    },
    //编辑一个
    editOne(e) {
      let data = { id: e.pid, name: e.name };
      if (e.status == 0) {
        data.status = 1;
      } else {
        data.status = 0;
      }
      menuStatus(data).then(res => {
        this.$message({
          type:res.code==1?"success":"error",
          message: res.message,
          onClose: () => {
            this.getMenuList();
          }
        });
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
      this.getMenuList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getMenuList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
