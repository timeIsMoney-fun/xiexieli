export interface IpropItem {
  prop?: string
  label?: string
  minWidth?: string
  slotName?: string
  [key: string]: any
}

export interface ITableConfig {
  title?: string
  propList: IpropItem[]
  showSelectColumn?: boolean
  showIndexColumn?: boolean
}
