type IFormType = 'input' | 'password' | 'select' | 'detepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对于select
  options?: any[]
  // 针对于特殊属性
  outerOptions?: any
  isHidden?: boolean
  slotInput?: any
  itemStyle?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  rules?: any
}
