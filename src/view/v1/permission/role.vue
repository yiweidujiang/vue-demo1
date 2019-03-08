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
    <el-dialog title="角色授权" :visible.sync="dialogVisible" width="40%" @closed="handleClosed">
      <el-form label-width="80px">
        <el-form-item>
          <el-tree 
          ref="tree"
          :data="permissionList" 
          show-checkbox
           node-key="id"
            :default-checked-keys="child"
            :props="defaultProps">
            </el-tree>
        </el-form-item>
          <el-form-item>
              <el-button type="primary" size="mini" @click="submitData">修改权限</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { roleList, getPermission,addPermission } from "@/api/v1";
import { mapGetters } from "vuex";
export default {
  name: "role",
  created() {
    this.getRoleList();
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      limit: 10,
      offset: 1,
      permissionList: [],
      child:[],
      defaultProps: {
        children: "children",
        label: "text"
      },
      CheckedKeys:[],
      editId : ''
    };
  },
  computed: {
    ...mapGetters(["appid"])
  },
  methods: {
       getCheckedKeys() {
        this.CheckedKeys= this.$refs.tree.getCheckedKeys()
      },
      // 提交权限
      submitData(){
          this.getCheckedKeys()
          this.CheckedKeys;
          let data = {roleId:this.editId,permissionId:this.CheckedKeys.join(',') }
          addPermission(data).then(res =>{
              console.log(res)
          })

      },
    // 获取权限列表
    getPermission(data) {
      getPermission(data).then(res => {
          let data =  res.data.rows
        this.permissionList =data;
        let arr = [],arr1=[]
        data.forEach(item=>{
            item.children.forEach(itemA=>{
                itemA.children.forEach(itemB=>{
                    if(itemB.checked){
                        arr.push(itemB.id);
                        arr1.push(itemB.parentId)
                    }
                })
            })
        })
        this.child = arr
      });
    },
    // 弹窗关闭
    handleClosed() {
      this.dialogVisible = false;
    },

    getRoleList() {
      let data = { limit: this.limit, offset: this.offset };
      roleList(data).then(res => {
        this.tableData = res.data.rows;
        this.total = res.data.total;
      });
    },
    //编辑一个
    editOne(e) {
      this.dialogVisible = true;
      this.editId = e.id
      let data = { id: e.id, systemId: this.appid };
      this.getPermission(data);
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
