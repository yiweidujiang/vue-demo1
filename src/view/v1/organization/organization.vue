<template>
  <div class="data-table">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="orgTypeName" label="类型名称"></el-table-column>
      <el-table-column prop="orgType" label="类型代码"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" type="success" size="medium">正常</el-tag>
          <el-tag v-else type="danger" size="medium">异常</el-tag>
        </template>
      </el-table-column>
       <el-table-column prop="ctime" label="创建时间"></el-table-column>

      <!-- <el-table-column fixed="right"  v-if="hasPer('dispatch:edit')||hasPer('dispatch:delete')" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
             v-if="hasPer('dispatch:edit')"
          >派单</el-button>
          <el-button type="danger"  v-if="hasPer('dispatch:delete')"  @click="deleteOne(scope.row)" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>-->
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
import { organizationTypeList } from "@/api/v1";
export default {
  name: "organization",
  created() {
    this.getOrganizationList();
  },
  data() {
    return {
      limit: 10,
      offset: 1,
      total: 0,
      tableData: []
    };
  },
  methods: {
    getOrganizationList() {
      let data = { limit: this.limit, offset: this.offset };
      organizationTypeList(data).then(res => {
        this.tableData = res.data.rows;
        this.total = res.data.total;
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
      this.getOrganizationList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getOrganizationList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
