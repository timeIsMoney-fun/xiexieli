<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <div>
        <hqbreadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div><userInfo /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import Hqbreadcrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  name: 'App',
  emits: ['foldChange'],
  components: {
    userInfo,
    Hqbreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return {
      breadcrumbs,
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
