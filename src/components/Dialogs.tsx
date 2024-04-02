/* eslint-disable prefer-const */
import { For, createEffect, type JSXElement } from 'solid-js'
import '@scss/dialog.scss'
import { THEMES, type Theme } from '@data/themes'
import { $SUBJECTS } from '@data/subjects'
import { MODES } from '@/data/modes'
import { $showSettingsDialog, changeShowSettings, $indices, changeIndices, $theme, changeTheme } from '@stores/settings'
import { useStore } from '@nanostores/solid'
import { getFormattedTimeString } from '@/composables/utils'

interface ThemeButtonProps {
  index: number
  theme: Theme
  isUserTheme: boolean
}
export const ThemeButton = (props: ThemeButtonProps): JSXElement => {
  const title = (): string => `Switch to ${props.theme.name} theme`
  const colorVariableString = (): string => `
    --bg:${props.theme.colors[0]};--clr:${props.theme.colors[1]};
  `

  return (
    <button onClick={() => { changeTheme(props.index) }} title={title()} style={colorVariableString()} class="theme-button" data-theme={props.isUserTheme}>
      {props.theme.name}
    </button>
  )
}

export const SettingsDialog = (): JSXElement => {
  let dialogElement = null as any as HTMLDivElement
  let closeButton = null as any as HTMLButtonElement
  let timeSelect = null as any as HTMLSelectElement

  const SUBJECTS = useStore($SUBJECTS)
  const showSettings = useStore($showSettingsDialog)
  const closeModal = (): void => { changeShowSettings(false) }
  const indices = useStore($indices)
  const userTheme = useStore($theme)
  const clickOutside = (e: MouseEvent): void => {
    const el = e.target as any as HTMLDivElement
    el === dialogElement && closeModal()
  }

  const changeSettings = (e: Event): void => {
    const el = e.currentTarget as unknown as HTMLSelectElement
    changeIndices(el.name, +el.value)
  }

  createEffect(() => {
    if (showSettings()) {
      closeButton.focus()
    }
  }, showSettings)

  createEffect(() => {
    /**
     * This is a workaround a problem between a select element and reactive data,
     * The option values are indexes in an array, but when the array changes, I want the select value to still be the index in the store. But, the selected option in the UI becomes the first one, breaking the sync between the UI and the stored time index, so now when the store's time index changes, I change the select's value directly
     * */
    if (indices().mode !== -1) {
      timeSelect.value = `${indices().time}`
    }
  }, indices)

  return (
    <div onClick={clickOutside}
      data-open={showSettings()}
      inert={!showSettings()}
      ref={dialogElement}
      role="dialog"
      id="settings"
      class="settings-dialog"
      aria-labelledby="dialog-title"
      data-grid>
      <div class="settings-wrapper">
        <h2 class="settings-title">Settings</h2>

        <button ref={closeButton} onClick={closeModal} class="settings-close" title="Close Settings" >
          <span class="sr-only">Close Settings</span>
          <svg viewBox="0 0 24 24"><use href="#close"></use></svg>
        </button>

        <details open class="settings-mode">
          <summary class="settings-mode-summary">
            <strong class="settings-mode-title">Mode</strong>
          </summary>

          <div class="settings-mode-fields">
            <div class="settings-mode-field">
              <label for="settings-mode" class="settings-mode-label">
                <svg viewBox="0 0 24 24"><use href="#options"></use></svg>
                <span class="sr-only">Mode</span>
              </label>
              <div class="select-wrapper">
                <svg aria-hidden="true" viewBox="0 0 24 24"><use href="#arrow-down"></use></svg>
                <select onChange={changeSettings} value={indices().mode} name="mode" id="settings-mode" class="settings-mode-select" >
                  <For each={MODES.map(mode => mode.name)}>
                    {(mode, index) => <option value={index()}>{mode}</option>}
                  </For>
                </select>
              </div>
            </div>

            <div class="settings-mode-field">
              <label for="settings-time" class="settings-mode-label">
                <svg viewBox="0 0 24 24"><use href="#timer"></use></svg>
                <span class="sr-only">Time</span>
              </label>
              <div class="select-wrapper">
                <svg aria-hidden="true" viewBox="0 0 24 24"><use href="#arrow-down"></use></svg>
                <select ref={timeSelect} onChange={changeSettings} name="time" id="settings-time" class="settings-mode-select">
                  <For each={MODES[indices().mode].times}>
                    {(time, index) => <option value={index()} >{getFormattedTimeString(time)}</option>}
                  </For>
                </select>
              </div>
            </div>

          </div>

        </details>

        <details class="settings-subject" open>

          <summary class="settings-subject-summary">
            <strong class="settings-subject-title">Subject</strong>
          </summary>

          <div class="settings-subject-field">
            <label class="settings-subject-label" for="settings-subject">
              <span class="sr-only">Choose A Preferred Subject Of Words</span>
              <svg viewBox="0 0 24 24"><use href="#books"></use></svg>
            </label>
            <div class="select-wrapper">
              <svg aria-hidden="true" viewBox="0 0 24 24"><use href="#arrow-down"></use></svg>
              <select onChange={changeSettings} name="subject" id="settings-subject" class="settings-subject-select">
                <For each={SUBJECTS()}>
                  {(subject, index) => <option value={index()}>{subject.name}</option>}
                </For>
              </select>
            </div>
          </div>

        </details>

        <details class="settings-themes" open>

          <summary class="settings-themes-summary">
            <strong class="settings-theme-title">Theme</strong>
          </summary>

          <ul class="settings-themes-list">
            <For each={THEMES}>
              {(theme, index) => <li><ThemeButton isUserTheme={index() === userTheme()} theme={theme} index={index()} /></li>}
            </For>
          </ul>

        </details>

      </div>
    </div>
  )
}

export const Dialogs = (): JSXElement => {
  return (
    <>
      <SettingsDialog />
    </>
  )
}
