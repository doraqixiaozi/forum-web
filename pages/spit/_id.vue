<template>

        <div class="wrapper">
                <!--引用组件-->
                <!--头部导航-->


    <!--引用组件-->
    <!--两列布局-->
    <div class="wrapper tc-detail">
        <div class="fl left-list">
            <div class="tc-detail">
    <!-- 标题区 -->
    <div class="detail-tit" >
        <div class="detail-author">
            <a href="javascript:;">{{pojo.nikename}}</a> 发布
        </div>
        <div class="detail-content" v-html='pojo.content'>

        </div>
        <div class="detail-tool">
            <ul>
                <li><span class="star"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{pojo.thumbup}}</span></li>
                <li><a  data-toggle="modal" data-target="#remarkModal"><i class="fa fa-commenting" aria-hidden="true" ></i> {{pojo.comment}}</a></li>
            </ul>

        </div>
        <br>
        <br>
        <br>
    </div>
    <div class="social-share" data-sites="weibo,qq,qzone,wechat" data-url="http://itheima.com" data-title="十次方"></div>

    <!-- 评论区 -->
    <div class="comment-area">
        <div class="comment-tit">
            <span>评论</span>
        </div>
        <ul class="comment-list">
            <li v-for="(item,index) in commentlist" :key="index">
                <div class="item-photo">
                    <img src="~/assets/img/widget-widget-photo.png" alt="" />
                </div>
                <div class="item-content">
                    <p class="author"><a href="javascript:;">{{item.nikename}}</a> 发布</p>
                    <p class="content" v-html='item.content'></p>
                </div>
                <div class="item-thumb">
                    <div><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{item.thumbup}}</div>
                </div>
            </li>
        </ul>
    </div>
</div>
        </div>
        <div class="fl right-tag">
            <div class="block-btn">
                <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
                <a class="sui-btn btn-block btn-share" href="submit" target="_blank">发吐槽</a>
            </div>
        </div>
        <div class="clearfix"></div>



    </div>
        </div>

</template>
<script>
import '~/assets/css/page-sj-spit-detail.css'
import axios from 'axios'
import spitApi from '@/api/spit'
export default {
    asyncData ({ params, error }) {
       return axios.all([spitApi.findById(params.id), spitApi.commentlist(params.id)]).then(
          axios.spread(function(pojo,commentlist){
              return {pojo:pojo.data.data,commentlist:commentlist.data.data}
          })
       )
    },
    data(){
        return {
           shareDialogVisible : false
        }
    },
    // head: {
    //     script: [
    //         { src: 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js' },
    //         { src: 'https://cdn.bootcss.com/qrcode-generator/1.3.1/qrcode.js' }
    //     ],
    //     link: [
    //         { rel: 'stylesheet', href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css' }
    //     ]
    // }
}
</script>
