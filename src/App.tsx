import { type JSXElement } from 'solid-js'
import Header from '@components/Header'
import { Dialogs } from '@components/dialogs'
import { startKeyMaps } from '@composables/keymaps'

const App = (): JSXElement => {
  startKeyMaps()

  return (
    <>
      <Header />
      <main>
        <Dialogs />
      </main>
    </>
  )
}

export default App
