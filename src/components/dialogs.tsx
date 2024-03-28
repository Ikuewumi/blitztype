import { For, type JSXElement } from 'solid-js'
import '@scss/dialog.scss'
import { type Theme, THEMES } from '@/stores/settings'
import { subjects } from '@/data/subjects'

interface ThemeButtonProps {
  theme: Theme
}
export const ThemeButton = (props: ThemeButtonProps): JSXElement => {
  const colorVariableString = (): string => `
    --bg:${props.theme.colors[0]};--clr:${props.theme.colors[1]};
  `

  return (
    <button class="theme-button" style={colorVariableString()}>
      {props.theme.name}
    </button>
  )
}

// @TODO- Use AI to generate the text for the labels
export const SettingsDialog = (): JSXElement => {
  return (
    <dialog id="settings" class="settings-dialog" data-grid open>
      <div class="settings-wrapper">
        <h2 class="settings-title">Settings</h2>

        <details class="settings-mode">
          <summary class="settings-mode-summary">
            <strong class="settings-mode-title">Mode</strong>
          </summary>

          <div class="settings-mode-fields">
            <div class="setting-mode-field">
              <label for="setting-mode" class="setting-mode-label">Mode</label>
              <select name="mode" id="setting-mode" class="setting-mode-select">
                <option value="classic">classic</option>
                <option value="wordstorm">wordstorm</option>
              </select>
            </div>
            <div class="setting-mode-field">
              <label for="setting-time" class="setting-mode-time">Time</label>
              <select name="time" id="setting-time" class="setting-mode-select">
<option value="5">5 secs</option>
<option value="4">4 secs</option>
<option value="2">2 secs</option>
              </select>
            </div>
          </div>
        </details>

        <details class="settings-subject">
          <summary class="settings-subject-summary">
            <strong class="settings-subject-title">Subject</strong>
          </summary>
          <div class="settings-subject-field">
            <label class="settings-subject-label sr-only" for="settings-subject">Choose A Preferred Subject Of Words</label>
            <select name="subject" id="settings-subject" class="settings-subject-select">
              <For each={subjects}>
                {(subject, index) => <option value={index()}>{subject.name}</option>}
              </For>
            </select>
            <small class="settings-subject-small">More Coming Soon!...</small>
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
    </dialog>
  )
}

export const Dialogs = (): JSXElement => {
  return (
    <>
      <SettingsDialog />
    </>
  )
}
