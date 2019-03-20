<template>
  <div class="banding">
    <el-form ref="resultForm" :model="resultForm" :rules="roles" label-width="80px">
      <el-form-item label="选择学校" prop="arrSchool">
        <el-select v-model="resultForm.arrSchool" @change="selectSchool">
          <el-option
            v-for="item in arrSchoolList"
            :key="item.xxJbxxId"
            :label="item.xxmc"
            :value="item.xxJbxxId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择年级" prop="gradeId">
        <el-select v-model="resultForm.gradeId" @change="selectNj">
          <el-option
            v-for="item in arrNjList"
            :key="item.xxNjxxId"
            :label="item.njmc"
            :value="item.xxNjxxId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择科目" prop="arrSubject">
        <el-select v-model="resultForm.arrSubject" @change="selectSubject">
          <el-option
            v-for="item in arrSubjectList"
            :key="item.subjectId"
            :label="item.subjectName"
            :value="item.subjectId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择书籍" prop="bookId">
        <el-select v-model="resultForm.bookId">
          <el-option
            v-for="item in arrBookList"
            :key="item.bookId"
            :label="item.bookName"
            :value="item.bookId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择班级" prop="class1">
        <el-select v-model="resultForm.class1">
          <el-option
            v-for="item in arrClass"
            :key="item.xxBjxxId"
            :label="item.bjmc"
            :value="item.xxBjxxId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="submitBook('resultForm')">提交</el-button>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {requestB, requestD, requestE} from "@/utils/request";
  import {getToken} from "../utils/auth";

  export default {
    name: "binDing",
    data () {
      return {
        resultForm: {
         class1: '',
          gradeId: '',
         arrSchool: '',
         arrSubject: '',
          bookId: ''
       },
        roles: {
          class1: [{ required: true, message: '请选择班级', trigger: 'change' }],
          gradeId: [{ required: true, message: '请选择年级', trigger: 'change' }],
          arrSchool: [{ required: true, message: '请选择学校', trigger: 'change' }],
          arrSubject: [{ required: true, message: '请选择学科', trigger: 'change' }],
          bookId: [{ required: true, message: '请选择书籍', trigger: 'change' }]
        },
        subjectName: '',
        arrNjList: [],
        dataList: [],
        arrClass: [],
        arrSchoolList: [],
        arrSubjectList: [],
        arrBookList: []
      }
    },
    computed: {
      ...mapGetters(['topModelId', 'userId'])
    },
    mounted () {
      this.getSchoolList()
    },
    methods: {
      getSchoolList () {
        requestD({
          method: 'post',
          url: '/manage/school/schoolList',
        }).then(res => {
          this.arrSchoolList = res.data.rows
        })
      },
      selectSchool (val) {
       this.getList(val)
      },
      getBook (val) {
        requestE({
          method: 'get',
          url: '/pc/bookVersion/list',
          params: {
            xxNjxxId: val
          }
        }).then(res => {
          this.arrSubjectList = res.data.rows
        })
      },
      submitBook (formName) {
        function getGuid32 () {
          var rt_str = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          for (let i = 0; i < 31; ++i) {
            var num = Math.floor(Math.random() * (26 + 26 + 10));
            var ch_str;
            if (num < 10) {
              ch_str = num.toString();
            }
            else if (num < 10 + 26) {
              ch_str = String.fromCharCode(65 + num - 10);
            }
            else {
              ch_str = String.fromCharCode(97 + num - 10 - 26);
            }
            rt_str += ch_str;
          }
          return rt_str.toLowerCase()
        }
        let guid = getGuid32()
        let json = {
          "classid": this.resultForm.class1,
          "id": guid,
          "teachClassData": "[{'childId':'" + guid + "','gradeId':'" + this.resultForm.gradeId + "','subjectName': '" + this.subjectName + "' ,'bookId':'" + this.resultForm.bookId + "','chapterId':'1','userId':'" + this.userId + "'}]",
          "type": 1
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
              // 提交绑定
            // console.log(guid)
            // console.log(this.resultForm)
            this.resultForm.userId = this.userId
            this.resultForm.topModelId = this.topModelId
            this.$store.dispatch('cmsSetBeike', this.resultForm)
            this.$store.dispatch('cmsBanding', json).then(res => {
             this.$message({
               type: res.code === 1 ? 'success' : 'error',
               message: res.code === 1 ? '绑定成功': '绑定失败'
             })
              this.$router.push({path: '/'})
            })



          } else {
            console.log('err')
          }
        })
      },
      getList (val) {
        requestD({
          method: 'post',
          url: '/manage/school/classList',
          params: {
            xxJbxxId: val
          }
        }).then(res => {
          this.dataList = res.data.rows
          let data = res.data.rows
          let arrNj = []
          for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
              if (data[i].xxNjxxId === data[j].xxNjxxId) {
                i++
                j = i
              }
            }
            arrNj.push(data[i])
          }
          this.arrNjList = arrNj
        })
      },
      selectSubject (val) {
        let data = this.arrSubjectList
        let arr = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].subjectId === val) {
            console.log(data[i])
            this.subjectName = data[i].subjectName
            arr.push(data[i])
          }
        }
        this.arrBookList = arr
      },
      selectNj (val) {
        let data = this.dataList
        let arr = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].xxNjxxId === val) {
            arr.push(data[i])
          }
        }
        this.arrClass = arr
        this.getBook(val)
      }
    },
    watch: {
      'resultForm.gradeId': function () {
        this.resultForm.class1 = null
        this.resultForm.arrSubject = null

      },
      'resultForm.arrSubject': function () {
        this.resultForm.bookId = null
      }
    }
  }
</script>

<style scoped>

</style>

