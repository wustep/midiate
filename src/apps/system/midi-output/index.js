import { SETTINGS_APP_ID } from '../../../constants'

export const config = {
  id: "MIDI_OUTPUT",
  showInMenu: false,
  statusBarAction: SETTINGS_APP_ID,
}

export { default as settings } from './settings'
export { default as StatusBar } from './statusBar'
export { default as BackgroundTask } from './backgroundTask'
