<template>
  <div class="page-search">
    <hq-form v-bind="searchFormConfig" v-model="formData">
      <template #header></template>
      <template #footer>
        <div class="handle-btns">
          <el-button
            size="small"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hq-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import hqForm from '@/base-ui/form'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    hqForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    console.log(store, 'store.getters')

    //双向绑定的属性应该是由配置文件的field来决定
    for (const item of formItems) {
      if (item.slotInput) {
        formOriginData[item.slotInput.field] = item.slotInput.value || ''
      }
      formOriginData[item.field] = item.value || ''
    }
    const formData = ref(formOriginData)
    watch(formData, (newVal) => {
      store.commit('changeSearchData', newVal)
    })
    console.log(formData, 'formData')

    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  border-bottom: 1px dashed #ccc;
  // box-shadow: 0 1px 2px #ccc;
  padding-bottom: 10px;
}
.handle-btns {
  text-align: right;
}
</style>
