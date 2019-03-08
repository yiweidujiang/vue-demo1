<template>
  <div class="data-table">
    <el-row >
      <el-col :span="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree 
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          :default-expand-all="false"
          :filter-node-method="filterNode"
          ref="tree2"
          @node-click="getNode"
        ></el-tree>
      </el-col>
    <el-col :span="16" style="margin-left:20px;">
      <el-table   :data="tableData" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="userName" label="账号"></el-table-column>
         <el-table-column prop="realName" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
           <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" :formatter="formatDateA"></el-table-column>
        <!-- v-if="hasPer('dispatch:edit')||hasPer('dispatch:delete')" -->
        <el-table-column fixed="right" label="操作" width="180">
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
    </el-col>
    </el-row>
  </div>
</template>

<script>
import { organizationList,getUsers } from "@/api/v1";
import { mapGetters,mapState } from "vuex";
import { stat } from 'fs';
export default {
  name: "organization",
  created() {
    this.getorganizationList();
  },
  data() {
    return {
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      tableData:[],
      total:0,
    limit: 10,
      offset: 1,
      id:'',
      loadingTable:true
    
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
     limit(res) {
      this.getUsers({id:this.id, limit: res, offset: this.offset });
    },
    offset(res) {
      this.getUsers({ id:this.id,limit: this.limit, offset: res });
    }
  },
  computed: {
    ...mapGetters(["appid"]),

  },
  methods: {
      getUsers(data){
           getUsers(data).then(res=>{
             this.tableData = res.data.rows
             this.total = res.data.total;
         })
      },
      // 节点点击事件
      getNode(e){
          this.id = e.id
          let data = {id:e.id,limit:this.limit,offset:this.offset};
           this.tableData=[]
         this.getUsers(data)
      },
    getorganizationList() {
      let data = { id: this.appid };
      organizationList(data).then(res => {
        this.data2 = res.data.rows;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
      //分页
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.offset = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-tree{
    max-height: 540px;
    overflow-y: scroll
}
</style>

