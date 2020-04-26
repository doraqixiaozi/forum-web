<template>
    <div></div>
</template>
<script>
import weixinApi from '@/api/weixin'
import {getUrlParam} from '@/utils/param'
import {setUser} from '@/utils/auth'
export default {
    mounted(){
        //1.获取参数code的值
        let code= getUrlParam('code')
        //2 调用API
        weixinApi.getAccessToken(code).then( res=> {
            let access_token= res.data.access_token
            let openid= res.data.openid
            console.log( 'access_token:'+access_token+" openid:"+openid )
            weixinApi.getUserinfo(access_token, openid ).then( res2=>{
                let nickname=res2.data.nickname
                let headimgurl=res2.data.headimgurl
                setUser( access_token, nickname, headimgurl  )
                location.href='/'
            })

        })
    }
}
</script>

