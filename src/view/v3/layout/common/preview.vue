<template>
    <div class="test">
        <div id="pdfvuer">
              <div class="main" style="height:auto">
                 <div v-if="!error">
                   <pdf
                      v-show="loadedRatio === 1" 
                      ref="pdf" 
                      :src="propsSrc" 
                      :page="page"
                      @password="password"
                      @progress="loadedRatio = $event"
                      @error="errorPage"
                      @num-pages="numPages = $event" 
                      @link-clicked="page = $event"></pdf>
                    <v-loading v-show="loadedRatio < 1"></v-loading>
                 </div>
                 <div v-else>
                   <h1 style="text-align:center">文件错误</h1>
                 </div>
               </div>
            </div>
            <div id="buttons" class="btn-group" >
              <div class="btn-box">
                <el-button type="primary" round @click="page > 1 ? page-- : 1" size="mini"><i class="el-icon-arrow-left"></i>上一页</el-button>
                <a class="item">
                  {{page}} / {{ numPages ? numPages : '∞' }}
                </a>
                <el-button type="primary" round @click="page < numPages ? page++ : 1"  size="mini">下一页 <i class="el-icon-arrow-right"></i></el-button>
              </div>
            </div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
import LoadingVue from '../common/Loading1.vue';
export default {
    props:['propsSrc'],
    components: {
        pdf: pdf,
        'v-loading':LoadingVue
    },
    data () {
        return {
            show: true,
            loadedRatio: 0,
            page: 1,
            numPages: 0,
            error:false
        }
    },
    methods: {
        logContent(){
            this.$refs.pdf.pdf.forEachPage((page) => {
                return page.getTextContent().then(res => {
                 var text = res.items.map(item => item.str);
                    console.log(text);
            })
            })
        },
        next(){
            console.log(this.numPages)
            if(this.page >= this.numPages){
               this.page=this.numPages
            }else{
                this.page+=1
            }
        },
         prev(){
            console.log(this.numPages)
            if(this.page <= 1){
               this.page=1
            }else{
                this.page-=1
            }
        },
        errorPage(){
            this.error = true;
            this.numPages = '∞'
        },
        password: function(updatePassword, reason) {

            updatePassword(prompt('password is "test"'));
        },
    }
}
</script>

<style>

</style>
