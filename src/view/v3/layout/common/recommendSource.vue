<template>
  <div class="recommend-source">
    <div class="title">
      <span>推荐资源</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <span><em class="icon">教</em> <router-link :to="'/preview/'+item._id" >{{item.title}}</router-link></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'recommendSource',
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
        this.$store.dispatch('gethotSource', {topModelId: this.topModelId, sortValue: '-1'}).then(res => {
          this.list = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
