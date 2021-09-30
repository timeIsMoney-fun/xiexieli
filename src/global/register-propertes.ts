import { App } from 'vue'
import { formatUtcString, formatTimestamp } from '@/utils/date-format'
export default function registerProp(app: App) {
  const obj: any = {
    formatUtc(value: string) {
      return formatUtcString(value)
    },
    formatTime(time: number) {
      return formatTimestamp(time)
    }
  }
  app.config.globalProperties.$filters = obj
}
