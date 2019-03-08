<template>
  <div class="layout">
    <h1>Hello World</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$http.get('/api/test').then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>
