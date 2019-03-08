<template>
  <div class="data-table">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          :default-expand-all="false"
          :filter-node-method="filterNode"
          :default-expanded-keys='["677f48ebfb9bd66fe0506e0a1f013e04"]'
          ref="tree2"
        ></el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { organizationList } from "@/api/v1";
import {mapGetters} from 'vuex'
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
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  computed:{
    ...mapGetters(['appid'])
  },
  methods: {
    // get
    getorganizationList(){
      let data = {id:this.appid}
      organizationList(data).then(res=>{
        this.data2 = res.data.rows
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    }
  }
};
</script>

<style>
</style>
