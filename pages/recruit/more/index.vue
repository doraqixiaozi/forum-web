<template>
  <div class="wrapper tag-item">
    <div class="fl left-list">
      <div class="search-job">
        <div class="search">
          <form class="sui-form">
            <input type="text" placeholder="找工作" class="input-job" v-model="key" @keypress.enter.prevent="search">
          </form>
         <!-- <div class="input-area">
            <div class="city" data-toggle="modal" data-target="#myModal" data-keyboard="false">北京</div>
          </div>-->
          <div class="btn">
            <span class="sui-btn btn-search" @click="search"><i class=" fa fa-search"></i> 搜索</span>
          </div>
        </div>

        <div class="hot" style="background-color: #f1f1f1">
          <dl>
            <dt>热门搜索：</dt>
            <dd v-for="item in labels" v-text="item.labelname" style="cursor: pointer!important;" @click="clickSearch(item.labelname)"></dd>
          </dl>
          <dl>
            <dt>热门城市：</dt>
            <dd v-for="item in cities" v-text="item.name" style="cursor: pointer!important;" @click="clickSearch(item.name)"></dd>
          </dl>
        </div>
      </div>
      <div class="job-position">
        <div class="job-type latest-job">
          <div class="head">
            <h4 class="title pull-left">最新<span v-text="showKey" style="color: #ec971f"></span>的职位</h4>
            <div class="clearfix"></div>
          </div>
          <div class="jobs">
            <div class="job-item" v-for="item in jobs">
              <div class="sui-row">
                <div class="span3 detail">
                  <p><span class="name"><nuxt-link :to="'/recruit/item/'+item.id">{{item.jobname}}</nuxt-link></span><span
                    class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p>
                  <p class="need"><span class="money">{{item.salary}}</span>/{{item.experience==''?'无':item.experience}}/{{item.education}}/{{item.type=='2'?'兼职':'全职'}}</p>
                </div>
                <div class="span2 type">
                  <p class="company">{{enterpriseMap.get(item.eid)}}</p>
                </div>
                <div class="span2 time">{{item.createtime.substr(0,10)}}</div>
              </div>
            </div>
            <a class="sui-btn btn-block btn-bordered btn-more" v-show="flag" @click="loadMore">查看更多</a>
            <a class="sui-btn btn-block btn-bordered btn-more" v-show="!flag">没有更多了</a>
          </div>
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
          <ul class="yui3-g company">
            <li class="yui3-u-1-3 company-item" v-for="(item,index) in hotList" style="cursor: pointer!important;" :key="index" @click="goEnterprise(item.id)">
              <p><img :src="item.logo" alt="" style="width:80px!important;height: 60px!important;"/></p>
              <p class="title">{{item.name}}</p> <p class="position">
              <a>{{item.jobcount}}个职位</a></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-recruit-area.css'
  import recruitApi from '@/api/recruit'
  import enterpriseApi from '@/api/enterprise'
  import cityApi from "../../../api/city";
  import labelApi from "../../../api/label";
  import search from "../../../api/search";
  export default {
    data(){
      return{
        hotList:[],
        key:'',
        jobs:[],
        page: {index: 1, size: 5},
        flag:true,
        enterpriseMap:new Map(),
        showKey:'',
        cities:[],
        labels:[]
      }
    },
    created() {
      enterpriseApi.hotlist().then(res=>{
        this.hotList=res.data.data;
      });
      this.hotList.forEach(e => {
        this.enterpriseMap.set(e.id, e.name);
      });
      this.getData();
      labelApi.getList().then(res=>{
        this.labels = res.data.data;
      });
      cityApi.getList().then(res=>{
        this.cities = res.data.data;
      });
    },
    methods:{
      clickSearch(key){
        this.key=key;
        this.search();
      },
      goEnterprise(id) {
        this.$router.push({path: '/recruit/enterprise', query: {id}})
      },
      loadMore(){
        this.getData();
      },
      search(){
        this.showKey=this.key;
        this.page.index=1;
        this.flag=true;
        this.jobs=[];
        this.getData();
        this.key='';
      },
      getData(){
        recruitApi.search(this.page.index,this.page.size,{jobname:this.key,address:this.key}).then(res=>{
          this.jobs = this.jobs.concat(res.data.data.rows);
          if (this.page.index * this.page.size >= res.data.data.total) {
            this.flag = false;
          }
          this.page.index++;
        });
      }
    }
  }
</script>

<style scoped>

</style>
