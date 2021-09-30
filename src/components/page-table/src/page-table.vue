<template>
  <div class="page-content">
    <hqTable
      v-bind="contentTableConfig"
      :listData="listData"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button
          icon="el-icon-circle-plus-outline"
          size="small"
          type="primary"
          @click="handleNewClick"
        >
          新增
        </el-button>
      </template>
      <!-- table中通用插槽 -->
      <template #createTime="scope">
        {{ $filters.formatTime(scope.row.createTime) }}</template
      >
      <template #updateTime="scope">
        {{ $filters.formatTime(scope.row.updateTime) }}</template
      >

      <!-- 在page-tabale中动态插入剩余的插槽 -->
      <template
        v-for="item in ohterPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"> </slot>
        </template>
      </template>
    </hqTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import hqTable from '@/base-ui/table'
import { useStore } from '@/store'
import { getCurrentInstance } from 'vue'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    hqTable
  },
  emits: ['newBtnClick'],
  setup(props, { emit }) {
    console.log(getCurrentInstance(), '0000000000')
    const store = useStore()
    const searchParams = computed(() => store.getters.getSearchData)
    const instance = getCurrentInstance()
    //双向绑定pageInfo
    const pageInfo = ref({ curPage: 1, pageSize: 10 })

    watch(pageInfo, (newVal) => {
      ;(instance?.proxy?.$parent as any).handleQueryClick(searchParams.value)
    })

    //发送网络请求
    const getData = (queryInfo?: any) => {
      store.dispatch('main/getPageTableListAction', {
        pageName: props.pageName,
        queryInfo: {
          curPage: pageInfo.value.curPage,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getData()
    // 从vuex中获取数据
    const listData = computed(() =>
      store.getters['main/getPageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['main/getPageListCount'](props.pageName)
    )
    const ohterPropsSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createTime' || item.slotName === 'updateTime')
          return false
        return true
      }
    )
    console.log(ohterPropsSlots, 'ohterPropsSlots')

    const handleNewClick = () => {
      emit('newBtnClick')
    }
    return {
      getData,
      listData,
      dataCount,
      pageInfo,
      handleNewClick,
      ohterPropsSlots
    }
  }
})
</script>

<style lang="less" scoped></style>
