import { Match, Switch, type JSXElement } from 'solid-js'
import Header from '@components/Header'
import { Dialogs } from '@components/Dialogs'
import { GameComponent } from '@components/Game'
import { startKeyMaps } from '@composables/keymaps'
import { fetchWords, $allWords } from '@stores/subjects'
import { useStore } from '@nanostores/solid'
import { Toast } from './components/Toast'

const App = (): JSXElement => {
  const words = useStore($allWords)

  const fallback = <div class="game-fallback"></div>

  startKeyMaps()
  void fetchWords()

  return (
    <>
      <Header />
      <main>
        <Toast />
        <Switch fallback={fallback}>
          <Match when={Object.keys(words()).length > 0}>
            <strong id="dialog-title" class="sr-only">Settings Modal</strong>
            <Dialogs />
            <GameComponent />
          </Match>
        </Switch>
      </main>
    </>
  )
}

export default App
