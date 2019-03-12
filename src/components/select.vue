<template>
  <div>
    <el-select v-model="value" @change="getNj" >
      <el-option
        v-for="(item, index) in njList"
        :key="index"
        :value="item.xxNjxxId"
        :label="item.njmc"
      ></el-option>
    </el-select>
    <el-select v-model="value2" >
      <el-option
        v-for="(item, index) in bjList"
        :key="index"
        :value="item.xxBjxxId"
        :label="item.bjmc"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ClassList } from "@/api/v1";
import { debug } from "util";
export default {
  name: "selectSchool",
  created() {
    this.getClassList();
  },
  mounted() {
  
    if (this.selectData != undefined) {
      this.value = this.selectData.xxNjxxId;
      this.value2 = this.selectData.xxBjxxId;
      let data = { xxJbxxId: this.organId };
      ClassList(data).then(res => {
        let arr = res.data ? res.data.rows : [];
        this.bjList = arr.filter(item => {
          return item.xxBjxxId == this.selectData.xxBjxxId;
        });
      });
    } else {
      this.value = "";
      this.value2 = "";
    }
  },
  props: ["selectData"],
  data() {
    return {
      bjList: [],
      njList: [],
      value: "",
      value2: "",
      dataList: [],
      label2: "",
      label1: ""
    };
  },
  computed: {
    ...mapGetters(["organId"])
  },
  methods: {
    //
    getBj() {
      
    },
    //  获取年级
    getClassList() {
      let data = { xxJbxxId: this.organId };
      ClassList(data).then(res => {
        let arr = res.data ? res.data.rows : [];
        this.dataList = res.data ? res.data.rows : [];
        let hash = {};
        const newArr = arr.reduceRight((item, next) => {
          hash[next.njmc] ? "" : (hash[next.njmc] = true && item.push(next));
          return item;
        }, []);
        this.njList = newArr.reverse();
      });
    },
    getNj(e) {
      let data = this.dataList;
      let t = data.filter(item => {
        return item.xxNjxxId == e;
      });
      this.label2 = t[0].bjmc;
      let t2 = data.filter(item=>{
          return  item.xxNjxxId == e
      });
      this.label1 =t2[0].njmc
      this.value2 = t[0].xxBjxxId;
      this.bjList = t;
    }
  },
  watch: {
    
    selectData: function(res,list) {
         
      if (res != undefined) {
        this.value = res.xxNjxxId;
        this.value2 = res.xxBjxxId;
        let data = { xxJbxxId: this.organId };
        ClassList(data).then(result => {
          let arr = result.data ? result.data.rows : [];
          let t3 = arr.filter(item => {
            return item.xxNjxxId == res.xxNjxxId;
          });
          this.bjList = t3
        });
      } else {
        this.value = "";
        this.value2 = "";
      }
    },
  }
};
</script>

<style>
</style>
