<template>
  <div class="wrapper qa-content">

    <div class="qa-title">
      <div class="fl title">
        <h2>{{problem.title}}</h2>
        <p>
          <span class="tag">{{labelName}}</span>
          <span class="author" @click="goTalk(item.userid)" style="cursor: pointer">{{problem.nickname}}</span>
          <span>{{problem.createtime}}</span>
        </p>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="fl left-list">
      <div class="problem-detail">
        <div class="title-intro">
          <div class="title">
            <div class="detail" v-html="covert(problem.content)">
            </div>
            <div class="clearfix"></div>

          </div>

        </div>
        <div class="answer-intro">
          <h4 class="answer-num">{{problem.reply}}个回答</h4>
          <div class="title" v-for="item in reply">
            <p>{{item.content}}</p>
            <div class="operate">
              <div class="tool pull-left">
                <span class="time">{{item.createtime}}</span>
                <span class="time" style="color: red" v-if="item.userid==user.id"
                      @click="deleteReply(item)">删除</span>
              </div>

              <div class="myanswer pull-right">
                <a @click="goTalk(item.userid)" style="cursor: pointer">{{item.nickname}}</a>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="title">
            <a class="sui-btn btn-block btn-bordered btn-more" v-show="flag" @click="loadMore">查看更多</a>
            <a class="sui-btn btn-block btn-bordered btn-more" v-show="!flag">没有更多了</a>
          </div>
        </div>
        <div class="edit-answer">
          <h4>撰写答案</h4>
          <div class="edit-tip">
            <textarea style="width: 100%;height: 100%;font-size: 14px;" v-model="pojo.content" placeholder="写下您的真知灼见吧！"></textarea>
            <a class="sui-btn btn-block btn-bordered btn-more" @click="submit">提交答案</a>
          </div>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="similar-problem">
        <h3 class="title">相似问题</h3>
        <ul class="problem-list">
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/plugins/normalize-css/normalize.css'
  import '~/assets/plugins/yui/cssgrids-min.css'
  import '~/assets/plugins/sui/sui.min.css'
  import '~/assets/plugins/sui/sui-append.min.css'
  import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
  import '~/assets/css/widget-base.css'
  import '~/assets/css/widget-head-foot.css'
  import '~/assets/css/page-sj-qa-detail.css'
  import problemApi from "../../../api/problem";
  import replyApi from "../../../api/reply";
  import articleApi from "../../../api/article";
  import {getUser, getId} from "../../../utils/auth";

  export default {
    data() {
      return {
        problem: {},
        labelName: '',
        reply: [],
        page: {index: 1, size: 3},
        flag: true,
        user: getUser() == null ? {} : getUser(),
        pojo: {
          content: ''
        }
      }
    },
    created() {
      this.labelName = this.$route.query.labelName;
      problemApi.findById(this.$route.query.id).then(res => {
        this.problem = res.data.data;
      });
      replyApi.searchByProblemId(this.page.index, this.page.size, this.$route.query.id).then(res => {
        this.reply = res.data.data.rows;
        if (this.page.index * this.page.size >= res.data.data.total) {
          this.flag = false;
        }
        this.page.index++;
      });
    },
    methods: {
      goTalk(id) {
        if (getUser() == null) {
          this.$message({
            message: '请先登录',
            type: 'warning'
          });
          return;
        }
        if (id == getId()) {
          this.$message({
            message: '您不能与自己聊天',
            type: 'warning'
          });
          return;
        }
        this.$router.push({path: `/friend/talk/${id}`});
      },
      submit() {
        if (!getUser()) {
          this.$message({
            type: 'warning',
            message: '请先登录！'
          });
          return;
        }
        this.pojo.userid=this.user.id;
        this.pojo.nickname=this.user.name;
        this.pojo.problemid=this.problem.id;
        replyApi.save(this.pojo).then(res=>{
          if (res.data.flag){
            this.$message({
              type: 'success',
              message: '发表答案成功!'
            });
            this.page.index = 1;
            this.reply = [];
            this.loadMore();
            this.problem.reply++;
          }else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      },
      deleteReply(item) {
        this.$confirm('此操作将永久确认删除答案, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          replyApi.delete(item).then(rep => {
            this.page.index = 1;
            this.reply = [];
            this.loadMore();
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.problem.reply--;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      loadMore() {
        replyApi.searchByProblemId(this.page.index, this.page.size, this.problem.id).then(res => {
          this.reply = this.reply.concat(res.data.data.rows);
          if (this.page.index * this.page.size >= res.data.data.total) {
            this.flag = false;
          }
          this.page.index++;
        });
      },
      covert(content) {
        if (content) {
          return content.split("。").map(s => {
            return `<p>${s}。</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
        }
        return content;
      }
    }
  }
</script>

<style scoped>

</style>
