<template>
    <div class="details">
      <div class="detail">
        <div class="right-nav">
          <div class="jibeiCaidan" @click="clickCaidan">
            <img src="@/assets/jibeiCaidan2.png" alt="">
            <span v-show="caidan === 0">点我</span>
            <span v-show="caidan === 1">收起</span>
          </div>
          <ul class="right" :style="caidanStyle">
              <li> <a href="#active_content">活动内容</a> </li>
              <li v-show="!((status === 3 && fileListP.length === 0) || (!ifOriginator && fileListP.length === 0))">  <a href="#active_img">活动照片</a> </li>
              <li> <a href="#active_member">活动成员</a>  </li>
              <li v-show="!((status === 3 && fileListF.length === 0) || (!ifOriginator && fileListF.length === 0))"> <a href="#active_experience">活动资源</a> </li>
              <li v-show="!(status === 3 && experienceList.length === 0)"> <a href="#realize">活动心得</a> </li> 
              <li> <a href="#discuss">活动评论</a> </li>
          </ul>
          <!-- <ul class="right">
              <li>活动内容</li>
              <li v-show="!((status === 3 && fileListP.length === 0) || (!ifOriginator && fileListP.length === 0))">活动照片</li>
              <li>活动成员</li>
              <li v-show="!((status === 3 && fileListF.length === 0) || (!ifOriginator && fileListF.length === 0))">活动资源</li>
              <li v-show="!(status === 3 && experienceList.length === 0)">活动心得</li> 
              <li>活动评论</li>
          </ul> -->
        </div>
        <div class="active">
          <!--活动内容  活动要求-->
          <div class="active_content modes" id="active_content">
            <div class="mode">
              <!--<div class="title">
                <h3>活动标题</h3>
              </div>-->
              <div class="news">
                <p class="texts" v-html="jibeiInfo.actionName?jibeiInfo.actionName: ''" style="font-size: 18px;font-weight: bold;color: #000;display:block;width: 200px;margin: 0 auto;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                </p>
              </div>
            </div>
            <div class="mode">
              <div class="title">
                <h3>活动内容</h3>
              </div>
              <div class="news">
                <p class="texts" v-html="jibeiInfo.content?jibeiInfo.content: ''">
                </p>
              </div>
            </div>
            <div class="mode">
              <div class="title">
                <h3>活动要求</h3>
              </div>
              <div class="news">
                <p class="texts" v-html="jibeiInfo.description">

                </p>
              </div>
            </div>
            <div class="mode">
              <div class="title">
                <h3>活动时间 <span class="editTime" @click="dialogVisibleTime = true">时间编辑</span></h3>
              </div>
              <div class="news">
                <p class="texts">
                  {{jibeiInfo.ctime | timeSlice}} --- {{jibeiInfo.endTime | timeSlice}}
                </p>
              </div>
              <el-dialog
                title="时间编辑"
                :visible.sync='dialogVisibleTime'
                width='500px'
              >
                <span>在此可修改结束时间</span>
                <el-form ref="editTimes" label-width="100px" :model="editTime" :rules="rulesT">
                  <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker
                      v-model="editTime.endTime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="结束时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="timeSubmitForm('editTimes')" type="primary">提交</el-button>
                    <el-button @click="timeResetForm('editTimes')">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </div>
          </div>
          <!--活动照片-->
          <div v-if="status === 3 && fileListP.length === 0" class="active_img modes"></div>
          <div v-else class="active_img modes" id="active_img">
            <div class="mode">
              <div class="title">
                <h3>活动照片</h3>
              </div>
              <div class="images">
                <el-upload
                  id="upload"
                  action="http://192.168.18.115:3003/v1/file/upload"
                  list-type="picture-card"
                  :data="formData"
                  :auto-upload="true"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                  :on-success="uploadSuccess"
                  :file-list="fileListP"
                  :disabled="disabled1"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </div>
          </div>
          <!--活动成员-->
          <div class="active_member modes" id="active_member">
            <div class="mode">
              <div class="title">
                <h3>活动成员</h3>
              </div>
              <div class="member news">
                <ul v-if="originatorList.length > 0">
                  发起人：
                  <li v-for="(item, index) in originatorList" :key="index">
                    <img src="@/assets/head.png" alt="">
                    <p>{{item.participantName}}</p>
                  </li>
                </ul>
                <div v-if="status === 3 && memberList.length === 0"></div>
                <ul v-else>
                  参与人：
                  <li v-for="(item, index) in memberList" :key="index">
                    <img src="@/assets/head.png" alt="">
                    <p>{{item.participantName}}</p>
                  </li>
                  <!--添加参与人-->
                  <div v-if="status !== 3 && ifOriginator" class="addMember" @click="addMember">
                    <!-- <img src="@/assets/zengjia.png" alt=""> -->
                    <img src="@/assets/add.png" alt="">
                  </div>
                  <el-dialog
                    title="添加参与人"
                    :visible.sync="dialogVisibleAdd"
                    width="500px"
                  >
                    <el-form :model="addMembers" :rules="rules1" ref="addMember" label-width="100px">
                      <el-form-item prop="phase">
                        <el-checkbox-group v-if="selectMember.length > 0" v-model="members">
                          <el-checkbox v-for="(item, index) in selectMember" :key="index" :label="item.userId">{{item.realName}}</el-checkbox>
                        </el-checkbox-group>
                        <span v-else>没有成员可以添加</span>
                      </el-form-item>
                      <el-form-item>
                        <el-button v-if="selectMember.length > 0" type="primary" @click="submitForm('addMember')">提交</el-button>
                        <el-button @click="resetForm('addMember')">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </ul>
              </div>
            </div>
          </div>
          <!--活动资源-->
          <div v-if="status === 3 && fileListF.length === 0" class="active_experience modes"></div>
          <div v-else class="active_experience modes" id="active_experience">
            <div class="mode">
              <div class="title">
                <h3>活动资源</h3>
              </div>
              <div class="experience news">
                <ul>
                  <li v-for="(item, index) in fileListF" :key="index" class="content">
                    <div class="file">
                      <div class="file_img">
                        <div style="cursor: pointer; width: 60px; height: 70px;position: relative;top: -6px; left: -12px;" :class="['icon',computedFormat(item.url)]">
                      </div>
                      </div>
                      <div class="file_info">
                        <p class="file_title">{{item.name}}</p>
                        <p class="teacher">提交人：<em>张老师</em></p>
                        <p class="file_time">{{item.utime}}</p>
                      </div>
                    </div>
                  </li>
                  <li v-if="status !== 3 && ifOriginator" class="upload">
                    <el-upload
                      action="http://192.168.18.115:3003/v1/file/upload"
                      :auto-upload="true"
                      :on-success="uploadSuccessFile"
                      :file-list="fileListF"
                      :show-file-list="false"
                      list-type="text"
                    >
                      <img src="@/assets/jibei09.gif" alt="">
                    </el-upload>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--活动心得-->
          <div v-if="status === 3 && experienceList.length === 0" class="active_comment modes realize"></div>
          <div v-else class="active_comment modes realize" id="realize">
            <div class="mode">
              <div class="title">
                <h3>活动心得</h3>
              </div>
              <div class="comments">
                <ul>
                  <li v-if="status !== 3" id="experience">
                    <div class="comment_textarea1" @click="dialogFormVisible = true">
                      <img src="@/assets/bianji.png" alt="">
                      添加心得
                    </div>
                    <el-dialog
                      title="添加心得"
                      :visible.sync="dialogFormVisible"
                      >
                      <el-form :model="experience1" :rules="rules3" ref="experience1">
                        <el-form-item prop="textarea3">
                          <el-input
                            type="textarea"
                            :autosize="{minRows:7,maxRows:7}"
                            placeholder="请输入5-300个文字"
                            maxlength=301
                            v-model="experience1.textarea3">
                          </el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="createExperience('experience1')">提交心得</el-button>
                          <el-button type="info" @click="cancleExperience('experience1')">取消</el-button>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
                  </li>
                  <li v-for="(item, index) in experienceList" :key="index">
                    <div class="comment_item">
                      <div class="comment_img">
                        <img src="@/assets/head.png" alt="">
                      </div>
                      <div class="comment_content">
                        <p><b>{{item.fromUserName}}</b>&nbsp;&nbsp;&nbsp;<span>{{item.utime}}</span></p>
                        <span>{{item.content}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--活动评论-->
          <div class="active_comment modes discuss" id="discuss">
            <div class="mode">
              <div class="title">
                <h3>活动评论</h3>
              </div>
              <div class="comment">
                <div class="comment_textarea">
                  <el-form :model="comment1" :rules="rules4" ref="comment1">
                    <el-form-item prop="textarea4">
                      <el-input
                        type="textarea"
                        :autosize="{minRows:6,maxRows:6}"
                        placeholder="请输入5-300个文字"
                        maxlength=301
                        v-model="comment1.textarea4">
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-row style="margin: 30px;">
                        <el-col :span="2" :offset="22">
                          <el-button type="primary" round @click="createComment('comment1')">评论</el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="comments">
                <ul>
                  <li v-for="(item, index) in commentList" :key="index">
                    <div class="comment_item">
                      <div class="comment_img">
                        <img src="@/assets/head.png" alt="">
                      </div>
                      <div class="comment_content">
                        <p><b>{{item.fromUserName}}</b>&nbsp;&nbsp;&nbsp;<span>{{item.utime}}</span></p>
                        <span>{{item.content}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'jibeiDetail',
  data () {
    return {
      formData:{},
      textarea4: '',
      dialogImageUrl: '',
      dialogVisible: false,
      dialogFormVisible: false,
      dialogVisibleAdd: false,
      jibeiInfo: '',
      originatorList: [],  // 主办人
      memberList: [],    // 参与人列表
      selectMember: [],  // 被选参与人
      members: [],       // 添加参与人id
      addMembers: {
        actionId: this.$route.params.id,
        cmsCollectiveTeachingActionParticipantList: {}
      },
      rules1: {},
      fileListF: [],     // 上传资源
      fileListP: [],     // 上传图片
      actionId: '',
      pictureList: [],   // 显示图片列表
      disabled1: false,
      fileListXD: [],
      experienceList: [],
      commentList: [],
      experience1: {
        textarea3: ''
      },
      rules3: {
        textarea3: [
          {required: true, message: '活动内容不能为空', trigger: 'change'},
          {max: 300, message: '不能超过300个字符', trigger: 'change'},
          {min: 5, message: '请输入5-300个字符', trigger: 'change'}
        ]
      },
      comment1: {
        textarea4: ''
      },
      rules4: {
        textarea4: [
          {required: true, message: '评论内容不能为空',trigger: 'change'},
          {max: 300, message: '不能超过300个字符', trigger: 'change'},
          {min: 5, message: '请输入5-300个字符', trigger: 'change'}]
      },
      status: '', // 该活动的活动状态
      ifOriginator: '',   // 是否是主办人
      ifMember: '',        // 是否是参与人
      array: [],    // 右侧电梯导航
      json:{
          "control1": ".right-nav",    //侧栏电梯的容器
          "control2": ".right",         //需要遍历的电梯的父元素
          "target": [".active_content",".active_img",".active_member",".active_experience",".realize",".discuss"],    //监听的内容，注意一定要从小到大输入
          "current": "current"         //选中的样式
      },
      caidanStyle: {        // 右侧菜单导航样式
        display: 'none'
      },
      caidan: 0,
      editTime: {
        endTime: ''
      },
      rulesT: {endTime: [{required: true, message: '请选择修改结束时间', trigger: 'change'}]},
      dialogVisibleTime: false
    }
  },

  mounted () {
    let id = this.$route.params.id
    this.actionId = this.$route.params.id
    this.getPictureList({actionId: id, resourceType: 1})      // 显示活动照片
    this.getPictureList({actionId: id, resourceType: 2})      // 显示活动资源
    this.getExprienceList({actionId: id, commentType: 3})     // 显示活动心得
    this.getExprienceList({actionId: id, commentType: 4})     // 显示活动评论
    this.getMember({actionId: this.actionId, label: 1})   //显示主办人
    this.getMember({actionId: this.actionId, label: 3})   //显示参与人
    this.getContent({actionId: id});
    this.formData = {
      folderName:this.imgFile()
    }
  },
 
  methods: {
    // 上传文件文件夹
    imgFile(){
      let date = new Date();
      let year = date.getFullYear(),
      month = date.getMonth()+1,
      day = date.getDate(),
      rand = parseInt(Math.random()*10000);
      return '/'+year+'/'+month+'/'+day+'/'+rand
    },
    computedFormat (res) {
      let str = res.slice(res.lastIndexOf('.') + 1, res.length)
      return str
    },
    // 显示活动明细
    getContent (data) {
      this.$store.dispatch('cmsjibeiContent', data).then(res => {
        this.jibeiInfo = res.data
        this.status = this.jibeiInfo.status
        if (this.status === 3) {
          this.disabled1 = true
        }
        setTimeout(() => {
          let add1 = $('.el-upload--picture-card')
          if (this.status === 3 && add1.length > 0) {
            add1.css('display', 'none')
          }
        }, 180)
      })
    },
    timeSubmitForm (formName) {
      this.$refs[formName].validate((res) => {
        if (res) {
          this.editTime.actionId = this.$route.params.id
          this.editTime.actionName = this.jibeiInfo.actionName
          this.editTime.content = this.jibeiInfo.content
          this.editTime.description = this.jibeiInfo.description
          this.editTime.startTime = this.jibeiInfo.startTime
          this.editTime.phaseId = this.jibeiInfo.phaseId
          this.editTime.subjectId = this.jibeiInfo.subjectId
          this.$store.dispatch('cmsCreateJibei',this.editTime).then(res => {
            this.dialogVisibleTime = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            // location.reload()
          })
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    timeResetForm (formName) {
      this.dialogVisibleTime = false
      location.reload()
    },
    // 照片上传成功
    uploadSuccess (res) {
      this.fileListP.push({name: res.resources[0].originalName, url: res.resources[0].url})
      this.$store.dispatch('cmsUploadPic', {fileIds: JSON.stringify(this.fileListP), actionId: this.actionId, resourceType: '1', num: this.fileListP.length}).then(res => {
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片删除成功
    handleRemove (file, fileList) {
      this.$store.dispatch('cmsUploadPic', {fileIds: JSON.stringify(fileList), actionId: this.actionId, resourceType: '1', num: fileList.length}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    // 上传资源的文件格式
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
    // 资源上传成功
    uploadSuccessFile (res) {
      this.fileListF.unshift({name: res.resources[0].originalName, url: res.resources[0].url})
      this.$store.dispatch('cmsUploadPic', {fileIds: JSON.stringify(this.fileListF), actionId: this.actionId, resourceType: '2', num: this.fileListF.length}).then(res => {
        this.getPictureList({actionId: this.$route.params.id, resourceType: 2})
        this.$message({
          type: 'success',
          message: '添加资源成功'
        })
      })
    },
    // 显示照片yu资源
    getPictureList (data) {
      this.$store.dispatch('cmsjibeiPicture', data).then(res => {
        // console.log(res)
        if (res.data) {
          if (data.resourceType === 1) {
            this.fileListP = JSON.parse(res.data.rows[0].fileIds)
            // console.log(this.fileListP)
          } else if (data.resourceType === 2) {
            this.fileListF = JSON.parse(res.data.rows[0].fileIds)
            this.fileListF[0].utime = res.data.rows[0].utime
            // console.log(this.fileListF)
          }
        }
      })
    },
    // 显示主办人、参与人
    getMember (data) {
      this.$store.dispatch('cmsJibeiSelectMember', data).then(res => {
        if (res.data) {
          if (data.label === 1) {
            this.originatorList = res.data.rows
            if (this.originatorList[0].participant === sessionStorage.getItem('userId')) {
              // console.log('我是主办人')
              this.ifOriginator = true
            } else {
              this.ifOriginator = false
              // console.log('我不是主办人')
              this.disabled1 = true   // 禁止删除照片
              setTimeout(() => {
                // 活动图片
                if (!this.ifOriginator && this.fileListP.length === 0) {
                  let activeImg = $('.active_img')
                  if (activeImg.length > 0) {
                    activeImg.css('display', 'none')
                  }
                }
                let add1 = document.getElementsByClassName('el-upload--picture-card')
                if (add1.length > 0) {
                  add1[0].style.display = 'none'
                }
                // 活动资源
                if (!this.ifOriginator && this.fileListF.length === 0) {
                  let activeEx = $('.active_experience')
                  if (activeEx) {
                    activeEx.css('display', 'none')
                  }
                }
              }, 180)
            }
          } else if (data.label === 3) {
            this.memberList = res.data.rows
            // console.log(this.memberList)
            try {
              this.memberList.forEach(res => {
                if (res.participant === sessionStorage.getItem('userId')) {
                  this.ifMember = true
                  // console.log('我是参与人')
                  throw new Error('我要跳出去')
                }
              })
            } catch (e) {
              // console.log('跳出来了')
            }
          }
          setTimeout(() => {
            let exp = $('#experience')
            if (this.ifOriginator || this.ifMember) {
              // console.log('我是参与人或主办人')
              if (exp) {
                exp.css('display', 'block')
              }
            } else {
              if (exp) {
                exp.css('display', 'none')
              }
            }
          }, 180)
        }
      })
    },
    // 获取参与被选人
    getSelectMember () {
      this.$store.dispatch('cmsJibeiMember').then(res => {
        if (res.data) {
          // console.log(res.data.rows)
          this.selectMember = res.data.rows
          // console.log(this.memberList)
          let $this = this
          let arr = []
          this.selectMember.forEach(res1 => {
            var repeat = false
            $this.memberList.forEach(res2 => {
              if (res1.userId === res2.participant) {
                repeat = true
              }
              if (res1.userId === sessionStorage.getItem('userId')) {
                repeat = true
              }
            })
            if (!repeat) {
              arr.push(res1)
            }
          })
          this.selectMember = arr
        }
      })
    },
    // 添加参与人
    addMember () {
      this.getSelectMember()
      this.dialogVisibleAdd = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((res) => {
        if (res) {
          let $this = this
          let arr2 = this.memberList
          this.members.forEach(res => {
            $this.selectMember.forEach(res2 => {
              if (res2.userId === res) {
                arr2.push({
                  actionId: this.$route.params.id,
                  participant: res,
                  participantName: res2['realName'],
                  label: '3'
                })
              }
            })
          })
          this.addMembers.cmsCollectiveTeachingActionParticipantList = arr2
          this.$store.dispatch('cmsCreateJibei', this.addMembers).then(res => {
            //console.log(res)
            this.dialogVisible = false
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.getMember({actionId: this.actionId, label: 3})
            this.members = []
          })
        } else {
          return this.$message.error('创建失败')
        }
      })
      this.dialogVisibleAdd = false
      this.members = []
    },
    resetForm (formName) {
      this.dialogVisibleAdd = false
      this.members = []
    },
    // 创建活动心得
    createExperience (formName) {
      this.$refs[formName].validate((res) => {
        if (res) {
          this.$store.dispatch('cmsjibeiCreateExperience', {
            'actionId': this.actionId,
            'commentType': 3,
            'content': this.experience1.textarea3
          }).then(result => {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.getExprienceList({actionId: this.$route.params.id, commentType: 3})
            this.$refs[formName].resetFields()
          })
        } else {
          return this.$message.error('提交失败')
        }
        this.dialogFormVisible = false
      })
    },
    // 取消创建心得
    cancleExperience (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].validate((res) => {
        this.$refs[formName].resetFields()
      })
    },
    // 创建活动评论
    createComment (formName) {
      this.$refs[formName].validate((res) => {
        if (res) {
          this.$store.dispatch('cmsjibeiCreateExperience', {
            'actionId': this.actionId,
            'commentType': 4,
            'content': this.comment1.textarea4
          }).then(result => {
            this.$message({
              message: '评论成功',
              type: 'success'
            })
            this.getExprienceList({actionId: this.$route.params.id, commentType: 4})
            this.$refs[formName].resetFields()
            // console.log(result)
          })
        } else {
          return this.$message.error('提交失败')
        }
      })
    },
    // 显示活动心得、评论
    getExprienceList (data) {
      this.$store.dispatch('cmsjibeiExperience', data).then(res => {
        if (res.data) {
          if (data.commentType === 3) {
            this.experienceList = res.data.rows
          } else if (data.commentType === 4) {
            this.commentList = res.data.rows
          }
        }
      })
    },
    // 右侧电梯导航
    clickCaidan () {
      if (this.caidan === 0) {
        this.caidanStyle.display = 'block'
        this.caidan = 1
      } else {
        this.caidanStyle.display = 'none'
        this.caidan = 0
      }
    }
  },
  filters: {
    titleSlice: (res) => {
      if (!res) {

      } else {
        if (res.length > 10) {
          return res.slice(0, 10) + '...'
        }
        return res
      }
    },
    timeSlice: (res) => {
      if (!res) {

      } else {
        return res.slice(0, 16)
      }
    }
  }
}
</script>

<style scoped>
</style>
