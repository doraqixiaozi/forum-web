<template>
  <div class="home-content">

    <div class="activities account-type">
      <h4 class="tit"><span>账户设置</span></h4>
      <div class="account-main">


        <div class="account-person">
          <h3>个人账号</h3>
          <ul class="account-info">
            <li>
              <span class="gray index">名字</span> <span class="info" v-show="!name_input">{{user.nickname}}</span>
              <div v-show="name_input">
                <input type="text" placeholder="输入姓名" v-model="user.nickname"/>
                <button class="sui-btn btn-danger save-btn" type="button" @click="save()">保存</button>
                -
                <button class="sui-btn btn-danger save-btn" type="button" @click="name_input=false">取消</button>
              </div>
              <span class="gray edit" v-show="!name_input"><a class="fa fa-pencil" aria-hidden="true"
                                                              @click="name_edit()">编辑</a> </span>
            </li>
            <li><span class="gray index">Email</span> <span class="info" v-show="!email_input">{{user.email}}</span>
              <div v-show="email_input">
                <input type="text" placeholder="输入邮箱" v-model="user.email"/>
                <button class="sui-btn btn-danger save-btn" type="button" @click="save()">保存</button>
                -
                <button class="sui-btn btn-danger save-btn" type="button" @click="email_input=false">取消</button>
              </div>
              <span class="gray edit" v-show="!email_input"><a class="fa fa-pencil" aria-hidden="true"
                                                               @click="email_edit">编辑</a></span>
            </li>
            <li><span class="gray index">手机号码 </span> <span class="info">{{user.mobile}}</span>
              <form action="" class="sui-form form-inline">
                <input type="phone" placeholder="输入手机号码"/>
                <button class="sui-btn btn-danger save-btn">保存</button>
              </form>
              <span class="gray edit"><i class="fa fa-pencil" aria-hidden="true"></i> 编辑</span></li>
            <li><span class="gray index">密码 </span> <span class="info">点击修改密码</span>
              <form action="" class="sui-form form-inline">
                <input type="password" placeholder="输入新的密码"/>
                <button class="sui-btn btn-danger save-btn">保存</button>
              </form>
              <span class="gray edit"><i class="fa fa-pencil" aria-hidden="true"></i> 编辑</span></li>
          </ul>
        </div>
        <div class="account-other">
          <h3>第三方账号</h3>
          <ul class="account-info">
            <li><span class="gray index"><img src="~/assets/img/widget-weixin.png" width="20"/> 微信</span> <span
              class="name">已绑定，解绑</span> <span class="gray check"><i class="fa fa-square-o" aria-hidden="true"></i> 公开显示</span>
            </li>
            <li><span class="gray index"><img src="~/assets/img/widget-QQ.png" width="20"/> QQ</span> <span
              class="name bind">绑定账号</span> <span class="gray check"><i class="fa fa-square-o" aria-hidden="true"></i> 公开显示</span>
            </li>
            <li><span class="gray index"><img src="~/assets/img/widget-weibo.png" width="20"/> 新浪微博 </span> <span
              class="name">已绑定，解绑</span> <span class="gray check"><i class="fa fa-square-o" aria-hidden="true"></i> 公开显示</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
  import '~/assets/css/page-sj-person-account.css'
  import userApi from '@/api/user'
  import {setUser,getToken,getId} from '@/utils/auth'
  export default {
    asyncData({params, error}) {
      return userApi.info().then(res => {
        return {user: res.data.data}
      })
    },
    methods: {
      name_edit() {
        this.name_input = true;
      },
      email_edit() {
        this.email_input = true;
      },
      save() {
        userApi.saveinfo(this.user).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.name_input = false;
          this.email_input = false;
          this.flush();
        }).catch(error=>{
          this.$message({
            message: error,
            type: 'error'
          });
        });
      },
      flush() {
        userApi.info().then(res => {
          this.user = res.data.data;
          setUser(getToken(),this.user.nickname,getId(),this.user.avatar);
        });
      },
    },
    data() {
      return {
        name_input: false,
        email_input: false
      }
    }
  }
</script>
