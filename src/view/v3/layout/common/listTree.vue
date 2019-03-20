<template>
  <div class="js-tree">
    <v-select></v-select>
    <div style="padding: 10px 0 25px 0; background-color: #fff;">
      <el-tree

        class="filter-tree"
        :data="dataTree"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :current-node-key="chapterId"
        @node-click="getSource"
        ref="tree2">
      </el-tree>
    </div>
  </div>
</template>

<script>
import selectBox from './selectBox'
import {mapGetters} from 'vuex'
import $ from 'jquery'
export default {
  name: 'Tree',
  components: {
    'v-select': selectBox
  },
  props: ['setData'],
  mounted () {
   if(window.sessionStorage.getItem('bookId')){
       this.getBookTree()
   }
 
  },
  data () {
    return {
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'chapterName',
        id: 'chapterId'
      },
      i: '',
      j: ''
    }
  },
  computed: {
    ...mapGetters(['topModelId', 'bookId', 'chapterId'])
  },
  methods: {
    getBookTree () {
      this.$store.dispatch('getBookTree', {topModelId: this.topModelId, bookId: this.bookId}).then(res => {
        this.dataTree = res
        this.$nextTick(() => {
          console.log(this.$refs['tree2'].$children)
          if (sessionStorage.getItem('chapterId')) {
            for (var i = 0; i < this.dataTree.length; i++) {
              if (this.dataTree[i].children) {
                for (var j = 0; j < this.dataTree[i].children.length; j++) {
                  if (this.dataTree[i].children[j].chapterId === sessionStorage.getItem('chapterId')) {
                    this.i = i
                    this.j = j;
                    this.$refs['tree2'].$children[i][j].$el.setAttribute('class','el-tree-node is-expanded is-focusable')
                   // $(`.el-tree>.el-tree-node:nth-child(${this.i + 1})>.el-tree-node__children>.el-tree-node:nth-child(${this.j + 1})`).addClass('is-current')
                    break
                  }
                }
              }
            }
          } else {
             this.$refs['tree2'].$children[i][j].$el.setAttribute('class','el-tree-node is-expanded')
            //$(`.el-tree>.el-tree-node:nth-child(1)>.el-tree-node__children>.el-tree-node:nth-child(1)`).addClass('is-current')
            if (!res[0].children) {
              this.$store.commit('SET_CAPTER_ID', res[0].chapterId)
            } else {
              this.$store.commit('SET_CAPTER_ID', res[0].children[0].chapterId)
            }
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getSource (data) {
      $(`.el-tree>.el-tree-node:nth-child(${this.i + 1})>.el-tree-node__children>.el-tree-node:nth-child(${this.j + 1})`).removeClass('is-current')
      if (!data.children) {
          this.$store.commit('SET_TOPMODEL_ID', data.topModelId)
          this.$store.commit('SET_BOOK_ID', data.bookId)
          this.$store.commit('SET_CAPTER_ID', data.chapterId)
          this.$store.commit('SET_SELECT_INDEX', 0)
          sessionStorage.setItem('chapterId', data.chapterId)
          sessionStorage.setItem('bookId', data.bookId)
          sessionStorage.setItem('treee', data.bookId)
      }
    }
  },
  watch: {
    'bookId': function () {
      this.getBookTree()
      $(`.el-tree>.el-tree-node:nth-child(${this.i + 1})>.el-tree-node__children>.el-tree-node:nth-child(${this.j + 1})`).addClass('is-current')
    }
  }
}
</script>
<style scoped>

</style>
