<template>
    <div class="jibei">
      <div class="lesson_pre">
        <div class="title">推荐</div>
        <div class="lesson_news news">
          <div class="lesson_jibei">
            <ul id="lesson_jibeis">
              <li v-for="(item, index) in jibeiList" :key="index">
                <router-link :to="'/detail/' + item.actionId">
                  <img src="@/assets/lesson.gif" alt="">
                  <div class="doing" :style="{backgroundColor: item.status===2?'red':'#ccc'}">
                    <span>{{item.status | Statue}}</span>
                  </div>
                  <div class="lesson_titles">
                    <p class="lesson_num">第一课</p>
                    <span class="lesson_title">{{item.actionName | textSlice5}}</span>
                  </div>
                  <p class="lesson_subjects"><span class="lesson_subject">语文</span><span class="subject_num">一单元</span></p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first">
            <!--全部-->
            <div v-if="list.length > 0" class="content">
              <ul class="contents">
                <li v-for="(item, index) in list" :key="index">
                  <router-link :to="'/detail/'+item.actionId">
                    <div class="con_top">
                      <div class="con_img">
                        <img :src="item.cover" alt="" v-if="item.cover">
                        <img src="@/assets/jitibeike.png" alt="" v-else>
                      </div>
                      <div class="con_text">
                        <p>{{item.actionName}}</p>
                        <span>{{item.description | textSlice}}</span>
                      </div>
                      <div class="con_state">
                        <div :style="{borderColor: item.status===2?'red':'#ccc', borderLeftColor: '#fff'}">
                          <span>{{item.status | Statue}}</span>
                        </div>
                        <!--<img src="@/assets/jibei03.gif" alt="">-->
                      </div>
                    </div>
                    <div class="con_bottom">
                      <div class="con_time">
                        <span>
                          <!-- <em>{{item.startTime}}</em> -->
                          <em v-if="item.status === 1">还剩 {{item.startTime | timeFilter}}开始</em>
                          <em v-if="item.status === 2">还剩 {{item.endTime | timeFilter}}结束</em>
                          <em v-if="item.status === 3">{{item.endTime | timeSlice}}&nbsp;&nbsp;时结束</em>
                        </span>
                      </div>
                      <div class="con_num">
                        <span>参与人数：<em>{{item.actCurrentNum}}</em></span>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
              <div class="page">
                <el-pagination
                  class="pagebox"
                  background
                  prev-text="上一页"
                  next-text="下一页"
                  @current-change="currentChange"
                  layout="total, prev, pager, next"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
            <div v-else class="ul-list" style="background-color: #ffffff;text-align: center;padding:60px;width: 1200px;">
              <img src="@/assets/download.png" alt="">
            </div>
          </el-tab-pane>
          <el-tab-pane label="我发起的" name="second">
            <!--我发起的-->
            <div v-if="list1.length > 0" class="content">
              <ul class="contents">
                <li v-for="(item, index) in list1" :key="index">
                  <router-link :to="'/detail/'+item.actionId">
                    <div class="con_top">
                      <div class="con_img">
                        <img :src="item.cover" alt="" v-if="item.cover">
                        <img src="@/assets/jitibeike.png" alt="" v-else>
                      </div>
                      <div class="con_text">
                        <p>{{item.actionName}}</p>
                        <span>{{item.description | textSlice}}</span>
                      </div>
                      <div class="con_state">
                        <div :style="{borderColor: item.status===2?'red':'#ccc', borderLeftColor: '#fff'}">
                          <span>{{item.status | Statue}}</span>
                        </div>
                        <!--<img src="@/assets/jibei03.gif" alt="">-->
                      </div>
                    </div>
                    <div class="con_bottom">
                      <div class="con_time">
                         <span>
                          <em v-if="item.status === 1">还剩 {{item.startTime | timeFilter}}开始</em>
                          <em v-if="item.status === 2">还剩 {{item.endTime | timeFilter}}结束</em>
                          <em v-if="item.status === 3">{{item.endTime | timeSlice}}&nbsp;&nbsp;时结束</em>
                        </span>
                      </div>
                      <div class="con_num">
                        <span>参与人数：<em>{{item.actCurrentNum}}</em></span>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
              <div class="page">
                <el-pagination
                  class="pagebox"
                  background
                  prev-text="上一页"
                  next-text="下一页"
                  @current-change="currentChange1"
                  layout="total, prev, pager, next"
                  :total="total1"
                >
                </el-pagination>
              </div>
            </div>
            <div v-else class="ul-list" style="background-color: #ffffff;text-align: center;padding:60px;width: 1200px;">
              <img src="@/assets/download.png" alt="">
            </div>
          </el-tab-pane>
          <el-tab-pane label="我参与的" name="third">
            <!--我参与的-->
            <div v-if="list3.length > 0" class="content">
              <ul class="contents">
                <li v-for="(item, index) in list3" :key="index">
                  <router-link :to="'/detail/'+item.actionId">
                    <div class="con_top">
                      <div class="con_img">
                        <img :src="item.cover" alt="" v-if="item.cover">
                        <img src="@/assets/jitibeike.png" alt="" v-else>
                      </div>
                      <div class="con_text">
                        <p>{{item.actionName}}</p>
                        <span>{{item.description | textSlice}}</span>
                      </div>
                      <div class="con_state">
                        <div :style="{borderColor: item.status===2?'red':'#ccc', borderLeftColor: '#fff'}">
                          <span>{{item.status | Statue}}</span>
                        </div>
                        <!--<img src="@/assets/jibei03.gif" alt="">-->
                      </div>
                    </div>
                    <div class="con_bottom">
                      <div class="con_time">
                         <span>
                          <em v-if="item.status === 1">还剩 {{item.startTime | timeFilter}}开始</em>
                          <em v-if="item.status === 2">还剩 {{item.endTime | timeFilter}}结束</em>
                          <em v-if="item.status === 3">{{item.endTime | timeSlice}}&nbsp;&nbsp;时结束</em>
                        </span>
                      </div>
                      <div class="con_num">
                        <span>参与人数：<em>{{item.actCurrentNum}}</em></span>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
              <div class="page">
                <el-pagination
                  class="pagebox"
                  background
                  prev-text="上一页"
                  next-text="下一页"
                  @current-change="currentChange3"
                  layout="total, prev, pager, next"
                  :total="total3"
                >
                </el-pagination>
              </div>
            </div>
            <div v-else class="ul-list" style="background-color: #ffffff;text-align: center;padding:60px;width: 1200px;">
              <img src="@/assets/download.png" alt="">
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="add_new" @click="dialogVisible = !dialogVisible">
          <img src="@/assets/jibei01.gif" alt="">
          <span>+新的活动</span>
        </div>
      </nav>
        <!-- 添加集体备课 活动-->
        <el-dialog
          title="添加集备活动"
          :visible.sync="dialogVisible"
          width="540px"
          :before-close="closeDialog1"
        >
          <el-form :model="jibeiForm" :rules="rules" ref="jibeiForm" label-width="100px">
            <el-form-item label="学段" prop="phase">
              <el-select placeholder="请选择学段" v-model="jibeiForm.phaseId" @change="selectPhaseId">
                <el-option v-for="(item, index) in sectionList" :key="index" :label="item.phaseName" :value="item._id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学科" prop="subject">
              <el-select placeholder="请选择学科" v-model="jibeiForm.subjectId">
                <el-option v-for="(item, index) in subjectList" :key="index" :label="item.subjectName" :value="item.subjectId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动标题" prop="actionName">
              <el-input v-model="jibeiForm.actionName" placeholder="输入1-10个字符的活动标题" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="活动封面" prop="picture">
              <el-upload
                action="http://192.168.18.115:3003/v1/file/upload"
                list-type="picture-card"
                :auto-upload="true"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="uploadSuccessFM"
              >
                <img v-if="imageUrl" :src="imageUrl" style=" width: 148px; height: 148px;display: block;" class="avatar">
                <i v-else class="el-icon-plus"></i>
                <!--<div slot="tip" class="el-upload__tip">只能上传一张</div>-->
              </el-upload>
              <el-dialog :visible.sync="dialogVisibleFM">
                <img width="100%" :src="dialogImageUrlFM" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="活动内容" prop="content">
              <el-input  :rows="4" resize="none" maxlength=301  type="textarea" v-model="jibeiForm.content" placeholder="输入活动内容,限制300个字符"></el-input>
            </el-form-item>
            <el-form-item label="活动要求" prop="description">
              <el-input :rows="4" resize="none" type="textarea" maxlength=301 v-model="jibeiForm.description" placeholder="输入活动要求,限制300个字符"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="jibeiForm.startTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :placeholder="startTime()"
                @change = "nowTime"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="jibeiForm.endTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="结束时间"
                @change="endTime"
              >
              </el-date-picker>
            </el-form-item>
            <!--<el-form-item label="发起人" prop="">
              <el-checkbox-group v-model="originator">
                <el-checkbox v-for="(item, index) in selectMember" :key="index" :label="item.userId">{{item.userName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>-->
            <el-form-item label="参与人" prop="members">
              <!--<el-checkbox-group v-model="members">
                <el-checkbox v-for="(item, index) in selectMember" :key="index" :label="item.userId">{{item.realName}}</el-checkbox>
              </el-checkbox-group>-->
              <el-select v-model="members" multiple placeholder="请选择">
                <el-option
                  v-for="(item, index) in selectMember"
                  :key="index"
                  :label="item.realName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('jibeiForm')">提交内容</el-button>
              <el-button type="primary" @click="resetForm('jibeiForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'jibei',
  data () {
    return {
      activeName: 'first',
      dialogVisible: false,
      dialogVisibleFM: false,
      dialogImageUrlFM: '',
      time1: [],
      fileListFM: '',
      sectionList: [],  // 学段列表
      subjectList: [],  // 学科列表
      selectMember: [],  // 参与人
      originator: [],
      members: [],
      jibeiForm: {
        actionName: '',
        content: '',
        description: '',
        startTime: '',
        endTime: '',
        actionType: '',
        cover: '',
        phaseId: '',
        subjectId: '',
        cmsCollectiveTeachingActionParticipantList: []
      },
      imageUrl: '',
      rules: {
        phase: [],
        subject: [],
        actionName: [
          {required: true, message: '活动标题不能为空', trigger: 'change'},
          {max: 10, message: '不能超过10个字符', trigger: 'change'}
        ],
        picture: [],
        content: [
          {required: true, message: '活动内容不能为空', trigger: 'change'},
          {max: 300, message: '不能超过300个字符', trigger: 'change'},
          {min: 5, message: '请输入5-300个字符', trigger: 'change'}
        ],
        description: [
          {required: true, message: '活动要求不能为空', trigger: 'change'},
          {max: 300, message: '不能超过300个字符', trigger: 'change'},
          {min: 5, message: '请输入5-300个字符', trigger: 'change'}
        ],
        startTime: [
          {required: true, message: '开始时间不能为空', trigger: 'change'}],
        endTime: [
          {required: true, message: '结束时间不能为空', trigger: 'change'}
        ],
        members: []
      },
      total: 0,
      total1: 0,
      total3: 0,
      page: 1,
      page1: 1,
      page3: 1,
      list: [],
      list1: [],
      list3: [],
      jibeiList: [],
      userId1: sessionStorage.getItem('userId')
    }
  },
  mounted () {
    this.getAllList()   // 获取推荐活动列表
    this.banner()  // 推荐列表自动切换
    this.getList() // 获取全部活动
    this.getList({type: 1})  // 获取我发起的活动
    this.getList({type: 3})  // 获取我参与的活动
    this.GetSection({topModelId: '59c1c48e4130a7401770154e'})   // 获取学段id
    this.getSelectMember()  // 获取参与被选人员
  },
  methods: {
    handleClick (tab, event) {},
    startTime () {
      function timeD (val) {
        if (val < 10) {
          return '0' + val
        }
        return val
      }
      let date = new Date()
      let year = date.getFullYear()
      let month = timeD(date.getMonth() + 1)
      let day = timeD(date.getDate())
      let hour = timeD(date.getHours())
      let minute = timeD(date.getMinutes())
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00'
    },
    nowTime (ev) {
      let startTime = this.startTime()
      if (new Date(ev).getTime() < new Date(startTime).getTime()) {
        this.$message.error('开始时间不能小于系统时间')
        this.jibeiForm.startTime = this.startTime()
      }
    },
    endTime () {
      if (new Date(this.jibeiForm.endTime).getTime() < new Date(this.jibeiForm.startTime).getTime()) {
        this.$message.error('结束时间不能小于开始时间')
        this.jibeiForm.endTime = this.jibeiForm.startTime
      }
    },
    // 获取参与被选人
    getSelectMember () {
      this.$store.dispatch('cmsJibeiMember').then(res => {
        // console.log(res)
        if (res.data) {
          this.selectMember = res.data.rows
          let arr = []
          this.selectMember.forEach(res => {
            if (res.userId === this.userId1) {
            } else {
              arr.push(res)
            }
          })
          this.selectMember = arr
        }
        // console.log(this.selectMember)
      })
    },
    // 获取学段
    GetSection (data) {
      this.$store.dispatch('getSection', data).then(res => {
        // console.log(res)
        this.sectionList = res.resources.data
      })
    },
    selectPhaseId () {
      this.GetSubjects({topModelId: '59c1c48e4130a7401770154e', phaseId: this.jibeiForm.phaseId})
    },
    // 获取学科
    GetSubjects (data) {
      this.$store.dispatch('getSubject', data).then(res => {
        // console.log(res)
        this.subjectList = res.resources.data
      })
    },
    // 上传活动封面之前
    beforeAvatarUpload (file) {
      const isJPG = /(jpg|jpeg|png|gif)/g.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isJPG) {

      } else {
        this.$message.error('上传头像图片只能是 JPG,PNG,GIF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG
    },
    // 上传活动封面成功
    uploadSuccessFM (res) {
      this.jibeiForm.cover = res.resources[0].url
      this.imageUrl = res.resources[0].url
    },
    // 提交表单数据
    submitForm (formName) {
      this.$refs[formName].validate((res) => {
        if (res) {
          let $this = this
          let arr1 = []
          this.originator.forEach(res => {
            $this.selectMember.forEach(res1 => {
              if (res1.userId === res) {
                arr1.push({
                  participant: res,
                  participantName: res1['realName'],
                  label: '1'
                })
              }
            })
          })
          let arr2 = []
          this.members.forEach(res => {
            $this.selectMember.forEach(res2 => {
              if (res2.userId === res) {
                arr2.push({
                  participant: res,
                  participantName: res2['realName'],
                  label: '3'
                })
              }
            })
          })
          let arr = arr1.concat(arr2)
          this.jibeiForm.cmsCollectiveTeachingActionParticipantList = arr
          this.$store.dispatch('cmsCreateJibei', this.jibeiForm).then(res => {
            // console.log(res)
            this.dialogVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            location.reload()
          })
        } else {
          return this.$message.error('创建失败')
        }
      })
    },
    resetForm (formName) {
      location.reload()
    },
    closeDialog1 (done) {
      done()
      location.reload()
    },
    // 获取推荐活动列表
    getAllList () {
      this.$store.dispatch('cmsjibeiAllList').then(res => {
        if (res.data) {
          this.jibeiList = res.data.rows
        }
      })
    },
    // 推荐列表自动切换
     banner () {
      setInterval(() => {
        var length = this.jibeiList.length
        if (Math.abs(this.lef) < parseInt(length/7) * 760) {
          this.lef -= 1064
        } else {
          this.lef = 0
        }
        document.getElementById('lesson_jibeis').style.marginLeft = this.lef + 'px'
      },5000)
    },
    // 获取资源
    getList (data) {
      if (!data) {
        this.$store.dispatch('cmsJibeiList', {offset: this.page, limit: 10}).then(res => {
          this.total = res.data.total
          this.list = res.data.rows
        })
      } else if (data.type === 1) {
        this.$store.dispatch('cmsJibeiList', {offset: this.page1, limit: 10, type: 1}).then(res => {
          this.total1 = res.data.total
          this.list1 = res.data.rows
        })
      } else if (data.type === 3) {
        this.$store.dispatch('cmsJibeiList', {offset: this.page3, limit: 10, type: 3}).then(res => {
          this.total3 = res.data.total
          this.list3 = res.data.rows
        })
      }
    },
    currentChange (val) {
      this.page = val
      this.getList()
    },
    currentChange1 (val) {
      this.page1 = val
      this.getList({type: 1})
    },
    currentChange3 (val) {
      this.page3 = val
      this.getList({type: 3})
    }
  },
  filters: {
    sliceDescription: function (value) {
      return value.slice(3, -4)
    },
    Statue: function (value) {
      return value === 1 ? '即将开始' : value === 2 ? '进行中' : '已结束'
    },
    timeFilter: (res) => {
      var date = Math.abs(new Date(res).getTime() - new Date().getTime())

      var day = Math.floor(date / (24 * 3600 * 1000))//计算出小时数
      var leave1 = date % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
      var hour = Math.floor(leave1 / (3600 * 1000))//计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
      var minute = Math.floor(leave2 / (60 * 1000)) //计算相差秒数
      // var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
      // var second = Math.round(leave3 / 1000)
      var result
      if (day > 0) {
        result = day + ' 天 '
      } else {
        result = hour + ' 小时 ' + minute + ' 分钟 '
      }
      return result
    },
    textSlice: (res) => {
      if (!res) {

      } else {
        if (res.length > 42) {
          return res.slice(0, 42) + '...'
        }
        return res
      }
    },
    timeSlice: (res) => {
      if (!res) {

      } else {
        return res.slice(0, 16)
      }
    },
    textSlice5: (res) => {
      if (!res) {

      } else {
        if (res.length > 5) {
          return res.slice(0, 5)
        }
        return res
      }
    }
  }
}
</script>

<style scoped>

</style>
