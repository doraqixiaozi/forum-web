<template>
  <div class="wrapper tag-item">
    <div class="fl left-list">

      <div class="job-position">
        <div class="job-type reco-job">
          <div class="head">
            <h4 class="title pull-left">推荐职位</h4>
            <span class="more pull-right"><a href="/recruit/more">更多&nbsp;&nbsp;<i class="fa fa-angle-right"
                                                                                   aria-hidden="true"></i></a></span>
            <div class="clearfix"></div>
          </div>
          <ul class="yui3-g job-list" style="display:block;">
            <li class="yui3-u-1-2 job-item" v-for="(item,index) in recommendList" :key="index">
              <p><span class="name">
           <nuxt-link :to="'/recruit/item/'+item.id">{{item.jobname}}</nuxt-link>
         </span><span class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p>
              <p class="need"><span class="money">{{item.salary}}</span>/{{item.experience==''?'无':item.experience}}/{{item.education}}/{{item.type=='2'?'兼职':'全职'}}
              </p>
              <p><span class="company">{{enterpriseMap.get(item.eid)}} &middot; {{item.createtime.substr(0,10)}}</span>
              </p>
            </li>

          </ul>
        </div>
        <div class="job-type latest-job">
          <div class="head">
            <h4 class="title pull-left">最新职位</h4>
            <span class="more pull-right"><a href="/recruit/more">更多&nbsp;&nbsp;<i class="fa fa-angle-right"
                                                                                   aria-hidden="true"></i></a></span>
            <div class="clearfix"></div>
          </div>
          <ul class="yui3-g job-list" style="display:block;">
            <li class="yui3-u-1-2 job-item" v-for="(item,index) in newList" :key="index">
              <p>
         <span class="name">
           <nuxt-link :to="'/recruit/item/'+item.id">{{item.jobname}}</nuxt-link>
           </span><span class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p>
              <p class="need"><span class="money">{{item.salary}}</span>/{{item.experience==''?'无':item.experience}}/{{item.education}}/{{item.type=='2'?'兼职':'全职'}}
              </p>
              <p><span class="company">{{enterpriseMap.get(item.eid)}} &middot; {{item.createtime.substr(0,10)}}</span>
              </p></li>

          </ul>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="hot-company">
        <p class="mail">提交收录请发邮件至862965251@qq.com</p>
        <div class="company">
          <div class="head">
            <h4>热门企业</h4>
          </div>
          <ul class="yui3-g company" style="display:block;">
            <li class="yui3-u-1-3 company-item" v-for="(item,index) in hostList" style="cursor: pointer!important;"
                :key="index" @click="goEnterprise(item.id)">
              <p><img :src="item.logo" alt="" style="width:80px!important;height: 60px!important;"/></p>
              <p class="title">{{item.name}}</p>
              <p class="position">
                <a>{{item.jobcount}}个职位</a></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
  import '~/assets/css/page-sj-recruit-index.css'
  import recruitApi from '@/api/recruit'
  import enterpriseApi from '@/api/enterprise'
  import axios from 'axios'

  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      goEnterprise(id) {
        this.$router.push({path: '/recruit/enterprise', query: {id}})
      }
    },
    asyncData() {
      return axios.all([recruitApi.recommend(), recruitApi.newlist(), enterpriseApi.hotlist()]).then(
        axios.spread(function (recommendList, newList, hostList) {
          let map = new Map();

          hostList.data.data.forEach(e => {
            map.set(e.id, e.name);
          });
          return {
            recommendList: recommendList.data.data,
            newList: newList.data.data,
            hostList: hostList.data.data,
            enterpriseMap: map
          }
        })
      )
    }
  }
</script>


