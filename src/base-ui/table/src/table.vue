<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      stripe
      size="small"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="styleHeader"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="55"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="60"
        align="center"
        label="序号"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.curPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      // required: true
      default: () => []
    },
    propList: {
      type: Array as any,
      required: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Object,
      default: () => ({ curPage: 1, pageSize: 10 })
    }
  },
  emits: ['update:page', 'selectionChange'],
  setup(props, { emit }) {
    const styleHeader = () => {
      return 'color: #333;background:#fafafa;'
    }

    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleCurrentChange = (curPage: number) => {
      emit('update:page', { ...props.page, curPage })
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      styleHeader
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
