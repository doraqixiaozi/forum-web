<template>
  <div class="wrapper tag-item">
    <div class="job-intro">
      <div class="left-img">
        <img :src="enterprise_item.logo" style="width:114px!important;height: 114px!important;"/>
      </div>
      <div class="middle-intro">
        <div class="name">
          {{item.jobname}} &middot; {{enterprise_item.name}}
        </div>
        <div class="intro">
          {{item.salary}} / {{item.experience==''?'无':item.experience}} / {{item.education}} /
          {{item.type=='2'?'兼职':'全职'}}
        </div>
        <div class="tag">
          <!--      <li>{{item.label}}</li>-->
        </div>
      </div>
      <div class="right-tool">
        <p class="throw">
          <a class="sui-btn btn-throw" style="width: 94px!important;height: 27.6px!important;" :href="item.url" target="_blank">投简历</a>
        </p>
        <button class="sui-btn btn-collect" style="width: 94px!important;height: 27.6px!important;">收藏</button>
        <span>100收藏</span>
        <span>291浏览</span>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="fl left-list ">
      <div class="tit">
        <span>职位描述</span>
      </div>
      <div class="content">
        <p v-html="covert(item.content1)"></p>

      </div>
      <div class="tit">
        <span>职位要求</span>
      </div>
      <div class="content">
        <p v-html="covert(item.content2)"></p>

      </div>
      <div class="time">
        发布于1小时前
      </div>
    </div>
    <div class="fl right-tag">
      <div class="company-job">
        <div class="intro">
          <img :src="enterprise_item.logo" alt="" style="width:116px!important;height: 116px!important;"/>
          <div class="title">
            {{enterprise_item.name}}
          </div>
          <div class="content">
            {{enterprise_item.summary.substr(0,20)+'....'}}
          </div>
        </div>
        <div class="tag">
          <li v-for="(label,index) in enterprise_item.labels.split(',')" :key="index">{{label}}</li>
        </div>
        <div class="btns">
          <a class="sui-btn btn-home" :href="enterprise_item.url" target="_blank">企业主页</a>
          <a class="sui-btn btn-position" @click="goJob(enterprise_item.id)">{{enterprise_item.jobcount}}个职位</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '~/assets/css/page-sj-recruit-detail.css'
  import recruitApi from '@/api/recruit'
  import enterpriseApi from '@/api/enterprise'
  import labelApi from "../../../api/label";

  export default {
    data() {
      return {
        labelMap: new Map()//label映射
      }
    },
    created() {
      labelApi.getList().then(res => {
        this.label = res.data.data;
        this.label.forEach(item => {
          this.labelMap.set(item.id, item.labelname);
        });
      });
    },
    methods: {
      covert(content) {
        let result;
        if (content) {
        result=  content.split("；").map(s => {
            return `<p>${s}；</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
        result=result.split(";").map(s => {
          return `<p>${s};</p>`
        }).reduce((prev, cur, index, arr) => {
          return prev + cur;
        });
          result=result.split("。").map(s => {
            return `<p>${s}。</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
          result=result.split(".").map(s => {
            return `<p>${s}.</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
          result=result.split("、").map(s => {
            return `<p>${s}、</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
        }
        return result;
      },
      goJob(id) {
        this.$router.push({path: '/recruit/job', query: {id}})
      }
    },
    asyncData({params}) {
      return recruitApi.findById(params.id).then(res => {
        return enterpriseApi.findById(res.data.data.eid).then(
          res2 => {
            return {
              enterprise_item: res2.data.data,
              item: res.data.data
            }
          }
        )
      })
    }
  }
</script>
