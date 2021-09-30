type ICallbackType = (msg?: undefined | Error) => void
interface IRuleType {
  require?: boolean
  trigger?: string
  message?: string
  msgName: string
  validator?: ICallbackType
}
type IValueType = string | number | boolean
export const validateInputNull = (
  rule: IRuleType,
  value: IValueType,
  callback: ICallbackType
) => {
  debugger
  if (!String(value) || typeof value === 'undefined' || !value) {
    callback(new Error(rule.msgName))
  } else {
    callback()
  }
}
