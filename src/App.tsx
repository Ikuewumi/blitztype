import { type JSXElement } from 'solid-js'
import Header from '@components/Header'
import { Dialogs } from '@components/Dialogs'
import { GameComponent } from './components/Game'
import { startKeyMaps } from '@composables/keymaps'

const App = (): JSXElement => {
  startKeyMaps()

  return (
    <>
      <Header />
      <main>
        <Dialogs />
        <GameComponent />
      </main>
    </>
  )
}

export default App
