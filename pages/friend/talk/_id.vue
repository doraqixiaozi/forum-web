<template>
  <div class="wrapper tag-item">
    <div class="fl left-list">
      <div class="friend-chat">
        <h4>您正在和<span style="color: #ec971f" v-text="you.nickname"></span>聊天</h4>
        <div class="chat-bg">
          <div class="chat-box">
            <!-- <span class="chat-trip">此刻对方忙碌，请留言</span> -->
            <div class="bubbleDiv" style="overflow:scroll!important; width:95%; height:400px;">
              <div class="talk-content">
                <div :class="item.fromid==me.id?'talk-rit':'talk-left'" v-for="item in messages">
                  <div class="img" v-if="item.fromid!=me.id">
                    <img :src="you.avatar"/>
                  </div>
                  <div class="text" :style="item.fromid!=me.id?{}:{marginLeft:getLength(item.content)+'px'}">
                    <p class="info">
                      <span class="name" v-text="item.fromid==me.id?'':you.nickname"></span>
                      <span class="time" v-text="item.createtime.substr(12,8)"></span>
                    </p>
                    <p class="word">{{item.content}} </p>
                  </div>
                  <div class="img" v-if="item.fromid==me.id">
                    <img :src="me.avatar"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-edit clearfix">
            <textarea class="chat-info" v-model="message"></textarea>
            <button class="send-btn fr" @click="sendMessage">发送</button>
          </div>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="friend-info-card">
        <div class="card">
          <div class="photo-name">
            <img src="~/assets/img/widget-photo.png" alt="">
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
        <p>约一约有趣的人，会一会好的时光！</p>
        <a class="sui-btn btn-block btn-share" href="./makeFriends-submit.html" target="_blank">发布约会</a>
      </div>
      <div class="rank">
        <div class="head">
          <h3 class="title">排行榜</h3>
        </div>
        <div class="rank-list">
          <ul class="rank">
            <li>
              <span class="fl dating">喝咖啡</span>
              <span class="fr cafe">102258</span>
            </li>
            <li>
              <span class="fl dating">吃饭</span>
              <span class="fr eat">9878</span>
            </li>
            <li>
              <span class="fl dating">看电影</span>
              <span class="fr movie">2564</span>
            </li>
            <li>
              <span class="fl dating">旅行</span>
              <span class="fr travel">897</span>
            </li>
          </ul>

        </div>
      </div>
      <div class="friend-line-card">
        <div class="card">
          <p>找个合适的参加一场线下活动</p>
        </div>
      </div>
      <div class="friend-line-card">
        <div class="card">
          <p>找个合适的参加一场线下活动</p>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-makeFriends-talk.css'
  import userApi from '@/api/user';
  import {getUser} from '@/utils/auth';
  import messageApi from "../../../api/message";
  export default {
    methods: {
      sendMessage() {
        let message={
          fromid: this.me.id,
          toid: this.you.id,
          content: this.message,
          createtime:this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date())
        };
        this.$emit('sendMessage', message);
        this.messages.push(message);
        this.message='';
      },
      getMessage(message) {
        this.messages.push(message);
      },
      getLength(content) {
        let length=450;
        if (content.length > 20) {
          return length;
        }
        length=length+(20-content.length)*12;
        return length;
      },
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
          }
        }
        return fmt;
      }
    },
    data() {
      return {
        message: '',
        me: {},
        you: {},
        messages: []
      }
    },
    created() {
      userApi.findById(this.$route.params.id).then(res => {
        this.you = res.data.data;
      });
      let user = getUser();
      this.me = user == null ? {} : user;
      messageApi.getMessage(this.$route.params.id).then(res=>{
        this.messages=res.data.data;
      })
      messageApi.hasRead(this.$route.params.id);
    },
    updated() {
      this.$nextTick(function(){
        var div = document.querySelector(".bubbleDiv");
        div.scrollTop = div.scrollHeight;
      })
    },
    beforeDestroy() {
      messageApi.hasRead(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>
