<template>
  <div class="login">
    <div class="login-box clearfix">
      <div class="login-box-l">
        <div style="padding: 100px 60px;font-size: 12px;">
          <el-table :data="bandingList"  border style="margin-bottom: 50px;">
            <el-table-column
              prop="cmsTeachingClassInfo.subjectname"
              label="科目"
              width="60"
            ></el-table-column>
            <el-table-column
              label="年级"
              width="80"
            >
              <!--<template slot-scope="scope">-->
                <!--<span>{{JSON.parse(scope.row.cmsTeachingClassInfo.reserve1).njName}}</span>-->
              <!--</template>-->
              <template slot-scope="scope">
                <span v-text="dataRes(scope.row.cmsTeachingClassInfo.reserve1).njName"></span>
              </template>
            </el-table-column>
            <el-table-column
              label="班级"
              width="80"
            >
              <template slot-scope="scope">
                <span v-text="dataRes(scope.row.cmsTeachingClassInfo.reserve1).className"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="textbookResource.bookName"
              label="教材目录"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="deleteArr(scope)"  type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="login-box-r">
        <div class="login-title">
          <div class="login-logo">
            <img src="@/assets/images/logo.png" alt="">
          </div>
          <h3>绑定班级科目</h3>
        </div>
        <div style="padding: 60px 40px 0">
          <el-form ref="resultForm" :model="resultForm" :rules="roles" label-width="80px" >
            <el-form-item label="选择学校" prop="arrSchool" >
              <el-select v-model="resultForm.arrSchool" @change="selectSchool" >
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
           <el-form-item>
             <el-button type="primary" @click="submitBook('resultForm')">绑定信息</el-button>
             <el-button @click="beike" type="success">开始备课</el-button>
           </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {requestB, requestD, requestE} from "@/utils/request";
import {getToken} from "../../../utils/auth";

export default {
  name: "binDing",
  data () {
    return {
      bandingList:[],
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
      NjName: '',
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
    this.getSchoolList();
    this.getBandingList()
  },
  methods: {
    getBandingList(){
      this.$store.dispatch('cmsGetBook', {userId: this.userId}).then(res => {
        this.bandingList = res.data.rows
      })
    },
    dataRes(val){
      return JSON.parse(val)
      // njName
    },
    // 删除绑定
    deleteArr(scope){
      let dataId = scope.row.cmsTeachingClassInfo.id;
      this.$store.dispatch('cmsDeleteBanding', {classInfoId: dataId}).then(res => {
        if(res.code === 1 ){
          this.$message({
            type:'success',
            message: res.data
          })
          this.getBandingList()
        }else {
          this.$message({
            type:'error',
            message: res.data
          })
        }
      }).catch(err => {
        this.$message.error(err.message)
      })

    },
    // 开始备课
    beike(){
      this.$router.push({path: '/home'})
    },
    getSchoolList () {
      requestD({
        method: 'post',
        url: '/manage/school/schoolList?token=' + getToken(),
      }).then(res => {
       if(!res.data.rows){
       }else{
        let data = res.data.rows
        this.arrSchoolList =data;
        this.resultForm.arrSchool = data[0].xxmc;
        this.getList(data[0].xxJbxxId)
       }
       
      })
    },
    selectSchool (val) {
      this.getList(val)
    },
    getBook (val) {
      requestE({
        method: 'get',
        url: '/pc/bookVersion/list?token=' + getToken(),
        params: {
          xxNjxxId: val
        }
      }).then(res => {
        this.arrSubjectList = res.data.rows
      })
    },
    submitBook (formName) {
      sessionStorage.setItem('chapterId', '')
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
        "teachClassData": "{'childId':'" + guid + "'," +
          "'gradeId':'" + this.resultForm.gradeId + "'" +
          ",'subjectName': '" + this.subjectName + "'" +
          " ,'bookId':'" + this.resultForm.bookId + "'" +
          ",'chapterId':'1'," +
          "'userId':'" + this.userId + "'}",
        "type": 1
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交绑定
          this.resultForm.userId = this.userId
          this.resultForm.topModelId = this.topModelId;
          let result = {
            cmsTeachingClass:{
            },
            cmsTeachingClassInfo: {
            }
          }
          let data = this.arrClass;
          var $this = this;
          let ff = {}
          data.forEach((res) => {
            if(res.xxBjxxId ===  $this.resultForm.class1){
             ff = res
            }
          })
          result.cmsTeachingClass.classid = this.resultForm.class1;
          this.resultForm.njName = this.NjName;
          this.resultForm.className = ff.bjmc
          result.cmsTeachingClass.teachClassData = JSON.stringify(this.resultForm);
          result.cmsTeachingClassInfo.bookid =  this.resultForm.bookId;
          result.cmsTeachingClassInfo.classid =  this.resultForm.class1;
          result.cmsTeachingClassInfo.subjectname =   this.subjectName;
          result.cmsTeachingClassInfo.userid =  this.userId
         this.$store.dispatch('cmsSetBeike', this.resultForm)
          this.$store.dispatch('cmsBanding', result).then(res => {
            this.$message({
              type: res.code === 1 ? 'success' : 'error',
              message: res.code === 1 ? '绑定成功': res.data,
              duration: 1000,
              onClose:() => {
                this.getSchoolList()
               this.getBandingList()
              }
            })
          })
        } else {
          console.log('err')
        }
      })
    },
    getList (val) {
      requestD({
        method: 'post',
        url: '/manage/school/classList?token=' + getToken(),
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
       let resu = data.find((res) => {
         if(val === res.subjectId){
           return res.subjectName
         }
       })
      this.subjectName = resu.subjectName
      let arr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].subjectId === val) {

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
      this.NjName = arr[0].njmc
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

