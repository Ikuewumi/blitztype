import { computed, map } from 'nanostores'
import { $scores } from './score'
import { $mode, $userTime } from './settings'

interface GameData {
  time: number
  currentWordIndex: number
  allWords: string[]
  gameStarted: boolean
}

let gameTimeId: number

const defaultGameData: GameData = { time: 0, currentWordIndex: -1, allWords: [], gameStarted: false }
export const $gameData = map({ ...defaultGameData })
export const $currentWord = computed($gameData, (gameData) => gameData.allWords[gameData.currentWordIndex])
export const $gameStarted = computed($gameData, (gameData) => gameData.gameStarted)
export const stopTimer = (): void => { clearInterval(gameTimeId) }
export const startTimer = (time: number): void => {
  stopTimer()
  $gameData.setKey('time', time)

  gameTimeId = setInterval(() => {
    if (time < 1) stopTimer(); else time--

    $gameData.setKey('time', time)
  }, 1000) as unknown as number
}

export const stopGame = (): void => {
  $gameData.setKey('gameStarted', false)
}

export const startGame = (words: string[]): void => {
  const time = $userTime.get()
  if (words.length === 0 && time <= 0) throw Error('no words present')

  $gameData.set({
    time,
    allWords: words.sort(_ => 0.5 - Math.random()),
    currentWordIndex: 0,
    gameStarted: true

  })
  $scores.setKey('currentScore', 0)
  startTimer(time)
}

export const enterWord = (string: string): void => {
  const { gameStarted, currentWordIndex } = $gameData.get()
  if (!gameStarted) { return }
  if (string.toLowerCase() !== $currentWord.get().toLowerCase()) { return }

  const { currentScore } = $scores.get()
  $scores.setKey('currentScore', currentScore + 1)

  if (currentWordIndex + 1 < $gameData.get().allWords.length) {
    $gameData.setKey('currentWordIndex', currentWordIndex + 1)
    $mode.get().onWordComplete?.()
  } else {
    stopGame()
  }
}

$gameData.listen((newData, _, changedKey) => {
  switch (changedKey) {
    case 'gameStarted':
      if (!newData.gameStarted) return
      stopGame()
      break
    case 'time':
      if (newData.time >= 1) return
      stopGame()
      break
    case 'allWords':
      stopGame()
  }
})
