<template>
  <div class="home-content">
    <ul class="sui-nav nav-tabs nav-large">
      <li class="active"><a href="#one" data-toggle="tab">我的提问</a></li>
<!--      <li><a href="#two" data-toggle="tab">我的回答</a></li>-->
    </ul>
    <div class="tab-content tab-wraped">
      <div id="one" class="tab-pane active">
        <ul class="question-list">
          <li v-for="item in problem"><span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span> <span class="title"><a style="cursor: pointer"
            @click="goDetail(item.id)">{{item.title}}</a></span> <span class="fr date">{{item.createtime}}</span> <span class="clearfix"></span></li>
        </ul>
      </div>
    </div>
    <div class="activities">
      <h4 class="tit"><span>我的动态</span></h4>
      <ul class="activities-content">
        <li>
          <div class="index-title">
            <span class="author">本杰明</span>
            <span class="operate">关注了标签</span> &middot;
            <span class="time">3小时前</span>
          </div>
          <div class="guanzhuname">
            <span class="tag">php</span>
            <span class="tagnum">100</span> 关注
          </div>
          <div class="intro">
            PHP，是英文超文本预处理语言 Hypertext Preprocessor 的缩写。PHP 是一种开源的通用计算机脚本语言，尤其适用于网络开发并可嵌入HTML中使用。PHP
            的语法借鉴吸收C语言、Java和Perl等流行计算机语言的特点，易于一般程序员学习。
          </div>
        </li>
        <li>
          <div class="index-title">
            <span class="author">本杰明</span>
            <span class="operate">回答了问题</span> &middot;
            <span class="time">3小时前</span>
          </div>
          <div class="question">
            <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
            <p class="content">现在针对这个微信是屏蔽的，你可以选择通过连接到一个其他的公众号文章中进行关注。</p>
          </div>
          <div class="qa-num">
            <span>关注<i>1</i></span>
            <span>回答<i>2</i></span>
          </div>
        </li>
        <li>
          <div class="index-title">
            <span class="author">本杰明</span>
            <span class="operate">收藏了文章</span> &middot;
            <span class="time">3小时前</span>
          </div>
          <div class="question">
            <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
          </div>
          <div class="qa-num">
            <span><a href="#">http://baidu.com</a></span>
          </div>
        </li>
        <li>
          <div class="index-title">
            <span class="author">本杰明</span>
            <span class="operate">收藏了文章</span> &middot;
            <span class="time">3小时前</span>
          </div>
          <div class="question">
            <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
          </div>
          <div class="qa-num">
            <span><a href="#">http://baidu.com</a></span>
          </div>
        </li>
        <li>
          <div class="index-title">
            <span class="author">本杰明</span>
            <span class="operate">回答了问题</span> &middot;
            <span class="time">3小时前</span>
          </div>
          <div class="question">
            <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
            <p class="content">现在针对这个微信是屏蔽的，你可以选择通过连接到一个其他的公众号文章中进行关注。</p>
          </div>
          <div class="qa-num">
            <span>关注<i>1</i></span>
            <span>回答<i>2</i></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import problemApi from "../../api/problem";
  import {getId} from '@/utils/auth'

  export default {
    data() {
      return {
        problem: []
      }
    },
    created() {
      problemApi.list(1, 5, {userid: getId()}).then(res => {
        this.problem = res.data.data.rows;
      });
    },
    methods: {
      goDetail(id) {
        this.$router.push({path: '/qa/detail', query: {id}})
      },
    }
  }
</script>
