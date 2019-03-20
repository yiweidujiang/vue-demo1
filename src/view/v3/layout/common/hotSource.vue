<template>
  <div class="hot-source">
    <div class="title">
      <span>热门资源</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <i v-if="index < 3" :class="'icon  '+ 'icon'+index"></i>
          <i v-else class="icon icons">{{(index+1)}}</i>
          <h4 class="s-title"><router-link :to="'/preview/'+item._id" tag="a" style="color: inherit;">{{item.title}}</router-link></h4>
          <p class="s-download">下载: {{item.statistic.downloadNum}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'hotSource',
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      ...mapGetters(['topModelId'])
    },
    methods: {
      getData () {
        this.$store.dispatch('gethotSource', {topModelId: this.topModelId}).then(res => {
          this.list = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
