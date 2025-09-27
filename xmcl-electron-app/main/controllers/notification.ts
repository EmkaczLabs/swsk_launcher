import { ElectronController } from '@/ElectronController'
import { app } from 'electron'
import { ControllerPlugin } from './plugin'

export const notificationSetupPlugin: ControllerPlugin = function (this: ElectronController) {
  this.app.waitEngineReady().then(() => {
    if (this.app.platform.os === 'windows') {// Use a proper AppUserModelID that matches the appId used by the builder
      // This ensures Windows notifications are associated with the correct application
      app.setAppUserModelId('com.swsk.launcher')
    }
  })
}
