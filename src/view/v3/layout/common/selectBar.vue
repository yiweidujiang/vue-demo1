<template>
  <ul class="bar-list fl">
    <li v-for="(item, index) in list" :key="index" :class="{'active':index===selectIndex}">
      <span @click="setTypeId(item._id, index)">{{item.typeName}}</span>
    </li>
    <!-- <li class="active">
      <span>全部</span>
    </li>
    <li>
      <span>课件</span>
    </li> -->
  </ul>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'selectBar',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$store.commit('SET_SELECT_INDEX', 0)
    this.getList()
  },
  computed: {
    ...mapGetters(['topModelId', 'selectIndex'])
  },
  methods: {
    getList () {
      this.$store.dispatch('getSelectBar', {topModelId: this.topModelId}).then(res => {
        this.list = res.resources.data
      })
    },
    setTypeId (val, index) {
      this.$store.commit('SET_SELECT_INDEX', index)
      this.$store.commit('SET_TYPE_ID', val)
    }
  }
}
</script>

<style scoped>

</style>
