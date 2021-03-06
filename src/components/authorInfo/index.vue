<template lang="html">
  <div class="df-authorInfo">
    <header class="header">
      <router-link :to="page.profileUrl">
        <img class="avatar" :src="page.user.avatar" alt="avatar">
      </router-link>
      <div class="info">
        <p>作品<span>{{ page.user.works_count }}</span></p>
        <p>关注<span>{{ page.user.followings_count }}</span></p>
        <p>关注者<span>{{ page.user.followers_count }}</span></p>
      </div>
      <div class="clearfix"></div>
    </header>
    <div class="body">
      <div class="item">
        <i class="fa fa-user"></i>
        <p>
          <router-link class="tdu" :to="page.profileUrl">{{ page.authorName }}</router-link>
        </p>
      </div>
      <div class="item">
        <i class="fa fa-map-marker"></i>
        <p>{{ page.user.location }}</p>
      </div>
      <div class="item">
        <i class="fa fa-lemon-o"></i>
        <p>{{ page.dynasty }}</p>
      </div>
      <div class="item">
        <i class="fa fa-road"></i>
        <p>{{ page.user.signature }}</p>
      </div>
      <div class="item">
        <i class="fa fa-book"></i>
        <p>
          <router-link
            class="tdu"
            v-for="(work,index) in works"
            :key="index"
            :to="work.poemUrl"
            >《{{ work.poemName }}》</router-link>
            <span class="more" v-if="isMoreWorks" @click="toggleWorksDialog">全部作品</span>
        </p>
      </div>
    </div>
    <footer class="footer" v-if="page.user.id !== profile.id">
      <el-button class="btn-default" @click="toggleReplyDialog"><i class="fa fa-envelope-o"></i></el-button>
      <el-button
        class="btn-act"
        @click="toggleAuthorFollowed(page.user.id)"
        v-if="status.followed"
      >已关注</el-button>
      <el-button
        class="btn-default"
        @click="toggleAuthorFollowed(page.user.id)"
        v-else
      >关注Ta</el-button>
    </footer>
    <el-dialog
      custom-class="c-reply works-dialog"
      title="全部作品"
      :visible.sync="worksDialogVisible"
      >
      <header class="header">
        <div class="box">
          作者：<router-link class="tdu" :to="page.profileUrl">{{ page.authorName }}</router-link>
        </div>
        <div class="box">
          作品总数：<span class="total-works">{{ page.user.works_count }}</span>
        </div>
      </header>
      <div class="body">
        <div class="item" v-for="(work,index) in page.user.works" :key="index">
          <router-link class="tdu" :to="work.poemUrl">《{{ work.poemName }}》</router-link>
          <span>{{ work.publish_time }}</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="c-reply"
      title="发送私信"
      size="tiny"
      :visible.sync="replyDialogVisible"
      >
      <header class="header">
        <span class="title">接收人：</span>
        <span class="receiver">{{ page.user.name }}</span>
      </header>
      <el-input
        class="c-form"
        type="textarea"
        resize="none"
        :autosize="{ minRows: 4, maxRows: 6}"
      ></el-input>
      <footer slot="footer">
        <el-button class="btn-default" type="text" @click="toggleReplyDialog">取消</el-button>
        <el-button class="btn-default">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex'
export default {
  name: 'authorInfo',
  props: {
    page: {
      type: Object,
      default: {}
    },
    status: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isOriginal: false,
      replyDialogVisible: false,
      worksDialogVisible: false,
      isMoreWorks: false
    }
  },
  computed: {
    works() {
      let works = this.page.user.works
      // 如果作者作品数量大于5，则显示 全部作品 选项
      if (works.length > 5) {
        this.isMoreWorks = true
        return works.slice(0, 5)
      }
      return works
    },
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    toggleReplyDialog() {
      this.replyDialogVisible = !this.replyDialogVisible
    },
    toggleWorksDialog() {
      this.worksDialogVisible = !this.worksDialogVisible
    },
    ...mapActions([
      'toggleAuthorFollowed'
    ])
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/common'

.df-authorInfo
  margin 10px 0 40px 0
  .header
    .avatar
      margin-right 10px
      wh(100px,100px)
      border-radius 5px
      box-shadow 0 1px 1px rgba(0,0,0,.2)
    .info
      float right
      font(.9em,Silver)
      span
        float right
        display inline-block
        margin-left 50px
        font(1em,Green)
  .body
    margin-top 5px
    .item
      fj()
      margin 7px 0
      vertical-align top
      line-height 2em
      color Silver
      &>p
        margin 0
        font-size .8em
      &>i
        margin 7px 10px 0 0
        color Light-Green
      .more
        display block
        margin 10px 0 20px 0
        border 1px solid Silver
        font-size 1.1em
        text-align center
        cursor pointer
        transition all .2s
        &:hover
          border-radius 50%
          border-color Green
          bc(Green,Green)
  .footer
    margin-top 20px
    color Silver
    &>button:last-child
      float right
  .works-dialog
    .header
      fj(space-around)
      .total-works
        color Green
    .body
      margin 20px 0
      .item
        fj(space-between)
</style>
