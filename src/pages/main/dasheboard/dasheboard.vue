<template>
  <div>
    <page-search :searchFormConfig="config" />
    <hqTable
      :contentTableConfig="contentTableConfig"
      pageName="shoeFactoryInfo"
    >
    </hqTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import pageSearch from '@/components/page-search'
import { IForm } from '@/base-ui/form/src/types'
import { useStore } from '@/store'
import hqTable from '@/components/page-table'
import { contentTableConfig } from './test.config'
export default defineComponent({
  name: 'App',
  components: {
    pageSearch,
    hqTable
  },
  setup() {
    const store = useStore()
    // store.dispatch('main/getPageTableListAction', {
    //   pageName: 'shoeFactoryInfo',
    //   queryInfo: {
    //     curPage: 1,
    //     pageSize: 10
    //   }
    // })
    const config: IForm = {
      formItems: [
        {
          field: 'name',
          label: '名字',
          type: 'input',
          outerOptions: {
            style: 'width: 800px'
          },
          slotInput: {
            field: 'xiala',
            type: 'select',
            options: [
              {
                label: '文字',
                value: '321'
              }
            ]
          }
        },
        {
          field: 'password',
          label: '密码',
          type: 'password'
        },
        {
          field: 'select',
          label: '下拉框',
          type: 'select',
          options: [
            {
              key: '文字',
              value: '321'
            }
          ]
        },
        {
          field: 'detapicker',
          label: '日期',
          type: 'detepicker'
        }
      ]
    }
    // const formData = ref({
    //   name: '',
    //   password: '',
    //   select: '',
    //   detapicker: ''
    // })

    const listData = computed(() =>
      store.getters['main/getPageListData']('shoeFactoryInfo')
    )
    console.log(listData, 'listData')

    return { config, listData, contentTableConfig }
  }
})
</script>

<style lang="less"></style>
