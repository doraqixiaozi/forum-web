<template>
  <div>
    <!--两列布局-->
    <div class="wrapper">
      <div class="submit-headline">
        <div class="left-box">
          <h3 class="tit">
            <span>发布头条</span>
          </h3>
          <form class="sui-form form-horizontal">

            <div class="control-group">
              <div class="controls title-input">
                <input type="text" v-model="article.title" placeholder="标题：不超过30个字符"></input>
              </div>
            </div>

            <div class="control-group select">
              <el-select v-model="article.channelid" placeholder="所属频道" size="medium">
                <el-option
                  v-for="item in channels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div class="editor edit_container">
              <textarea name="editor1" style="width: 99%;height: 200px;font-size: 16px" v-model="article.content"
                        placeholder="文章内容"></textarea>
            </div>
            <div class="submit">
              <button class="sui-btn btn-xlarge  btn-success" @click.prevent="submit">提交</button>
            </div>
          </form>
        </div>
        <div class="right-tips">
          <h3>文章封面</h3>
          <el-upload
            action="none"
            class="avatar-uploader"
            :http-request="uploadImg"
            list-type="picture-card"
            :show-file-list="false"
            v-show="article.image==''?true:false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="el-upload-list el-upload-list--picture-card" v-show="article.image!=''?true:false">
            <div class="el-upload-list__item is-success">
              <img class="el-image__inner el-image__preview" v-show="article.image!=''?true:false" :src="article.image">
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-check"></i>
              </label>
              <span class="el-upload-list__item-actions">
               <!-- 删除图片-->
               <span class="el-upload-list__item-delete">
                 <i class="el-icon-delete" @click="article.image=''?true:false"></i>
               </span>
                <!--放大图片-->
                 <span class="el-upload-list__item-delete">
                 <i class="el-icon-zoom-in" @click="dialogVisible=true"></i>
               </span>
               </span>
            </div>
          </div>
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body='dialogVisible'
                     :append-to-body="dialogVisible">
            <img width="100%" :src="article.image" alt>
          </el-dialog>
        </div>
      </div>
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
  import '~/assets/css/page-sj-headline-submit.css'
  import fileUpload from "@/api/fileUpload";
  import channelApi from "../../../api/channel";
  import {getUser} from "../../../utils/auth";
  import articleApi from "../../../api/article";

  export default {
    data() {
      return {
        article: {
          image: '',
          title: '',
          content: '',
          channelid: '',
          istop: '0',
          state: '0',
          flag: '0'
        },
        dialogVisible: false,
        channels: [],
      }
    },
    components: {},
    methods: {
      submit() {
        if (!this.article.title) {
          this.$message({
            message: '标题不能为空！',
            type: 'warning'
          });
          return;
        }
        if (!this.article.content) {
          this.$message({
            message: '内容不能为空！',
            type: 'warning'
          });
          return;
        }
        if (!this.article.channelid) {
          this.$message({
            message: '所属频道不能为空！',
            type: 'warning'
          });
          return;
        }
        if (!this.article.userid) {
          this.$message({
            message: '请先登录！',
            type: 'warning'
          });
          return;
        }
        articleApi.save(this.article).then(res => {
          if (res.data.flag) {
            this.article.image='';
            this.article.title='';
            this.article.content='';
            this.$message({
              message: '发布文章成功',
              type: 'success'
            });
          }
        });
      },
      uploadImg(param) {
        let formData = new FormData();
        formData.append('image', param.file);
        fileUpload.uploadImg(formData, 'article').then(response => {
          this.article.image = response.data.data;
        });
      },
    },
    created() {
      let user = getUser();
      if (user) {
        this.article.userid = user.id;
        this.article.nickname = user.name;
        this.article.avatar = user.avatar;
      }
      channelApi.getList().then(res => {
        this.channels = res.data.data;
      });

    },
    mounted() {
    },
    beforeDestroy() {

    }
  }
</script>

<style>
  .el-upload--picture-card {
    width: 100% !important;
    height: 100% !important;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 100% !important;
    height: 100% !important;
  }

  .el-input__inner {
    width: 734px !important;
    margin-left: 10px !important;
  }

  .el-icon-arrow-up {
    display: none !important;
  }
</style>
