<template>
  <div>
    <!--头部导航-->
    <header>
      <div class="wrapper">
        <div class="sui-navbar">
          <div class="navbar-inner">
            <a href="index-logined.html" class="sui-brand"><img src="~/assets/img/asset-logo-black.png" alt="社交"/></a>
            <ul class="sui-nav">
              <li class="active">
              <li>
                <nuxt-link to="/">首页</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/qa">问答</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gathering">活动</nuxt-link>
              </li>

              <!--              <li>-->
              <!--                <nuxt-link to="/spit">吐槽</nuxt-link>-->
              <!--              </li>-->
              <li>
                <nuxt-link to="/recruit">招聘</nuxt-link>
              </li>
              <li @click="flag=false">
                <nuxt-link to="/friend">消息<span class="alert" v-text="''" v-if="flag"></span></nuxt-link>
              </li>
            </ul>
            <form class="sui-form sui-form pull-left">
              <input type="text" placeholder="输入关键词..." v-model="key" @keyup.enter="doChild"/>
              <span class="btn-search fa fa-search" @click="doChild"></span>
            </form>
            <div class="sui-nav pull-right info">
              <li>
                <nuxt-link to="/login"
                           class="notice" v-if="user==null">登录
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/login"
                           class="notice" v-if="user==null">注册
                </nuxt-link>
              </li>
              <li><a href="~/assets/other-notice.html" target="_blank"
                     class="notice" v-if="user!=null">{{user.name==null?'':user.name}}</a></li>
              <li><a @click="logout"
                     class="notice" v-if="user!=null">注销</a></li>
              <li v-if="user!=null">
                <nuxt-link to="/manager" class="homego"><img
                  :src="user.avatar" alt="用户头像" style=" width: 49px !important;height: 40px !important;"/></nuxt-link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </header>
    <nuxt-child ref="child" @sendMessage="webSocketSend"/>
    <footer>
      <div class="footer">
        <div class="wrapper">
          <div class="footer-bottom">
            <div class="link">
              <dl>
                <dt>
                  网站相关
                </dt>
                <dd>
                  关于我们
                </dd>
                <dd>
                  服务条款
                </dd>
                <dd>
                  帮助中心
                </dd>
                <dd>
                  编辑器语法
                </dd>
              </dl>
              <dl>
                <dt>
                  常用链接
                </dt>
              </dl>
              <dl>
                <dt>
                  联系我们
                </dt>
                <dd>
                  联系我们
                </dd>
                <dd>
                  加入我们
                </dd>
                <dd>
                  建议反馈
                </dd>
              </dl>
              <dl>
                <dt>
                  关注我们
                </dt>
                <dd>
                  微博
                </dd>
                <dd>
                  twitter
                </dd>
              </dl>
              <div class="xuke">
                <h3>内容许可</h3>
                <p>除特别说明外，用户内容均采用知识共享署名-非商业性使用-禁止演绎4.0 国际许可协议 (CC BY-NC-ND 4.0) 进行许可</p>
              </div>
            </div>
            <p class="Copyright">Copyright &copy; 2020 当前版本 0.0.1</p>
          </div>
        </div>
      </div>
    </footer>
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
  import {removeUser, getUser} from '@/utils/auth'
  import url from '@/api/webSocket';

  export default {
    data() {
      return {
        user: null,
        key: '',
        webSocket: null,
        flag:false
      }
    }
    , created() {
      let user = getUser();
      if (user != null && user.token != null && user.token != '') {
        this.user = user;
        this.initWebSocket();
      }
    },
    methods: {
      logout() {
        removeUser();
        location.href = '/';
      },
      doChild() {
        this.$refs.child.callMe(this.key);
      },
      initWebSocket() { //初始化weosocket
        const wsuri = url;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.webSocketOnMessage;
        this.websock.onopen = this.webSocketOnOpen;
        this.websock.onerror = this.webSocketOnError;
        this.websock.onclose = this.webSocketOnClose;
      },
      webSocketOnOpen() { //连接建立之后执行send方法发送数据
      },
      webSocketOnError() {//连接建立失败重连
        this.initWebSocket();
      },
      webSocketOnMessage(e) { //数据接收
        this.flag=true;
        let redata = JSON.parse(e.data);
        this.$refs.child.getMessage(redata);
      },
      webSocketSend(Data) {//数据发送
        this.websock.send(JSON.stringify(Data));
      },
      webSocketOnClose(e) {  //关闭
        console.log('断开连接', e);
      },
    }
  }
</script>
<style>
  .nuxt-link-exact-active {
    color: coral !important;
  }

  .alert {
    min-width: 18px;
    height: 18px;
    background: red;
    box-sizing: border-box;
    color: white;
    font-size: 10px;
    text-align: center;
    line-height: 20px;
    padding: 0 5px;
    border-radius: 10px;
    display: inline-block;
  }

</style>
