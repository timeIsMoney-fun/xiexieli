<template>
  <div class="nav-menu">
    <div class="logo">
      <img
        v-if="collapse"
        class="logo-small"
        src="~@/assets/img/logo-small.png"
        alt="logo"
      />
      <img v-else class="img" src="~@/assets/logo.png" alt="logo" />
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.children && item.children.length > 0">
          <side-menu-item :parentItem="item" />
        </template>
        <template v-else>
          <el-menu-item :index="item.id" @click="handleMenuItemClick(item)">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import sideMenuItem from './side-menu-item.vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    sideMenuItem
  },
  setup() {
    //store
    const store = useStore()
    const userMenus: any = computed(() => store.state.login.userMenus)
    // route
    const router = useRouter()
    const route = useRoute()
    console.log(router)

    console.log(route)

    const currentPath = route.path
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultActive = ref(menu.id)

    // event handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      handleMenuItemClick,
      defaultActive
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    height: auto;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .img {
      height: 60px;
      width: 180px;
    }
    .logo-small {
      width: 50px;
      height: 30px;
    }
  }
  .el-menu {
    border-right: none;
  }
  // .el-submenu {
  //   background-color: #001529 !important;
  //   // 二级菜单 ( 默认背景 )
  //   .el-menu-item {
  //     padding-left: 50px !important;
  //     background-color: #0c2135 !important;
  //   }
  // }

  // ::v-deep .el-submenu__title {
  //   background-color: #001529 !important;
  // }

  // // hover 高亮
  // .el-menu-item:hover {
  //   color: #fff !important; // 菜单
  // }

  // .el-menu-item.is-active {
  //   color: #fff !important;
  //   background-color: #0a60bd !important;
  // }
}

// .el-menu-vertical:not(.el-menu--collapse) {
//   width: 100%;
//   height: calc(100% - 48px);
// }
// .el-menu-vertical:not(.el-menu--collapse) {
//   width: 100%;
//   height: calc(100% - 48px);
// }
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
