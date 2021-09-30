import { validateInputNull } from '@/global/type'
export const rules = {
  account: [
    {
      trigger: 'blur',
      msgName: '请输入用户名',
      validator: validateInputNull
    }
  ],
  password: [
    {
      trigger: 'blur',
      message: '请输入密码',
      validator: validateInputNull
    }
  ]
}
