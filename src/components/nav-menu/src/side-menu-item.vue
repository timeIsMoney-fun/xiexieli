<template>
  <el-sub-menu :index="parentItem.id">
    <template #title>
      <i v-if="parentItem.icon" :class="parentItem.icon"></i>
      <span>{{ parentItem.name }}</span>
    </template>
    <template v-for="item in parentItem.children" :key="item.id">
      <template v-if="item.children && item.children.length > 0">
        <side-menu-item :parentItem="item" />
      </template>
      <template v-else>
        <el-menu-item :index="item.id" @click="handleMenuItemClick(item)">
          <i v-if="item.icon" :class="item.icon"></i>
          <template #title>{{ item.name }}</template>
          <!-- <span>{{ item.name }}</span> -->
        </el-menu-item>
      </template>
    </template>
  </el-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'sideMenuItem',
  props: {
    parentItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const router = useRouter()
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
// 目录
.el-submenu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}
::v-deep .el-sub-menu__title {
  overflow: hidden !important;
  background-color: #001529 !important;
}

hover 高亮 .el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
</style>
