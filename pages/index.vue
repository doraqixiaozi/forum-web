<template>
  <div>
    <!--三列布局-->
    <div class="wrapper">
      <div class="sj-content">
        <div class="left-nav">
          <div class="float-nav" id="float-nav">
            <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical" id="column">
              <li @click="getHotArticle($event)"><a href="#">热门</a>
              </li>
              <li v-for="item in channel" @click="getArticle(item,$event)" :key="item.id"><a href="#">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-content" id="mine">
          <div class="fl middle">
            <div class="data-list">
              <ul class="headline fixed" id="headline">

                <li v-for="item in article" class="headline-item" style="cursor:pointer">
                  <div class="fl indexImg" v-if="item.image" @click="expend(item.id)">
                    <img :src="item.image" style="width: 160px;height: 120px"/>
                  </div>
                  <div class="words">
                    <h3 v-text="item.title" @click="expend(item.id)"></h3>
                    <h5 class="author" @click="goTalk(item.userid)">
                      <div class="fl">
                        <span class="authorName"> <img :src="item.avatar" alt=""/> {{item.nickname}} </span>
                        <span v-text="item.createtime"></span>
                      </div>
                      <div class="clearfix"></div>
                    </h5>
                  </div>
                  <p class="content" @click="expend(item.id)">
                    {{lessContent(item.content)}}</p>
                </li>
              </ul>
              <ul id="loaded" class="headline">
              </ul>
              <a class="sui-btn btn-block btn-bordered btn-more" v-show="flag" @click="loadMore">查看更多</a>
              <a class="sui-btn btn-block btn-bordered btn-more" v-show="!flag">没有更多了</a>
            </div>
            <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> -->
          </div>
          <div class="fl right">
            <div class="activity">
              <div class="acti">
                <img src="http://n.sinaimg.cn/sc/transform/59/w550h309/20200417/19b9-iskepxs9581770.png" alt="活动一"/>
              </div>
              <div class="acti">
                <img src="http://conference.boolan.com/FvIKCbWrM5oYPJFB7vbL3nZQhCYp" alt="活动一"/>
              </div>
            </div>
            <div class="block-btn">
              <p>今天，有什么好东西要和大家分享么?</p>
              <a class="sui-btn btn-block btn-share" @click="toSubmit">发布分享</a>
            </div>
            <div class="question-list">
              <h3 class="title">热门回答</h3>
              <div class="lists">
                <ul>
                  <li class="list-item"><p class="list-title">关于系统问答你都应该都应该都应该注意些什么吗？</p>
                    <p class="authorInfo"><span class="authorName"><img src="~/assets/img/widget-photo.png" alt=""/>玻璃筒</span>
                      <span>6月22日 12:01</span></p></li>
                  <li class="list-item"><p class="list-title">关于系统问答你都应该注意吗？</p>
                    <p class="authorInfo"><span class="authorName"><img src="~/assets/img/widget-photo.png" alt=""/>玻璃筒</span>
                      <span>6月22日 12:01</span></p></li>
                  <li class="list-item"><p class="list-title">关于系统问答你都应该注意吗？</p>
                    <p class="authorInfo"><span class="authorName"><img src="~/assets/img/widget-photo.png" alt=""/>玻璃筒</span>
                      <span>6月22日 12:01</span></p></li>
                  <li class="list-item"><p class="list-title">关于系统问答你都应该注意吗？</p>
                    <p class="authorInfo"><span class="authorName"><img src="~/assets/img/widget-photo.png" alt=""/>玻璃筒</span>
                      <span>6月22日 12:01</span></p></li>
                  <li class="list-item"><p class="list-title">关于系统问答你都应该注意吗？</p>
                    <p class="authorInfo"><span class="authorName"><img src="~/assets/img/widget-photo.png" alt=""/>玻璃筒</span>
                      <span>6月22日 12:01</span></p></li>
                </ul>
                <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
              </div>
            </div>
            <div class="card-list">
              <div class="head">
                <h3 class="title">遇见TA</h3>
              </div>
              <div class="list">
                <ul>
                  <li class="card-item">
                    <div class="attention">
                      <span>关注匹配度：<i class="degree">83%</i></span>
                      <span class="fr"><i class="fa fa-heart-o" aria-hidden="true"></i><i class="fa fa-times close"
                                                                                          aria-hidden="true"></i></span>
                    </div>
                    <div class="img">
                      <img src="~/assets/img/widget-t01be3f1015cf52e1f3.png" alt=""/>
                    </div>
                    <div class="info">
                      <div class="fl photo">
                        <img src="~/assets/img/widget-photo.png" alt=""/>
                      </div>
                      <div class="fl intro">
                        <p>【馨儿】发布了雕刻时光约会邀请</p>
                        <p class="name">玻璃通 <span class="date">6月22日 12:01</span></p>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                  </li>
                  <li class="card-item">
                    <div class="attention">
                      <span>关注匹配度：<i class="degree">86%</i></span>
                      <span class="fr"><i class="fa fa-heart-o" aria-hidden="true"></i><i class="fa fa-times close"
                                                                                          aria-hidden="true"></i></span>
                    </div>
                    <div class="img">
                      <img src="~/assets/img/widget-MOG88A60E7ZI.png" alt=""/>
                    </div>
                    <div class="info">
                      <div class="fl photo">
                        <img src="~/assets/img/widget-photo.png" alt=""/>
                      </div>
                      <div class="fl intro">
                        <p>【馨儿】发布了雕刻时光约会邀请</p>
                        <p class="name">玻璃通 <span class="date">6月22日 12:01</span></p>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                  </li>
                  <li class="card-item">
                    <div class="attention">
                      <span>关注匹配度：<i class="degree">78%</i></span>
                      <span class="fr"><i class="fa fa-heart-o" aria-hidden="true"></i><i class="fa fa-times close"
                                                                                          aria-hidden="true"></i></span>
                    </div>
                    <div class="img">
                      <img src="~/assets/img/widget-t019e2d84e53580b099.png" alt=""/>
                    </div>
                    <div class="info">
                      <div class="fl photo">
                        <img src="~/assets/img/widget-photo.png" alt=""/>
                      </div>
                      <div class="fl intro">
                        <p>【馨儿】发布了雕刻时光约会邀请</p>
                        <p class="name">玻璃通 <span class="date">6月22日 12:01</span></p>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                  </li>
                </ul>
                <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
              </div>
            </div>
            <div class="activity-list">
              <h3 class="title">活动日历</h3>
              <div class="list">
                <ul>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="~/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="~/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="~/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="~/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
              </div>
            </div>
            <div class="ad-carousel">
              <div class="carousel">
                <div id="myCarousel" data-ride="carousel" data-interval="4000" class="sui-carousel slide">
                  <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="active item">
                      <img src="~/assets/img/widget-ad01.png"/>
                    </div>
                    <div class="item">
                      <img src="~/assets/img/widget-ad01.png"/>
                    </div>
                    <div class="item">
                      <img src="~/assets/img/widget-ad01.png"/>
                    </div>
                  </div>
                  <span class="adname">广告</span>
                </div>
              </div>
            </div>
            <!-- <link rel="import" href=".~/assets/.~/assets/modules/ui-modules/footer/footer.html?__inline"> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/page-headline-logined.css'
  import channelApi from "../api/channel";
  import articleApi from "../api/article";
  import searchApi from "../api/search";
  import {getUser, getId} from "../utils/auth";

  export default {
    data() {
      return {
        channel: [],
        article: [],
        page: {index: 1, size: 5},
        flag: true,
        searchMap: {}
      }
    },
    created() {
      channelApi.getList().then(res => {
        this.channel = res.data.data;
      });
      this.loadMore();
    },
    mounted() {

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
      toSubmit() {
        if (getUser() == null) {
          this.$message({
            message: '请先登录',
            type: 'warning'
          });
          return;
        }
        this.$router.push({path: '/article/submit', query: {}});
      },
      getHotArticle(event) {
        this.page = {index: 1, size: 5};
        this.searchMap = {istop: '1'};
        this.article = [];
        this.loadMore();
        event.target.parentNode.parentNode.childNodes.forEach(node => {
          if (node.classList) {
            node.classList.remove("active");
          }
        });
        event.target.parentNode.classList.add("active");
      },
      getArticle(item, event) {
        this.page = {index: 1, size: 5};
        this.searchMap.channelid = item.id;
        this.searchMap.istop = null;
        this.article = [];
        this.loadMore();
        event.target.parentNode.parentNode.childNodes.forEach(node => {
          if (node.classList) {
            node.classList.remove("active");
          }
        });
        event.target.parentNode.classList.add("active");
      },
      lessContent(content) {
        let length = 100;
        if (content.length > length) {
          return content.substr(0, length) + '......';
        }
        return content;
      },
      expend(id) {
        this.$router.push({path: '/article', query: {id}})
      },
      loadMore() {
        this.searchMap.state = '1';
        articleApi.search(this.page.index, this.page.size, this.searchMap).then(res => {
          this.article = this.article.concat(res.data.data.rows);
          if (this.page.index * this.page.size >= res.data.data.total) {
            this.flag = false;
          }
          this.page.index++;
        });
      },
      callMe(key) {
        searchApi.search(1, 100, {key: key}).then(res => {
          this.article = [];
          this.article = this.article.concat(res.data.data.rows);
        }).catch(error => {
          this.$message({
            message: error,
            type: 'error'
          });
        });
      }

    }
  }
</script>
<style>
  #mine {
    float: none !important;
    overflow: visible !important;
  }
</style>
