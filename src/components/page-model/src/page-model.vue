<template>
  <div class="page-model">
    <el-dialog
      destroy-on-close
      title="提示"
      v-model="dialogVisible"
      width="30%"
      center
    >
      <hq-form v-bind="modelConfig" v-model="formData"> </hq-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import hqForm from '@/base-ui/form'
export default defineComponent({
  components: {
    hqForm
  },
  props: {
    modelConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const dialogVisible = ref(false)
    const formData = ref({})
    watch(formData, (newVal) => {
      console.log(newVal, 'val')
    })
    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep .el-dialog {
  border-radius: 8px;
}
</style>
