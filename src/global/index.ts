import { App } from 'vue'
import registerPropertes from './register-propertes'

export function globalRegister(app: App): void {
  app.use(registerPropertes)
}
