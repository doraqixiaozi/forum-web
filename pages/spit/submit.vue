<template>
  <section class="container">
    <div class="wrapper release-tc">
        <div class="release-box">
            <h3>发布吐槽</h3>
            <div class="quill-editor"
                :content="content"
                @change="onEditorChange($event)"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                v-quill:myQuillEditor="editorOption">
            </div>
            <div class="btns">
                <button class="sui-btn btn-danger btn-release" @click="doSubmit">发布</button>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
  </section>
</template>

<script>
import spitApi from '@/api/spit'
  export default {
    data () {
      return {
        content: '说点什么呢？',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image']
            ]
          }
        }
      }
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      doSubmit() {

        spitApi.submit(this.content,0).then( res =>{
            if(res.data.flag){
                this.$message({
                        message: '发布成功',
                        type: 'success'
                })
                this.$router.push('/spit')
            }
        })

      }
    }
  }
</script>

<!--<style lang="scss" scoped>-->
<!--  .container {-->
<!--    width: 80%;-->
<!--    margin: 0 auto;-->
<!--    padding: 50px 0;-->

<!--    .quill-editor {-->
<!--      min-height: 200px;-->
<!--      max-height: 400px;-->
<!--      overflow-y: auto;-->
<!--    }-->
<!--  }-->
<!--</style>-->
