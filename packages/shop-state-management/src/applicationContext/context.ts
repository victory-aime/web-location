import { ApplicationContext } from './applicationContext'

export let applicationContext: ApplicationContext = new ApplicationContext()

export function setApplicationContext(ctx: ApplicationContext) {
  applicationContext = ctx
}
