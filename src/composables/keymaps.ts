import { KEYMAPS } from '@data/keymaps'

export const startKeyMaps = (): void => {
  document.addEventListener('keydown', (e) => {
    const keymap = KEYMAPS.find(key => key.keyCode.toLowerCase() === e.key.toLowerCase() && key.ctrlKey === e.ctrlKey)

    if (!(keymap === null || keymap === undefined)) {
      e.preventDefault()
      keymap.function()
    }
  })
}
