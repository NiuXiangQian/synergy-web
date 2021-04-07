<template>
  <div>
    <mavon-editor
        v-model="context"
        :ishljs="true"
        :toolbars="toolbars"
        @change="change"
        @keydown.native="input"/>

  </div>
</template>

<script>
import "@/plugins/mavon-editor/index"

import WebSocket from "@/socket-instance"

var webSocket;

import {getMarkdown} from "@/api/markdown";

export default {
  name: "index",
  components: {},
  data() {
    return {
      context: '',//输入的数据
      temp: '',//用于计算的临时数据
      temp_context: '_temp',//防止重复渲染的临时数据
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      }
    }
  },
  mounted() {
    this.init()
  }, methods: {
    change(value, render) {
      console.log(this.temp_context === this.context)
      if (this.temp_context === this.context) {
        this.temp_context = '_temp'
        console.log("试图重复渲染")
        return
      }
      // 调用父类Websocket组件发送消息
      webSocket.send({
        content: value,
        render: ""
      });
    },

    input() {
      this.temp = this.context;
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
          var dat = res.data.data
          if (dat) {
            _this.temp_context = _this.context = JSON.parse(dat).content

          }

          //初始化websocket连接
          webSocket = new WebSocket("markdown"
              , gid
              , _this
          );


          console.log(res)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
          setTimeout(() => {
                loading.close();
                _this.$router.push("/")
              }
              ,
              3000
          )
          ;
        }
      })
    },

//用于计算前后修改的内容
    getDiffArray(str1, str2) {
      //todo
    }
  }
}
</script>

<style scoped>

</style>
