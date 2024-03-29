import { subjects } from '@data/subjects'
import { atom, computed } from 'nanostores'

export const $showSettingsDialog = atom(false)

/**
 * Change whether the settings dialog / modal is seen
 * @param showSettings optional boolean to control the dialog, when ommited, the dialog toggles between true and false
 *
 */
export const changeShowSettings = (showSettings?: boolean): void => {
  let newState: boolean

  if (typeof showSettings === 'boolean') newState = showSettings
  else newState = !$showSettingsDialog.get()

  $showSettingsDialog.set(newState)
}

export interface Theme {
  /** Name of the Theme */
  name: string

  /** the background, and text color of the theme respectively */
  colors: [string, string]
}

export const THEMES = [
  { name: 'Classic', colors: ['0deg 0% 96%', '0deg 0% 7%'] },
  { name: 'Dark', colors: ['0deg 0% 7%', '0deg 0% 97%'] }
] as Theme[]

/** Store of index of user theme in THEMES. Defaults to 0 for classic */
export const $themeIndex = atom(0)

/** computed store of user-theme */
export const $theme = computed($themeIndex, (i) => {
  return THEMES.at(i) ?? null
})

/** Store of index of user subject in the Subjects Array. Defaults to 0 for all words */
export const $subjectIndex = atom(0)

/** computed store of user-subject */
export const $subject = computed($subjectIndex, (i) => {
  return subjects.at(i) ?? null
})
