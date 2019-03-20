<template>
  <div class="Select">
    <div class="select">
      <div class="selects">
        <div class="steps">
          <el-steps :active="active" direction="vertical">
            <el-step title="选择您的授课阶段" description=""></el-step>
            <el-step title="选择您的授课年级"></el-step>
            <el-step title="选择您的授课科目"></el-step>
            <el-step title="选择教材版本" description=""></el-step>
          </el-steps>
        </div>
        <!--//学段-->
        <div class="xd mod">
          <div class="radio">
            <el-radio-group v-model="radio1">
              <el-radio v-for="(item, index) in data" :label="item.phaseName" border checked="false" :style="index==0?style1:index==1&&phaseId=='5b97362d4af5851834f4b7a2'?style2:''" :key="index" @change="getGrade(item.topModelId,item._id)"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <!--年级-->
        <div class="nj mod">
          <div class="radio" @click="clickNj()">
            <el-radio-group v-model="radio2">
              <el-radio v-for="(item, index) in grade1" :label="item.gradeName" border checked="false" class="" @change="getSubject(item.topModelId,item.phaseId,item._id)" :key="index"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <!--科目-->
        <div class="xk mod">
          <div class="radio" @click="clickXk()">
            <el-radio-group v-model="radio3">
              <el-radio v-for="(item, index) in subject1" :key="index" :label="item.subjectName" border checked="false" class="" @change="getEdition(topModelId,phaseId,item.subjectId)"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <!--版本-->
        <div class="bb mod">
          <div class="radio" @click="clickBb()">
            <el-radio-group v-model="radio4">
              {{edition1}}
              <el-radio v-for="(item, index) in edition1" :key="index" :label="item.editionName" border checked="false" class="" @change="getDetail(topModelId,item.editionId,phaseId,subjectId)"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="book mod">
          <div class="radio" >
            <el-radio-group v-model="radio5">
              <el-radio v-for="(item, index) in bookName" :key="index" :label="item.bookName" border checked="false" class="" @change="getDetail(topModelId,item.editionId,phaseId,subjectId)"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="submit">
          <el-button type="primary" :disabled="active==4?false:true" @click="submitData">确定</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {requestB} from "@/utils/request"
import {mapGetters} from 'vuex'
export default {
    name: 'v-select',
    data(){
      return {
        active: 0,
        radio1: '',
        radio2: '',
        radio3: '',
        radio4: '',
        radio5: '',
        data: '',   // 学段数据
        grade1: '',  // 年级数据
        subject1: '',   //学科数据
        edition1: '',    //版本数据
        bookName: '',
        phaseId: '5b97362d4af5851834f4b7a2',    //学段id
        njId: '',        //年级id
        subjectId: '5b9732664af5851834f4b781',  //学科id
        editionId: '',   //版本id
        style1: {
          display: 'none'
        },
        style2: {
          color: '#fff',
          backgroundColor: '#409eff'
        }
      }
    },
    mounted () {
      this.getDate(this.topModelId);
      this.getGrade(this.topModelId,this.phaseId);
      this.getSubject(this.topModelId,this.phaseId);
      this.getEdition(this.topModelId,this.phaseId,this.subjectId);
    },
  computed: {
    ...mapGetters(['topModelId'])
  },
    methods: {
      // 获取学段数据
      getDate (ev) {
        requestB({
          url: '/v2/phase/list',
          method: 'get',
          params: {
            topModelId: ev
          }
        }).then(res => {
          this.data = res.resources.data
        })
      },
      // 点击学段获取年级
      getGrade (topModelId, phaseId) {
        this.phaseId = phaseId
        this.active = 1
        requestB({
          url: '/v2/grade/list/phase',
          method: 'get',
          params: {
            topModelId: topModelId,
            phaseId: phaseId
          }
        }).then(res => {
          this.grade1 = res.resources.data
        })
      },
      // 点击年级获取学科
      getSubject (topModelId, phaseId, njId) {
        this.njId = njId
        requestB({
          url: '/v2/book/subjectList/byPhase',
          method: 'get',
          params: {
            topModelId: topModelId,
            phaseId: phaseId
          }
        }).then(res => {
          this.subject1 = res.resources.data
        })
        // this.active=2;
      },
      // 点击学科获取版本
      getEdition (topModelId, phaseId, subjectId){
        this.subjectId = subjectId
        // this.active=3;
        requestB({
          url: '/v2/book/editionList/byPhaseAndSubject',
          method: 'get',
          params: {
            topModelId: topModelId,
            phaseId: phaseId,
            subjectId: subjectId
          }
        }).then(res => {
          console.log(res)
          this.edition1 = res.resources.data
        })
      },
      // 点击版本获取课本
      getDetail (topModelId, editionId, phaseId, subjectId) {
        this.editionId = editionId
        requestB({
          url: '/v2/book/list/byEdition',
          method: 'get',
          params: {
            topModelId: topModelId,
            editionId: editionId,
            phaseId: phaseId,
            subjectId: subjectId
          }
        }).then(res => {
          this.bookName = res.resources.data
        })
      },
      clickNj () {
        this.active = 2
      },
      clickXk () {
        this.active = 3
      },
      clickBb () {
        this.active = 4
      },
      submitData () {
        console.log(this.radio5)
        console.log(this.radio2)
      }
    },
    watch: {
      grade1: function () {
        this.getSubject(this.topModelId, this.grade1[0].phaseId)
      },
      subject1: function () {
        this.getEdition(this.topModelId, this.phaseId, this.subject1[0].subjectId)
      }
    },
  }
</script>
<style scoped></style>
