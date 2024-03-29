import { changeShowSettings } from '@stores/settings'

/**
 * Represents the app shortcuts
 */
export interface KeyMap {

  /** The key in string format, and it is case insensitive */
  keyCode: string

  /** States whether the control key has to be active for this shortcut */
  ctrlKey: boolean

  /** A callback function for when this shortcut is called */
  function: (...any: any) => any
}

export const KEYMAPS: KeyMap[] = [
  { keyCode: 'K', ctrlKey: true, function: changeShowSettings },
  { keyCode: 'Escape', ctrlKey: false, function: changeShowSettings.bind(null, false) }
]

