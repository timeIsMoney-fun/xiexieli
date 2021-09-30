<template>
  <div>
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleRestClick"
    >
    </page-search>
    <page-tab
      ref="tableRef"
      :contentTableConfig="tabelConfig"
      pageName="shoeFactoryInfo"
      @newBtnClick="handleNewData"
    >
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            style="color: #f56c6c"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div></template
      >
    </page-tab>
    <pageModel ref="modelRef" :modelConfig="modelConfig"></pageModel>
    <el-form>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
        ]"
      >
        <template #default v-if="true">
          <el-input></el-input>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import PageTab from '@/components/page-table'
import { tabelConfig } from './config/table.config'
import pageModel from '@/components/page-model'
import { modelConfig } from './config/model.config'
export default defineComponent({
  name: 'App',
  components: {
    PageSearch,
    PageTab,
    pageModel
  },
  setup() {
    const tableRef = ref<InstanceType<typeof PageTab>>()
    const handleQueryClick = (queryInfo: any) => {
      let params: any = {}
      if (queryInfo?.serchKey) {
        if (queryInfo.serchKey === 1) {
          params.name = queryInfo.searchTxt
        } else if (queryInfo.serchKey === 2) {
          params.no = queryInfo.searchTxt
        }
      }
      tableRef.value?.getData(params)
    }
    const handleRestClick = () => {
      tableRef.value?.getData()
    }
    // ====model
    const modelRef = ref<InstanceType<typeof pageModel>>()
    const handleNewData = () => {
      if (modelRef.value) {
        modelRef.value.formData = {}
        modelRef.value.dialogVisible = true
      }
    }

    // handle
    const handleEditClick = () => {}
    const handleDeleteClick = () => {}

    //tes
    const numberValidateForm = ref({})
    return {
      searchFormConfig,
      handleQueryClick,
      handleRestClick,
      tabelConfig,
      tableRef,
      modelConfig,
      modelRef,
      handleNewData,
      handleDeleteClick,
      handleEditClick,
      numberValidateForm
    }
  }
})
</script>

<style lang="less"></style>
