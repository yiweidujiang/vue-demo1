<template>
  <div class="data-table">
    <el-row>
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
        <el-table :data="tableData" stripe style="width: 100%">
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
                :disabled="scope.row.userId==1"
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

    <el-dialog title="角色授权" :visible.sync="dialogVisible" width="40%" @closed="handleClosed">
      <el-form label-width="80px" ref="formv">
        <el-form-item>
          <el-checkbox-group v-model="checkedRoles" >
            <el-checkbox :title="item.name" style="width:120px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;" v-for="item in roles" :label="item.roleId" border :key="item.id" :checked="item.checked">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitData">修改角色</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { organizationList,updateUser, getUsers, RoleList, addPermission } from "@/api/v1";
import { mapGetters, mapState } from "vuex";
import { stat } from "fs";
export default {
  name: "organization",
  created() {
    this.getorganizationList();
  },
  data() {
    return {
      dialogVisible: false,
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      loadingTable: true,
    checkedRoles:[],
    roles:[],
    userId:''
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    limit(res) {
      this.getUsers({ id: this.id, limit: res, offset: this.offset });
    },
    offset(res) {
      this.getUsers({ id: this.id, limit: this.limit, offset: res });
    }
  },
  computed: {
    ...mapGetters(["appid"])
  },
  methods: {
    resetForm(formName){
       this.$refs[formName].resetFields();
    },
    // 弹窗关闭
    handleClosed() {
     
      this.resetForm('formv')
      this.dialogVisible = false;
    },
    editOne(e) {
      this.userId = e.userId
      this.dialogVisible = true;
      let data = { userId: e.userId };
      this.RoleList(data);
    },
    // 提交角色
    submitData(e) {
      let data = {roleId:this.checkedRoles.join(','),userId:this.userId};
      updateUser(data).then(res=>{
        this.$message({
          type:res.code==1?"success":"error",
          message:res.message
        })
      })
    },
    // 获取角色列表
    RoleList(data) {
      RoleList(data).then(res => {
        this.roles = res.data
      });
    },
    getUsers(data) {
      getUsers(data).then(res => {
        this.tableData = res.data?res.data.rows:[];
        this.total = res.data?res.data.total:0;
      });
    },
    // 节点点击事件
    getNode(e) {
      this.id = e.id;
      let data = { id: e.id, limit:10, offset: 1};
      this.tableData = [];
      this.getUsers(data);
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
.filter-tree {
  max-height: 540px;
  overflow-y: scroll;
}
</style>

