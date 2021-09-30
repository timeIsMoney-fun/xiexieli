/**
 * @description 捕获异常
 * @param {function(): Promise<any>} fn
 */
export async function catchError(fn: any) {
  /**
   * @type {object}
   */
  let res = null
  /**
   * @type {Error}
   */
  let err = null

  try {
    res = await fn()
  } catch (error) {
    err = error || new Error('未知异常')
  }
  return [res, err]
}

// 定义列表的默认高度
export const screHeight = (data: number) => {
  data = data || 337
  return document.documentElement.clientHeight - data
}
