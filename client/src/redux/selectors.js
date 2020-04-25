import { detect } from '../utils/chords'
import { DEFAULT_APP_ID } from '../constants'

export const getUiState = store => store.ui
export const getApps = store => getUiState(store) ? (getUiState(store).appIdToConfig || {}) : {}
export const getForegroundAppId = (store) => getUiState(store) ? getUiState(store).foregroundApp : DEFAULT_APP_ID
export const getApp = (store, appId) => getApps(store)[appId] || {}

export const getMidiServerHost = (store) => store.settings.midiServerHost || ""
export const getMidiInputs = (store) => {
  return (getUiState(store).midiInputs || []).map(i => {
    i.active = isMidiInputActive(store)(i.name)
    return i
  })
}
export const isMidiInputActive = (store) => {
  return input => store.settings.midiInputsActive[input] !== undefined 
    ? store.settings.midiInputsActive[input] : true
}
export const getIsAnyMidiInputActive = (store) => 
  getMidiServerHost(store).length || getMidiInputs(store).some(i => i.active)

export const getMidiServerConnectionStatus = (store) => getUiState(store).midiServerConnectionStatus
// get's only support one channel
export const getNotes = store => store.events.notes || []
export const getChords = (store, config = {mode: "smart"}) => {
  let notes
  switch (config.mode) {
    case 'loose':
      notes = {notes: store.events.notes, id: -1}
      break
    case 'strict':
      notes = store.events.strictNotes
      break
    case 'smart':
    default:
      notes = store.events.smartNotes
      break
  }
  if (!notes) {
    return {detection: [], notes: [], id: 0}
  }
  const detection = detect(notes.notes)
  return {
    ...notes,
    detection,
  }
}

export const getLastEvent = store => store.events.lastEvent
export const getAppConfig = (store, appId) => getApp(store, appId).config || {}

// deprecated functions
export const getCurrentlyPlayed = store => {
  if (!getCurrentlyPlayed.reportedDeprecated) {
    console.warn('selector getCurrentlyPlayed() is deprecated and will be removed in next major release, use getNotes() instead')
    getCurrentlyPlayed.reportedDeprecated = true
  }
  return getNotes(store)
}
getCurrentlyPlayed.reportedDeprecated = false

export const getCurrentChords = store => {
  if (!getCurrentChords.reportedDeprecated) {
    console.warn('selector getCurrentChords() is deprecated and will be removed in next major release, use getChords() instead')
    getCurrentChords.reportedDeprecated = true
  }
  return getChords(store)
}
getCurrentChords.reportedDeprecated = false
