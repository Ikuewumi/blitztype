import '@scss/header.scss'
import { type JSXElement } from 'solid-js'

const Header = (): JSXElement => {
  return (
  <header class="header">
    <figure class="header-logo">
      <svg viewBox="0 0 24 24"><use href="#logo"></use></svg>
      <strong>blitztype</strong>
    </figure>

    <button class="header-settings-btn" title="Open Settings Modal">
      <span>Settings</span>
      <svg viewBox="0 0 24 24"><use href="#settings"></use></svg>
    </button>
  </header>
  )
}

export default Header
