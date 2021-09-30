<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header>
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <el-card shadow="hover">
            <router-view></router-view>
          </el-card>
        </el-main>
        <el-footer>© 2021. 鞋鞋理管理平台 版权所有</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navMenu from '@/components/nav-menu'
import navHeader from '@/components/nav-header'
export default defineComponent({
  components: {
    navMenu,
    navHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
}
.el-header {
  height: 48px !important;
}
.el-header {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f5f7f9;
}
.el-footer {
  height: 48px;
  display: flex;
  color: #515a6e;
  justify-content: center;
  align-items: center;
  background-color: #f5f7f9;
  font-size: 14px;
}
</style>
