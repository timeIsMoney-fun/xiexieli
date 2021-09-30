<template>
  <div class="hq-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row justify="start">
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              {{ item.rules }}
              <!----------- input ------------->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  size="small"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  v-bind="item.outerOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                >
                  <template #prepend v-if="item.slotInput">
                    <template v-if="item.slotInput.type === 'select'">
                      <el-select
                        size="small"
                        :model-value="modelValue[item.slotInput.field]"
                        @update:modelValue="
                          handleValueChange($event, item.slotInput.field)
                        "
                        :placeholder="item.slotInput.placeholder"
                        v-bind="item.slotInput.outerOptions"
                        style="width: 100px"
                      >
                        <el-option
                          v-for="option in item.slotInput.options"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </el-option>
                      </el-select>
                    </template>
                  </template>
                </el-input>
              </template>
              <!----------- select ------------->
              <template v-else-if="item.type === 'select'">
                <el-select
                  size="small"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  v-bind="item.outerOptions"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.value }}
                  </el-option>
                </el-select>
              </template>
              <!----------- detepicker ------------->
              <template v-else-if="item.type === 'detepicker'">
                <el-date-picker
                  size="small"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  style="width: 100%"
                  v-bind="item.outerOptions"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { IFormItem } from './types'
import { defineComponent, PropType, ref, watch } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    itemStyle: {
      type: Object,
      default: () => ({
        // padding: '10px 40px'
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep .el-form-item__content {
  display: flex;
  align-items: center;
}
.el-form-item {
  margin-bottom: 0 !important;
}
</style>
