<template>
  <div>
    <!-- <div class="banner">
      <div class="wrapper">
          <img src="~/assets/img/page-banner.png" alt="" />
      </div>
      </div>-->
    <!--两列布局-->
    <div class="wrapper tag-item">
      <div class="fl left-list">
        <h3>消息中心</h3>
        <div class="friend-list">
          <ul>
            <li class="friend-item" style="cursor: pointer" v-if="!user">
              <nuxt-link :to="'/login'">
                <div class="msg">
                  <p class="msg-content" style="text-align: center!important;">快登录和大家聊聊吧！</p>
                </div>
              </nuxt-link>
            </li>
            <li class="friend-item" style="cursor: pointer" v-for="item in messages">
              <nuxt-link :to="'/friend/talk/'+item.fromid">
                <div class="tip">
                  <span class="num" v-text="''" v-if="item.flag=='0'"></span>
                  <img :src="item.avatar" alt="" style="width: 39px!important;height: 39px!important;"/>
                </div>
                <div class="msg">
                  <p><span class="name" v-text="item.nickname"></span><span class="date"
                                                                            v-text="item.createtime"></span></p>
                  <p class="msg-content" v-text="item.content"></p>
                </div>
              </nuxt-link>
            </li>

          </ul>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="friend-info-card">
          <div class="card">
            <div class="photo-name">
              <img src="~/assets/img/widget-photo.png" alt=""/>
              <div class="name-edit">
                <p><span class="name">用户名</span> <span class="edit">编辑兴趣资料</span></p>
                <p>认证</p>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="like">
              <span class="like1">喜欢　<i class="num">400</i></span>
              <span>被喜欢　<i class="num">5</i></span>
            </div>
          </div>
        </div>
        <div class="block-btn">
          <p>遇见，好时光！</p>
          <a class="sui-btn btn-block btn-share" href="./makeFriends-submit.html" target="_blank">发布</a>
        </div>
        <div class="rank">
          <div class="head">
            <h3 class="title">排行榜</h3>
          </div>
          <div class="rank-list">
            <ul class="rank">
              <li><span class="fl dating">喝咖啡</span> <span class="fr cafe">102258</span></li>
              <li><span class="fl dating">吃饭</span> <span class="fr eat">9878</span></li>
              <li><span class="fl dating">看电影</span> <span class="fr movie">2564</span></li>
              <li><span class="fl dating">旅行</span> <span class="fr travel">897</span></li>
            </ul>
          </div>
        </div>
        <div class="friend-line-card">
          <div class="card">
            <p>永远相信美好的事情即将发生</p>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>


  </div>
</template>
<script>
  import '~/assets/css/page-sj-makeFriends-list.css'
  import messageApi from "../../api/message";
  import {getUser} from '@/utils/auth'

  export default {
    data() {
      return {
        messages: [],
        user: getUser(),
      }
    },
    created() {
      messageApi.getUnRead().then(res => {
        if (res.data.data) {
          this.messages = res.data.data;
        }
      })
    },
    methods: {
      getMessage(message) {
        let temp={};
        this.messages.forEach((item,i)=>{
          if (item.fromid==message.fromid){
            temp.index=i;
            temp.fromid=message.fromid;
            temp.content=message.content;
            temp.createtime=message.createtime;
            temp.avatar=item.avatar;
            temp.nickname=item.nickname;
            temp.flag='0';
          }
        });
        this.messages.splice(temp.index,1);
        this.messages.unshift(temp);
      }
    }

  }
</script>
