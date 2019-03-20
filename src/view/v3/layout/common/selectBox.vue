<template>
  <div class="selectBox">
    <el-select :clearable="false" v-model="count_name"  placeholder="选择教材" @change="setBookId">
      <el-option
        v-for="item in bookList"
        :key="item._id"
        :label="item.bookName"
        :value="item._id"
      >
      </el-option>
      </el-select>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
      name: "selectBox",
      data () {
        return {
          bookList: [],
          bookId: '',
          count_name: ''
        }
      },
      mounted () {
        this.count_name = this.bookName
         this.$store.dispatch('cmsGetBookList', {userId: this.userId}).then(res => {
          if(!res.data.rows){
          }else{
               this.bookList = res.data.rows;
           if(!window.sessionStorage.getItem('bookName')){
              let data = res.data.rows;
              this.count_name = data[0].bookName
              this.$store.commit('SET_BOOK_NAME', data[0].bookName)
              sessionStorage.setItem('bookName', data[0].bookName);
              this.$store.commit('SET_BOOK_ID', data[0]._id)
              sessionStorage.setItem('bookId', data[0]._id)
           }
          }
        })
       
      },
      computed: {
        ...mapGetters(['bookName','userId'])
      },
      methods: {
        setBookId (val) {
          let data = this.bookList
          for (let i = 0; i < data.length; i++) {
            if (data[i]._id === val) {
              this.$store.commit('SET_BOOK_NAME', data[i].bookName)
              sessionStorage.setItem('bookName', data[i].bookName)
            }
          }
           this.$store.commit('SET_CAPTER_ID', "")
          sessionStorage.removeItem('chapterId')
          this.$store.commit('SET_BOOK_ID', val)
          sessionStorage.setItem('bookId', val)
        }
      }
    }
</script>

<style scoped>

</style>
