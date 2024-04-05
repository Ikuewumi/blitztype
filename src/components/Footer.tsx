import { type JSXElement } from 'solid-js'
import '@scss/footer.scss'

export const Footer = (): JSXElement => {
  return (
    <footer>
      <p>Made with 💙 by <a href="https://github.com/Ikuewumi" target="_blank">iKAY</a></p>
      <p><a href="https://github.com/Ikuewumi/speed-typing" target="_blank">Source Code</a></p>
    </footer>
  )
}
