import { validateInputNull } from '@/global/type'
import { IForm } from '@/base-ui/form/src/types'

type ICallbackType = (msg?: undefined | Error) => void
interface IRuleType {
  require?: boolean
  trigger?: string
  message?: string
  msgName: string
  validator?: ICallbackType
}
type IValueType = string | number | boolean
export const modelConfig: IForm = {
  formItems: [
    {
      field: 'no',
      label: '厂商编号:',
      type: 'input',
      placeholder: '请输入',
      outerOptions: {
        disabled: false
      },
      rules: [
        { required: true, message: '年龄不能为空', trigger: 'blur' },
        { required: true, message: '请输入~', trigger: 'blur' }
        // {
        //   asyncValidator: (rule: any, value: any, callback: ICallbackType) => {
        //     console.log(rule, value, callback, '==============')
        //   },
        //   trigger: ['blur', 'change']
        // }
      ]
    },
    {
      field: 'name',
      label: '厂商名称:',
      type: 'input',
      placeholder: '请输入'
    },
    {
      field: 'owner',
      label: '厂商负责人:',
      type: 'input',
      placeholder: '请输入'
    },
    {
      field: 'ownerTelephone',
      label: '厂商联系电话:',
      type: 'input',
      placeholder: '请输入'
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {
    padding: '10px 20px'
  }
  // rules: {
  //   no: [
  //     {
  //       required: true,
  //       message: '请输入用户名',
  //       validator: (rule: any, value: any, callback: ICallbackType) => {
  //         console.log('123')
  //         console.log(rule, value, callback, '==============')
  //       },
  //       trigger: ['blur', 'change']
  //     }
  //   ]
  // }
}
