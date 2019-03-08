<template>
  <div class="data-table">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <!-- <el-table-column prop="title" label="角色描述"></el-table-column> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" type="success" size="medium">正常</el-tag>
          <el-tag v-else type="danger" size="medium">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="utime" label="创建时间"></el-table-column>
      <!-- v-if="hasPer('dispatch:edit')||hasPer('dispatch:delete')" -->
      <el-table-column
        fixed="right"
      
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            @click="editOne(scope.row)"
            type="primary"
            icon="el-icon-edit-outline"
            size="mini"
          >授权</el-button>
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
import { roleList } from "@/api/v1";
export default {
  name: "role",
  created() {
      this.getRoleList()
  },
  data() {
    return {
        tableData:[],
        total:0,
      limit: 10,
      offset: 1
    };
  },
  methods: { 
    getRoleList(){
        let data = {limit:this.limit,offset:this.offset}
        roleList(data).then(res=>{
            this.tableData = res.data.rows
            this.total = res.data.total
        })
    },
      //编辑一个
    editOne(){

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
      this.getRoleList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getRoleList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
