import { checkIndexValidity } from '@/composables/utils'
import { THEME_KEY, getHighScore, getUserTheme } from '@/composables/localStorage'
import { MODES } from '@/data/modes'
import { $SUBJECTS } from '@data/subjects'
import { THEMES } from '@data/themes'
import { atom, computed, map } from 'nanostores'
import { stopGame } from './game'
import { $scores } from './score'

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

export const $theme = atom(getUserTheme())
$theme.subscribe(theme => {
  localStorage.setItem(THEME_KEY, `${theme}`)

  const html = document.querySelector('html') as unknown as HTMLHtmlElement
  html.setAttribute('data-theme', THEMES[theme].name.toLowerCase())
})
export const changeTheme = (index: number): void => {
  checkIndexValidity(index, THEMES)
  $theme.set(index)
}

const defaultIndices = { mode: 0, time: 0, subject: 0, theme: 0 }
type Index = keyof typeof defaultIndices

export const $indices = map(defaultIndices)
export const $mode = computed($indices, ({ mode }) => MODES[mode])
export const $userTime = computed($indices, ({ mode, time }) => MODES[mode].times[time])

$indices.subscribe(({ mode, time }) => {
  $scores.setKey('highScore', getHighScore(mode, time))
  stopGame()
})

interface ValidationRule {
  name: Index
  array: any[]
}
const indicesValidationRules = [
  { name: 'mode', array: MODES },
  { name: 'time', array: $mode.get().times },
  { name: 'subject', array: () => $SUBJECTS.get() },
  { name: 'theme', array: THEMES }
] as ValidationRule[]

export const changeIndices = (key: Index | string, index: number): void => {
  const rule = indicesValidationRules.find(rule => rule.name === key)
  if (!(rule == null)) {
    checkIndexValidity(index, rule.array)
    $indices.setKey(rule.name, index)
  }
}
