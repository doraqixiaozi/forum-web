<template>
  <!--三列布局-->
  <div class="wrapper">
    <div class="sj-content">
      <div class="left-nav">
        <div class="float-nav" id="float-nav">
          <div class="question-list">
            <h3 class="title">我来评论:</h3>
            <div class="lists">
              <ul>
                <li class="list-item"><textarea class="list-title" style="width: 139px;height: 259px;border: none"
                                                                       v-model="content"></textarea>
                </li>
              </ul>
              <a class="sui-btn btn-block btn-bordered btn-more" @click="deploy">发表评论</a>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content" id="mine">
        <div class="fl middle">
          <div class="data-list">
            <div class="headline fixed" id="headline">
              <h1 v-text="article.title"></h1>
              <div v-html="covert(article.content)">
              </div>
            </div>
          </div>
          <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> -->
        </div>
        <div class="fl right">
          <div class="activity">
            <div class="question-list">
              <h3 class="title">最新评论</h3>
              <div class="lists">
                <ul>
                  <li class="list-item" v-for="item in comments" :key="item.id"><p class="list-title">{{item.content}}<span style="color: red;cursor: pointer" v-if="item.userid==user.id"
                             @click="deleteComment(item.id)">X</span></p>
                    <p class="authorInfo"><span class="authorName"><img :src="item.avatar"
                                                                        alt=""/>{{item.nickname}}</span>
                      <span v-text="item.createtime"></span></p></li>
                </ul>
                <a class="sui-btn btn-block btn-bordered btn-more" v-show="flag" @click="loadMore">查看更多</a>
                <a class="sui-btn btn-block btn-bordered btn-more" v-show="!flag">没有更多啦</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import articleApi from "../../api/article";
  import commentApi from "../../api/comment";
  import {getUser, getId} from "../../utils/auth";

  export default {
    data() {
      return {
        article: {},
        articleId: '',
        comments: [],
        content:'',
        page: {index: 1, size: 5},
        flag: true,
        user: getUser()==null?{}:getUser()
      }
    },
    created() {
      this.articleId = this.$route.query.id;
      articleApi.findById(this.articleId).then(res => {
        this.article = res.data.data;
      });
      this.loadMore();
    },
    methods: {
      covert(content) {
        if (content) {
          return content.split("。").map(s => {
            return `<p>${s}。</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
        }
        return content;
      },
      loadMore() {
        commentApi.search(this.articleId, this.page.index, this.page.size).then(res => {
          this.comments = this.comments.concat(res.data.data.rows);
          if (this.page.index * this.page.size >= res.data.data.total) {
            this.flag = false;
          }
          this.page.index++;
        });
      },
      deleteComment(commentId) {
        this.$confirm('此操作将永久确认删除评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          commentApi.deleteById(commentId).then(rep => {
            this.page.index = 1;
            this.comments = [];
            this.loadMore();
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deploy() {
          if (!getUser()){
            this.$message({
              message: '请先登录！',
              type: 'warning'
            });
            return;
          }
          let comment={
            'nickname':this.user.name,
            'avatar':this.user.avatar,
            'userid':this.user.id,
            'articleid':this.articleId,
            'content':this.content
          };
          commentApi.save(comment).then(res=>{
            if (!res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'error'
              });
              return;
            }
            this.page.index = 1;
            this.comments = [];
            this.loadMore();
            this.content='';
          });
      }
    }
  }
</script>

<style>
  p {
    margin-top: 20px;
    font-size: 16px;
    color: #5e5e5e;
  }

  #mine {
    float: none !important;
    overflow: visible !important;
  }
</style>
