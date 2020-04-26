<template>
  <div>
    <div class="tab-nav ">
      <div class="wrapper">
        <ul class="fl sui-nav nav-tabs navbar-dark">
          <li class="active" @click.prevent="getProblemByTop($event)"><a data-toggle="tab">首页</a></li>
          <li v-for="item in label" @click.prevent="getProblemByLabel(item,$event)"><a  data-toggle="tab">{{item.labelname}}</a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--两列布局-->
    <div class="wrapper qa-content">
      <div class="fl left-list">
        <div class="tab-content">
          <div id="index" class="tab-pane active">
            <div class="tab-bottom-line">
              <ul class="sui-nav nav-tabs">
                <li class="active" @click.prevent="getNewReply"><a  data-toggle="tab">最新回答</a></li>
                <li @click.prevent="getHotReply"><a  data-toggle="tab">热门回答</a></li>
                <li @click.prevent="getWaitReply"><a  data-toggle="tab">等待回答</a></li>
              </ul>
              <div class="qa-list">
                <div class="tab-content">
                  <div id="new" class="tab-pane active">
                    <ul class="detail-list">


                      <li class="qa-item" v-for="item in problem">
                        <div class="fl record">
                          <div class="number">
                            <div class="border useful" style="cursor:pointer" @click="thumb(item)">
                              <p class="usenum">{{item.thumbup}}</p>
                              <p>有用</p>
                            </div>
                            <div class="border answer" style="cursor:pointer">
                              <p class="ansnum">{{item.reply}}</p>
                              <p>回答</p>
                            </div>
                          </div>
                        </div>
                        <div class="fl info">
                          <div class="question">
                            <p class="author"><span
                              class="name">{{item.replyname}}</span><span>{{item.replytime}}</span></p>
                            <p class="title"><a @click="goDetail(item.id,labelMap.get(item.labelid))" style="cursor:pointer">{{item.title}}</a></p>
                          </div>
                          <div class="other">
                            <ul class="fl sui-tag">
                              <li>{{labelMap.get(item.labelid)}}</li>
                            </ul>
                            <div class="fr brower">
                              <p>浏览量 {{item.visits}} | {{item.createtime}} 来自 <a>{{item.nickname }}</a></p>
                            </div>
                          </div>
                        </div>
                        <div class="clearfix"></div>
                      </li>
                      <li><a class="sui-btn btn-block btn-share"  @click.prevent="loadMore" v-if="flag">加载更多</a>
                        <a class="sui-btn btn-block btn-share"  @click.prevent="loadMore" v-if="!flag">人家是有底线的呢</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="block-btn">
          <p>今天，有什么问题要和大家分享么?</p>
          <a class="sui-btn btn-block btn-share" href="./qa-submit.html" target="_blank">发布问题</a>
        </div>
        <div class="hot-tags">
          <div class="head">
            <h3 class="title">热门标签</h3>
          </div>
          <div class="tags">
            <ul class="sui-tag">
              <li v-for="item in label" @click="getProblemByLabel(item,$event)">{{item.labelname}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>

    </div>

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
  import '~/assets/css/page-sj-qa-logined.css'
  import labelApi from "../../api/label";
  import {getUser} from "../../utils/auth";
  import problemApi from "../../api/problem";

  export default {
    data() {
      return {
        label: [],
        user: getUser(),
        order: 'newR',//newP最近发布，newR最近回复，hot最多回答
        searchMap: {},
        problem: [],
        page: {index: 1, size: 5},
        flag: true,//是否还有更多页
        labelMap: new Map()//label映射
      }
    },
    created() {
      labelApi.getList().then(res => {
        this.label = res.data.data;
        this.label.forEach(item => {
          this.labelMap.set(item.id, item.labelname);
          console.log(this.labelMap);
        });
      });
      this.fetchData();
    },
    methods: {
      goDetail(id,labelName){
        this.$router.push({path: '/qa/detail', query: {id,labelName}})
      },
      thumb(item){
       problemApi.thumb(item.id).then(res=>{
         if (res.data.flag){
           this.$message({
             message: '点赞成功',
             type: 'success'
           });
           item.thumbup++;
         }
       })
      },
      loadMore() {
        if (this.order == 'newR') {
          problemApi.searchOrderByReplyTime(this.page.index, this.page.size, this.searchMap).then(res => {
            this.problem = this.problem.concat(res.data.data.rows);
            if (this.page.index * this.page.size >= res.data.data.total) {
              this.flag = false;
            }
            this.page.index++;
          });
        }
        if (this.order == 'newP') {
          problemApi.searchOrderByCreateTime(this.page.index, this.page.size, this.searchMap).then(res => {
            this.problem = this.problem.concat(res.data.data.rows);
            if (this.page.index * this.page.size >= res.data.data.total) {
              this.flag = false;
            }
            this.page.index++;
          });
        }
        if (this.order == 'hot') {
          problemApi.searchOrderByReply(this.page.index, this.page.size, this.searchMap).then(res => {
            this.problem = this.problem.concat(res.data.data.rows);
            if (this.page.index * this.page.size >= res.data.data.total) {
              this.flag = false;
            }
            this.page.index++;
          });
        }
      },
      fetchData() {
        this.page = {index: 1, size: 5};
        this.problem = [];
        this.loadMore();
      },
      getNewReply(e) {
        this.activeLabel(e);
        this.order = 'newR';
        this.searchMap.solve = '1';
        this.fetchData();
      },
      getWaitReply(e) {
        this.activeLabel(e);
        this.order = 'newP';
        this.searchMap.solve = '0';
        this.fetchData();
      },
      getHotReply(e) {
        this.activeLabel(e);
        this.order = 'hot';
        this.searchMap.solve = '1';
        this.fetchData();
      },
      getProblemByTop(e) {
        this.activeLabel(e);
        this.searchMap.labelid = null;
        this.fetchData();
      },
      getProblemByLabel(item, e) {
        this.activeLabel(e);
        this.searchMap.labelid = item.id;
        this.fetchData();
      },
      activeLabel(e) {
        e.target.parentNode.parentNode.childNodes.forEach(node => {
          if (node.classList) {
            node.classList.remove("active");
          }
        });
        e.target.parentNode.classList.add("active");
      }
    }
  }
</script>
