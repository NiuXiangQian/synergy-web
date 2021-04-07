<template>
  <div class="components-container">
    <div class="editor-container">
      <markdown-editor ref="markdownEditor" v-model="content" :options="{hideModeSwitch:true,previewStyle:'tab'}"
                       height="200px"/>
    </div>

    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
      Get HTML
    </el-button>
    <div v-html="html"/>
  </div>
</template>

<script>

import MarkdownEditor from '@/components/MarkdownEditor'
import {getMarkdown} from '@/api/markdown'

import WebSocket from "@/socket-instance"


const content = ``
export default {
  name: 'MarkdownDemo',
  components: {MarkdownEditor},
  data() {
    return {
      content: content,
      html: '',
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }

  },
  mounted() {
    this.init()
  },
  methods: {
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    init() {

      const gid = location.href.substring(location.href.lastIndexOf('/') + 1)
      //遮照层
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var _this = this;
      getMarkdown(gid).then(res => {
        if (res.code === 0) {
          loading.close();
          // WebSocket.init("markdown2", gid);

          console.log(res)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
          setTimeout(() => {
            loading.close();
            _this.$router.push("/")
          }, 3000);
        }
      })
    }
  }, created() {
  }
}
</script>

<style scoped>
.editor-container {
  margin-bottom: 30px;
}

.tag-title {
  margin-bottom: 5px;
}
</style>
