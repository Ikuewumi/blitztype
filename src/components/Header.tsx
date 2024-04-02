import { changeShowSettings } from '@stores/settings'
import '@scss/header.scss'
import { type JSXElement } from 'solid-js'

const Header = (): JSXElement => {
  const showModal = (): void => { changeShowSettings(true) }

  return (
  <header class="header">
    <figure class="header-logo">
      <h1>blitztype</h1>
    </figure>

    <button onClick={showModal} class="header-settings-btn" title="Open Settings Modal">
      <span>Settings</span>
    </button>
  </header>
  )
}

export default Header
