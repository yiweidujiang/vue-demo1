<template>
  <div class="data-table">
    <el-row>
      <el-col :span="4">
        <el-tree ref="tree" :data="data2" default-expand-all @node-click="getCurrentKey"></el-tree>
      </el-col>
      <el-col :span="20">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="phaseName" label="学段"></el-table-column>
          <el-table-column prop="gradeName" label="年级"></el-table-column>
          <el-table-column prop="subjectName" label="学科"></el-table-column>
          <el-table-column prop="editionName" label="教材版本"></el-table-column>
            <el-table-column prop="yxbz" label="状态"></el-table-column>
          
         
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
  </div>
</template>
<script>
import { bookVersionList } from "@/api/v2";
export default {
  name: "bookVersion",
  created() {
    this.getbookVersionList();
  },
  data() {
    return {
      tableData: [],
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
  methods: {
    getbookVersionList() {
      let data = {
        limit: this.limit,
        offset: this.offset,
        gradeId: this.data2[0].children[0].id
      };
      bookVersionList(data).then(res => {
        this.tableData = res.data ? res.data.rows : res.data;
        this.total = res.data.total;
      });
    },
    getCurrentKey(e) {
      if (e.id && e.id != "") {
        console.log(e.id);
      }
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
      this.getUsers({ id: this.id, limit: res, offset: this.offset });
    },
    offset(res) {
      this.getUsers({ id: this.id, limit: this.limit, offset: res });
    }
  },
};
</script>

<style>
</style>
