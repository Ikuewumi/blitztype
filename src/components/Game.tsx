/* eslint-disable prefer-const */
import '@scss/game.scss'
import { getFormattedTimeNumber } from '@/composables/utils'
import { $currentWord, $gameData, $gameStarted, enterWord, start, stopGame } from '@stores/game'
import { $scores } from '@stores/score'
import { useStore } from '@nanostores/solid'
import { Show, createEffect, onCleanup, type JSXElement } from 'solid-js'

export const GameComponent = (): JSXElement => {
  let input = null as unknown as HTMLInputElement
  const EVT = 'input'
  const gameData = useStore($gameData)
  const gameStarted = useStore($gameStarted)
  const currentWord = useStore($currentWord)
  const scores = useStore($scores)
  const buttonData = (): Record<string, string> => gameStarted()
    ? ({ svgId: '#stop', title: 'Stop Game' })
    : ({ svgId: '#start', title: 'Start Game' })

  const time = (): string[] => getFormattedTimeNumber(gameData().time)

  const checkAgainstCurrentWord = (): void => {
    if (!gameStarted()) return
    if (currentWord() == null || currentWord() === '') return
    const inputWord = input.value.trim().toLowerCase()
    const wordCompleted = inputWord === currentWord().toLowerCase()
    if (!wordCompleted) return

    enterWord(inputWord)
    input.value = ''
    input.focus()
  }

  const removeInputListener = (): void => { input.removeEventListener(EVT, (): void => { }) }
  const addInputListener = (): void => { input.addEventListener(EVT, checkAgainstCurrentWord) }

  // For More Control on The Input Element, to prevent listeners firing when the game isn;t started yet
  createEffect(() => {
    if (gameStarted()) {
      input.value = ''
      input.focus()
      addInputListener()
    } else {
      removeInputListener()
    }
  }, gameStarted)

  onCleanup(removeInputListener)

  const toggleGame = (): void => {
    if (gameStarted()) stopGame()
    else start()
  }

  return (
    <div class="game-wrapper">

      <div class="timer">
        <span class="timer-seconds">{time()[0]}</span>
        <span class="timer-minuites">{time()[1]}</span>
      </div>

      <div class="game">
        <Show when={gameStarted()} fallback={<span class="game-wordfallback"></span>} >
          <strong class="game-word">{currentWord()}</strong>
        </Show>

        <label onClick={toggleGame} for="game-input" class="game-label">
          <button class="game-button" title={buttonData().title}>
            <span class="sr-only">{buttonData().title}</span>
            <svg viewBox="0 0 24 24">
              <use href={gameStarted() ? '#stop' : '#start'}></use>
            </svg>
          </button>
        </label>

        <input ref={input} id="game-input" class="game-input" type="text" placeholder="Enter The Word" />

        <ul class="game-shortcuts">
          <li><code>Ctrl+/</code> starts the game</li>
          <li><code>Ctrl+K</code> opens the settings menu</li>
        </ul>
      </div>

      <div class="score">
        <span class="score-current-score">score: <em>{scores().currentScore}</em></span>
        <span class="score-high-score">highScore: <em>{scores().highScore}</em></span>
      </div>

    </div>
  )
}
