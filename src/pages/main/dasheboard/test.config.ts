export const contentTableConfig: any = {
  title: '鞋厂信息',
  propList: [
    { prop: 'name', label: '鞋厂名', minWidth: '100' },
    { prop: 'no', label: '订单号', minWidth: '100' },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createTime'
    }
  ],
  // showSelectColumn: true
  showIndexColumn: true
}
