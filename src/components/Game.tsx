/* eslint-disable prefer-const */
import { getFormattedTimeNumber } from '@/composables/utils'
import { $currentWord, $gameData, $gameStarted, enterWord } from '@stores/game'
import { $scores } from '@stores/score'
import { useStore } from '@nanostores/solid'
import { createEffect, onCleanup, type JSXElement } from 'solid-js'

export const GameComponent = (): JSXElement => {
  let input = null as unknown as HTMLInputElement
  const EVT = 'input'
  const gameData = useStore($gameData)
  const gameStarted = useStore($gameStarted)
  const currentWord = useStore($currentWord)
  const scores = useStore($scores)
  const time = (): string[] => getFormattedTimeNumber(gameData().time)

  const checkAgainstCurrentWord = (): void => {
    console.log('called')
    if (currentWord() == null || currentWord() === '') return
    const inputWord = input.value.trim().toLowerCase()
    const wordCompleted = inputWord === currentWord().toLowerCase()
    if (!wordCompleted) return

    enterWord(inputWord)
    input.value = ''
  }

  const removeInputListener = (): void => { input.removeEventListener(EVT, (): void => {}) }
  const addInputListener = (): void => { input.addEventListener(EVT, checkAgainstCurrentWord) }

  // For More Control on The Input Element, to prevent listeners firing when the game isn;t started yet
  createEffect(() => {
    if (!gameStarted()) {
      console.info('Game Has Not Started Yet!')
      removeInputListener()
    } else {
      input.focus()
      addInputListener()
    }
  }, gameStarted)

  onCleanup(removeInputListener)

  return (
    <div class="game-container">

      <div class="timer">
        <span class="timer-seconds">{time()[0]}</span>
        <span class="timer-minuites">{time()[1]}</span>
      </div>

      <div class="game">
        <strong class="game-current-word">{currentWord()}</strong>
        <input ref={input} class="game-input" type="text" placeholder="Enter The Word" />

        <span>Score: {scores().currentScore}</span>
      </div>

    </div>
  )
}
