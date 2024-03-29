/* eslint-disable prefer-const */
import { For, createEffect, type JSXElement } from 'solid-js'
import '@scss/dialog.scss'
import { type Theme, THEMES, $showSettingsDialog, changeShowSettings } from '@stores/settings'
import { subjects } from '@/data/subjects'
import { useStore } from '@nanostores/solid'

interface ThemeButtonProps {
  theme: Theme
}
export const ThemeButton = (props: ThemeButtonProps): JSXElement => {
  const title = (): string => `Switch to ${props.theme.name} theme`
  const colorVariableString = (): string => `
    --bg:${props.theme.colors[0]};--clr:${props.theme.colors[1]};
  `

  return (
    <button class="theme-button" title={title()} style={colorVariableString()}>
      {props.theme.name}
    </button>
  )
}

// @TODO- Use AI to generate the text for the labels
export const SettingsDialog = (): JSXElement => {
  let dialogElement = null as any as HTMLDivElement
  let closeButton = null as any as HTMLButtonElement
  const showSettings = useStore($showSettingsDialog)
  const closeModal = (): void => { changeShowSettings(false) }

  const clickOutside = (e: MouseEvent): void => {
    const el = e.target as any as HTMLDivElement
    el === dialogElement && closeModal()
  }

  createEffect(() => {
    if (showSettings()) {
      closeButton.focus()
    }
  })

  return (
    <div onClick={clickOutside}
      data-open={showSettings()}
      inert={!showSettings()}
      ref={dialogElement}
      role="dialog" id="settings" class="settings-dialog" data-grid>
      <div class="settings-wrapper">
        <h2 class="settings-title">Settings</h2>

        <button ref={closeButton} class="settings-close" title="Close Settings" onClick={closeModal}>
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
                <select name="mode" id="settings-mode" class="settings-mode-select">
                  <option value="classic">classic</option>
                  <option value="wordstorm">wordstorm</option>
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
                <select name="time" id="settings-time" class="settings-mode-select">
                  <option value="5">5 secs</option>
                  <option value="4">4 secs</option>
                  <option value="2">2 secs</option>
                </select>
              </div>
            </div>
          </div>

        </details>

        <details class="settings-subject">

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
              <select name="subject" id="settings-subject" class="settings-subject-select">
                <For each={subjects}>
                  {(subject, index) => <option value={index()}>{subject.name}</option>}
                </For>
              </select>
            </div>
          </div>

        </details>

        <details class="settings-themes">

          <summary class="settings-themes-summary">
            <strong class="settings-theme-title">Theme</strong>
          </summary>

          <ul class="settings-themes-list">
            <For each={THEMES}>
              {(item, index) => <li data-index={index()}><ThemeButton theme={item} /></li>}
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
