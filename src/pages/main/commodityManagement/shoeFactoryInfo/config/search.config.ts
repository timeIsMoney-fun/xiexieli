import { IForm } from '@/base-ui/form/src/types/index'
export const searchFormConfig: IForm = {
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'searchTxt',
      label: '名字',
      type: 'input',
      outerOptions: {
        style: 'width: 400px'
      },
      slotInput: {
        field: 'serchKey',
        type: 'select',
        value: 1,
        options: [
          {
            label: '按名称',
            value: 1
          },
          {
            label: '按编码',
            value: 2
          }
        ]
      }
    }
  ]
}
