<template>
  <div id="main">
    <div align="center" style="margin-bottom: 30px">你好，
      <el-link type="primary">{{ name }}</el-link>
    </div>
    <el-row :gutter="40">
      <el-col :span="6">
        <div class="grid-content ">
          <el-button type="success" @click="create('markdown')">创建markdown</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ">
          <el-button type="success" disabled @click="create('word')">创建word</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ">
          <el-button type="success" disabled @click="create('excel')">创建excel</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ">
          <el-button type="success" disabled @click="create('ppt')">创建ppt</el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import {
  createMarkdown
} from "@/api/markdown";
import {getNickname} from '@/utils/auth'

export default {
  data() {
    return {
      name: getNickname(),
      isCollapse: true
    };
  },
  mounted() {

  },
  methods: {
    create(type) {
      //遮照层
      const loading = this.$loading({
        lock: true,
        text: '创建中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      switch (type) {
        case "markdown":
          createMarkdown(type).then((res) => {
            loading.close()
            if (res.code === 0) {
              this.$router.push("/markdown/" + res.data.id)
            } else {
              // todo 失败处理
            }
          });
      }

    }

  }
}
</script>
<style scoped>  .el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}
.el-col {
  border-radius: 4px;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

#main {
  margin-top: 20%;
  margin-left: 10%;
  margin-right: 10%;
}


</style>
