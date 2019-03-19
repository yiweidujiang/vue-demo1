<template>
  <div class="data-table">
    <div class="nav">
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="学期名称" width="240" prop="yearName">
        <template slot-scope="scope">
          <span v-text="scope.row.yearName" style="color:#1C84C6"></span>
          <span v-if="scope.row.label == 1" style="color:#1C84C6">上学期</span>
          <span v-else style="color:#1C84C6">下学期</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="240" prop="yearBeginTime"></el-table-column>
      <el-table-column label="结束时间" width="240" prop="yearEndTime"></el-table-column>
      <el-table-column label="状态" width="240">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color:#1C84C6">正常</span>
          <span v-else style="color:#ED5565">异常</span>
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
import { YearList } from "@/api/v2";
import { constants } from 'fs';
export default {
  name: "role",
  created() {
    this.getYearList();
    
  },
  data() {
    return {
      tableData: [],
      total:0
    };
  },
  computed: {
  },
  methods: {
    
    // 获取列表
    getYearList() {
      let data = { limit: this.limit, offset: this.offset };
      YearList(data).then(res => {
         
        if(res.data){
            
            let data = res.data.rows;
            data.map(item=>{
                if(item.status == 1) {
                    item.statusName = '正常'
                } else {
                    item.statusName = '异常'
                }
            })
            this.tableData = data;
            this.total = res.data.total;
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
      this.getBriefingList({ limit: res, offset: this.offset });
    },
    offset(res) {
      this.getBriefingList({ limit: this.limit, offset: res });
    }
  }
};
</script>

<style>
</style>
