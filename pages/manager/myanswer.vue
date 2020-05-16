<template>
    <div class="answers">
     <h4><span>我的回答</span></h4>
     <ul class="answer-list">
       <li v-for="item in problem"><span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span> <span class="title"><a style="cursor: pointer"
          @click="goDetail(item.id)">{{item.title}}</a></span> <span class="fr date">{{item.createtime}}</span> <span class="clearfix"></span></li>
     </ul>
    </div>
</template>
<script>
import '~/assets/css/page-sj-person-myanswer.css'
import problemApi from "../../api/problem";
import {getId} from '@/utils/auth'

export default {
  data() {
    return {
      problem: []
    }
  },
  created() {
    problemApi.list(1, 5, {replyid: getId()}).then(res => {
      this.problem = res.data.data.rows;
    });
  },
  methods: { goDetail(id) {
      this.$router.push({path: '/qa/detail', query: {id}})
    }
  }
}
</script>

