import { ITableConfig } from '@/components/page-table/type'
export const tabelConfig: ITableConfig = {
  title: '鞋厂信息',
  propList: [
    {
      prop: 'no',
      label: '鞋厂编码',
      minWidth: '100'
    },
    {
      prop: 'name',
      label: '鞋厂名称',
      minWidth: '100'
    },
    {
      prop: 'owner',
      label: '鞋厂负责人',
      minWidth: '100'
    },
    {
      prop: 'ownerTelephone',
      label: '负责人联系方式',
      minWidth: '100'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: '100'
    },
    {
      label: '操作',
      minWidth: '100',
      slotName: 'handle'
    }
  ]
}
