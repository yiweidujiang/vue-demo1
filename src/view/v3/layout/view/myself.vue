<template>
    <div class="myself">
      <div class="list">
        <ul>
          <li>账号管理</li>
          <li>我的集体备课</li>
          <li>我的资源</li>
          <li><router-link to="/banding" tag="a">绑定班级</router-link></li>
        </ul>
      </div>
      <div class="list_item">
        <div class="account mode">
          <div class="title">
            <h3>账号管理</h3>
          </div>
          <div class="account_news news"></div>
        </div>
        <div class="lesson_pre mode">
          <div class="title">
            <h3>我的集体备课</h3>
          </div>
          <div class="lesson_news news">
            <img src="@/assets/zuojiantou.png" class="prev but" alt="" @click="previous(jibeiList.length)">
            <img src="@/assets/youjiantou.png" class="next but" alt="" @click="next(jibeiList.length)">
            <div class="lesson_jibei">
              <ul id="lesson_jibeis">
                <li v-for="(item, index) in jibeiList" :key="index">
                  <img src="@/assets/lesson.gif" alt="">
                  <div class="doing" :style="{backgroundColor: item.status===2?'red':'#ccc'}">
                    <span>{{item.status | Statue}}</span>
                  </div>
                  <div class="lesson_titles">
                    <p class="lesson_num">第一课</p>
                    <span class="lesson_title">{{item.actionName | textSlice5}}</span>
                  </div>
                  <p class="lesson_subjects"><span class="lesson_subject">语文</span><span class="subject_num">一单元</span></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="resources mode">
          <div class="title">
            <h3>我的资源</h3>
          </div>
          <div class="resources_news news">
            <div class="ul-list">
              <ul class="ul">
                <li>
                  <div class="content">
                    <!--<router-link :to="'/preview/'+item._id" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
                    </router-link>-->
                    <div class="icon"></div>
                    <div class="item-con">
                      <h2 style="cursor: pointer;"><span>视频欣赏：秋菊</span></h2>
                      <el-rate  disabled></el-rate>
                      <p>附详细解答过程帮助学生更好的理解</p>
                    </div>
                    <div class="item-bottom clearfix">
                      <div class="fl">
                        <span>大小: 10M</span>
                        <span>上传时间: 12:00</span>
                      </div>
                      <div class="fr item-b-l">
                        <span>在线预览</span>
                        <span><a href="#">下载</a></span>
                      </div>
                    </div>
                  </div>
                </li>
                <!--<li v-for=" (item , index) in list" :key="index">
                  <div class="content">
                    <router-link :to="'/preview/'+item._id" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
                    </router-link>
                    <div class="item-con">
                      <h2 style="cursor: pointer;"><router-link :to="'/preview/'+item._id" tag="span" >{{item.title}}</router-link></h2>
                      <el-rate :value="item.shareLevel"  disabled></el-rate>
                      <p>附详细解答过程帮助学生更好的理解</p>
                    </div>
                    <div class="item-bottom clearfix">
                      <div class="fl">
                        <span>大小: {{parseFloat(item.size/1024).toFixed(2)}}M</span>
                        <span>上传时间: {{item.createTime |timeReset }}</span>
                      </div>
                      <div class="fr item-b-l">
                        <span><router-link :to="'/preview/'+item._id" >在线预览</router-link></span>
                        <span><a :href="item.url">下载</a></span>
                      </div>
                    </div>
                  </div>
                </li>-->
                <li>
                  <div class="content">
                    <!--<router-link :to="'/preview/'+item._id" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
                    </router-link>-->
                    <div class="icon"></div>
                    <div class="item-con">
                      <h2 style="cursor: pointer;"><span>视频欣赏：秋菊</span></h2>
                      <el-rate  disabled></el-rate>
                      <p>附详细解答过程帮助学生更好的理解</p>
                    </div>
                    <div class="item-bottom clearfix">
                      <div class="fl">
                        <span>大小: 10M</span>
                        <span>上传时间: 12:00</span>
                      </div>
                      <div class="fr item-b-l">
                        <span>在线预览</span>
                        <span><a href="#">下载</a></span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="content">
                    <!--<router-link :to="'/preview/'+item._id" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
                    </router-link>-->
                    <div class="icon"></div>
                    <div class="item-con">
                      <h2 style="cursor: pointer;"><span>视频欣赏：秋菊</span></h2>
                      <el-rate  disabled></el-rate>
                      <p>附详细解答过程帮助学生更好的理解</p>
                    </div>
                    <div class="item-bottom clearfix">
                      <div class="fl">
                        <span>大小: 10M</span>
                        <span>上传时间: 12:00</span>
                      </div>
                      <div class="fr item-b-l">
                        <span>在线预览</span>
                        <span><a href="#">下载</a></span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="content">
                    <!--<router-link :to="'/preview/'+item._id" tag="div" style="cursor: pointer;" :class="['icon',item.format]">
                    </router-link>-->
                    <div class="icon"></div>
                    <div class="item-con">
                      <h2 style="cursor: pointer;"><span>视频欣赏：秋菊</span></h2>
                      <el-rate  disabled></el-rate>
                      <p>附详细解答过程帮助学生更好的理解</p>
                    </div>
                    <div class="item-bottom clearfix">
                      <div class="fl">
                        <span>大小: 10M</span>
                        <span>上传时间: 12:00</span>
                      </div>
                      <div class="fr item-b-l">
                        <span>在线预览</span>
                        <span><a href="#">下载</a></span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'myself',
  data () {
    return {
      jibeiList: [
        {actionName:'秋天来了发顺丰到付',status:1}
      ],
      arr1: [],
      pre: 0,
      nex: 0,
      lef: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取推荐活动列表
    getList () {
      this.$store.dispatch('cmsjibeiAllList').then(res => {
        if (res.data) {
          this.jibeiList = res.data.rows
        }
      })
    },
    previous (length) {
      this.$nextTick(() => {
        if (this.nex < 0 && length > 5) {
          this.nex++
          let mLeft = this.nex * 152
          document.getElementById('lesson_jibeis').style.marginLeft = mLeft + 'px'
        }
      })
    },
    next (length) {
      this.$nextTick(() => {
        if (this.nex > 5 - length && length > 5) {
          this.nex--
          let mRight = this.nex * 152
          document.getElementById('lesson_jibeis').style.marginLeft = mRight +'px'
        }
      })
    }
  },
  filters: {
    Statue: function (value) {
      return value === 1 ? '即将开始' : value === 2 ? '进行中' : '已结束'
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
