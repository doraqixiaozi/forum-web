<template>
  <div class="wrapper activities">
    <div class="activity-card-list">
      <div class="top-title">
        <h4 class="latest">最新活动</h4>
        <div class="clearfix"></div>
      </div>
      <div class="activity-list" v-infinite-scroll="loadMore">
        <ul class="activity">
          <li class="activity-item" v-for="(item,index) in items" :key="index">
            <div class="activity-inner">
              <div class="img" v-if="item.image!=null">
                <a :href="'/gathering/item/'+item.id"><img :src="item.image" alt=""
                                                           style="width: 277px!important;height: 167px!important;"/></a>
              </div>
              <div class="img" v-if="item.image==null">
                <a :href="'/gathering/item/'+item.id" target="_blank"><img src="../../assets/img/widget-activity1.png"
                                                                           alt=""/></a>
              </div>
              <div class="text">
                <p class="title">{{item.name}}</p>
                <div class="fl goin">
                  <p>时间：{{item.starttime}}</p>
                  <p>城市：{{cityMap.get(item.city)}}</p>
                </div>
                <div class="fr btn">
                  <span class="sui-btn btn-bao" @click="go(item)">{{getTime(item)}}</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import '~/assets/css/page-sj-activity-index.css'
  import gatheringApi from '@/api/gathering'
  import cityApi from "../../api/city";

  export default {
    data() {
      return {
        pageNo: 1,
        flag: true,
        cityMap: new Map(),//city映射
        date: new Date()
      }
    },
    asyncData() {
      return gatheringApi.search(1, 8, {state: '1'}).then(res => {
        return {items: res.data.data.rows}
      })
    },
    created() {
      cityApi.getList().then(res => {
        res.data.data.forEach(city => {
          this.cityMap.set(city.id, city.name);
        })
      });
    },
    methods: {
      go(item) {
        if (this.date <= new Date(Date.parse(item.enrolltime))) {
          window.location = 'https://www.wenjuan.com/j/iAviayV/';
        }
      },
      getTime(item) {
        if (this.date <= new Date(Date.parse(item.enrolltime))) {
          return '立即报名';
        }
        if (new Date(Date.parse(item.starttime)) <= this.date && new Date(Date.parse(item.endtime)) >= this.date) {
          return '正在进行';
        }
        return '活动结束';
      },
      loadMore() {
        this.pageNo++;
        if (this.flag) {
          gatheringApi.search(this.pageNo, 8, {state: '1'}).then(res => {
            this.items = this.items.concat(res.data.data.rows);
            if (res.data.data.rows == null || res.data.data.rows.length == 0) {
              this.flag = false;
            }
          })
        }
      }
    }
  }
</script>

