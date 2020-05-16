<template>
  <div class="wrapper tag-item">
    <div class="job-intro">
      <div class="left-img">
        <img :src="enterprise.logo" alt="" style="width: 114px!important;height: 114px!important;"/>
      </div>
      <div class="middle-intro">
        <div class="name">{{enterprise.name}}</div>
        <!--        <div class="intro">“有赞”基于云服务模式向商户提供免费、强大的微商城系统和完整的微电商行业解决方案，并……</div>-->
        <div class="tag">
          <li v-for="(label,index) in enterprise.labels==null?'':enterprise.labels.split(',')" :key="index">{{label}}</li>
        </div>
        <p class="link"><a :href="enterprise.url" target="_blank">{{enterprise.url==null?'':enterprise.url.split("//")[1]}}</a></p>
      </div>
      <div class="right-tool">
        <button class="sui-btn btn-collect">收藏</button>
        <span>100收藏</span>
        <span>291浏览</span>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="company-index">
      <li class="active"><span>企业主页</span></li>
      <li @click="goJob(enterprise.id)"><span>招聘岗位</span></li>
    </div>
    <div class="fl left-list">
      <div class="tit">关于我们</div>
      <div class="content" v-html="covert(enterprise.summary)"></div>
    </div>
    <div class="fl right-tag">
      <div class="tit">热招岗位</div>
      <div class="job-item" v-for="item in jobs">
        <p><span class="name"><nuxt-link :to="'/recruit/item/'+item.id">{{item.jobname}}</nuxt-link></span><span
          class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p>
        <p class="need"><span class="money">{{item.salary}}</span>/{{item.experience==''?'无':item.experience}}/{{item.education}}/{{item.type=='2'?'兼职':'全职'}}
        </p>
      </div>
      <!--<div class="tit">工作地点</div>
      <div class="point">
        <img src="~/assets/img/page-point.png" alt=""/>
      </div>-->
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-recruit-company.css'
  import enterpriseApi from '@/api/enterprise'
  import recruitApi from "../../../api/recruit";

  export default {
    data() {
      return {
        enterprise: {},
        jobs: []
      }
    },
    created() {
      let id = this.$route.query.id;
      enterpriseApi.findById(id).then(res => {
        this.enterprise = res.data.data;
      });
      recruitApi.search(1, 4, {eid: id}).then(res => {
        this.jobs = res.data.data.rows;
      });
    },
    methods: {
      covert(content) {
        if (content) {
          return content==undefined?'':content.split("。").map(s => {
            return `<p>${s}。</p>`
          }).reduce((prev, cur, index, arr) => {
            return prev + cur;
          });
        }
        return content;
      },
      goJob(id) {
        this.$router.push({path: '/recruit/job', query: {id}})
      }
    }
  }
</script>

<style scoped>

</style>
