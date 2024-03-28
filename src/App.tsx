import { type JSXElement } from 'solid-js'
import Header from './components/Header'
import { Dialogs } from './components/dialogs'

const App = (): JSXElement => {
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
