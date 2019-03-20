<template>
  <div class="source-list">
    <div class="top-bar clearfix">
        <v-selectBar></v-selectBar>
      <div class="search fr">
        <el-input type="text" prefix-icon="el-icon-search" @keyup.native.enter="searchFun"  placeholder="请输入搜索内容,回车搜索"></el-input>
      </div>
    </div>
   <div class="fl">
     <div class="ul-list"  v-if="list.length !==0">
       <ul class="ul">
         <li v-for=" (item , index) in list" :key="index">
           <div class="content">
             <router-link :to="'/preview/'+item._id" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
             </router-link>
             <div class="item-con">
               <h2 style="cursor: pointer;"><router-link :to="'/preview/'+item._id" tag="span" >{{item.title}}</router-link></h2>
               <el-rate :value="item.shareLevel"  disabled></el-rate>
               <p>附详细解答过程帮助学生更好的理解</p>
             </div>
             <div class="item-bottom clearfix">
               <div class="fl">
                 <span>大小: {{parseFloat(item.size/1024).toFixed(2)}}M</span>
                 <span>上传时间: {{item.createTime |timeReset }}</span>
               </div>
               <div class="fr item-b-l">
                 <span><router-link :to="'/preview/'+item._id" >在线预览</router-link></span>
                 <span><a :href="item.url">下载</a></span>
               </div>
             </div>
           </div>
         </li>
       </ul>
       <div class="page">
         <el-pagination
           class="pagebox"
           background
           @current-change="handleCurrentChange"
           @current-page="currentPage"
           :page-size="10"
           prev-text="上一页"
           next-text="下一页"
           layout="total, prev, pager, next"
           :total="total">
         </el-pagination>
       </div>
     </div>
     <div v-else class="ul-list" style="background-color: #ffffff;text-align: center;padding:60px 0; ">
       <img src="@/assets/download.png" alt="">
     </div>
     <div class="recommend">
     </div>
   </div>
    <v-right></v-right>
  </div>
</template>

<script>
import selectBar from '../common/selectBar'
import IndexRight from '../common/indexRight'
import {mapGetters} from 'vuex'
export default {
  name: 'sourceList',
  data () {
    return {
      list: [],
      total: 0,
      page: 1
    }
  },
  mounted () {
    this.getSourceList();
  },
  components: {
    'v-selectBar': selectBar,
    'v-right': IndexRight
  },
  filters: {
    timeReset (val) {
      let date = new Date(val)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  computed: {
    ...mapGetters(['topModelId', 'bookId', 'chapterId', 'typeId'])
  },
  methods: {
    searchFun (ev) {
      if (ev.target.value !== "") {
        this.$store.dispatch('getSource', {topModelId: this.topModelId, bookId: this.bookId, chapterId: this.chapterId, keyword: ev.target.value}).then(res => {
          this.total = res.resources.total
          this.list = res.resources.data
          this.page = 1
          this.$store.commit('SET_SELECT_INDEX', 0)
        })
      } else {
        this.getSourceList()
      }
    },
    getSourceList (page, typeId) {
   
      if (typeId) {
        this.$store.dispatch('getSource', {topModelId: this.topModelId, bookId: this.bookId, chapterId: this.chapterId, page: page, typeId: this.typeId}).then(res => {
          this.total = res.resources.total
          this.list = res.resources.data
        })
      } else {
        this.$store.dispatch('getSource', { topModelId: this.topModelId, bookId: this.bookId, chapterId: this.chapterId, page: page }).then(res => {
          this.total = res.resources.total
          this.list = res.resources.data
        })
      }
    },
    currentPage (val) {
      this.page = val
      this.getSourceList(val, this.typeId);
      window.scrollTo(top)
    },
    handleCurrentChange (val) {
      this.page = val
      this.getSourceList(val, this.typeId)
      window.scrollTo(top)
    }
  },
  watch: {
    chapterId: function (res) {
      if(!res){

      }else{
        this.getSourceList()
      }
    },
    typeId: function () {
      this.page = 1
      this.getSourceList(1, this.typeId)
    },
    $route: function (to, from) {
      this.$store.commit('SET_COVERFILE_URL', to.params.id)
    }
  }
}
</script>

<style scoped>

</style>
