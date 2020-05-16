<template>
  <div class="wrapper">
    <div class="qa-submit-form">
      <form action="" class="sui-form">
        <div class="input-title">
          <input type="text" placeholder="标题：一句话说清问题，用问号结尾" class="input-xfat input-xxlarge title" v-model="pojo.title">
        </div>
        <div class="tags-area" style="font-size: 17px!important;">
          <div class="input-tags">
            <el-select v-model="pojo.labelid" placeholder="标签">
              <el-option
                v-for="item in label"
                :key="item.id"
                :label="item.labelname"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

        </div>

        <textarea class="editor" style="width: 99% !important;height: 259px !important;"
                  v-model="pojo.content"></textarea>
        <div class="submit">
          <span>已保存草稿</span>
          <span @click="submit"><a class="sui-btn btn-release">发布问题</a></span>
        </div>
        <div class="clearfix"></div>
      </form>
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
  import '~/assets/css/page-sj-qa-submit.css'
  import labelApi from "../../../api/label";
  import problemApi from "../../../api/problem";
  import {getUser} from "../../../utils/auth";
  export default {
    data() {
      return {
        label: [],
        pojo: {}
      }
    },
    created() {
      labelApi.getList().then(res => {
        this.label = res.data.data;
      });
      let user = getUser();
      if (user) {
        this.pojo.userid = user.id;
        this.pojo.nickname = user.name;
      }
    },
    methods: {
      submit() {
        if (!this.pojo.title) {
          this.$message({
            message: '标题不能为空！',
            type: 'warning'
          });
          return;
        }
        if (!this.pojo.content) {
          this.$message({
            message: '内容不能为空！',
            type: 'warning'
          });
          return;
        }
        if (!this.pojo.labelid) {
          this.$message({
            message: '标签不能为空！',
            type: 'warning'
          });
          return;
        }
        if (!this.pojo.userid) {
          this.$message({
            message: '请先登录！',
            type: 'warning'
          });
          return;
        }
        problemApi.save(this.pojo).then(res => {
          if (res.data.flag) {
            this.$message({
              type: 'success',
              message: '发布成功!'
            });
            this.pojo.content='';
            this.pojo.title='';
            this.pojo.labelid='';
          }
        }).catch(erro=>{
          this.$message({
            type: 'error',
            message: erro
          });
        })
      }
    }
  }
</script>

<style>
  .el-icon-arrow-up {
    display: none !important;
  }

  .el-input {
    width: 775% !important;
  }
</style>
