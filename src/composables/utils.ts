import confetti from 'canvas-confetti'

export const getFormattedTimeString = (seconds: number): string => {
  const secondsCount = seconds % 60
  const minuitesCount = Math.floor(seconds / 60)

  let string = `${secondsCount} secs`
  if (minuitesCount > 0) {
    string = `${minuitesCount} ${minuitesCount > 1 ? 'mins' : 'min'} ${secondsCount > 0 ? ` ${secondsCount} seconds` : ''}`
  }

  return string
}

export const getFormattedTimeNumber = (seconds: number): [string, string] => {
  const secondsCount = seconds % 60
  const minuitesCount = Math.floor(seconds / 60)

  const prettifyNumber = (num: number): string => {
    return num > 9 ? `${num}` : `0${num}`
  }

  return [prettifyNumber(minuitesCount), prettifyNumber(secondsCount)]
}

export const checkIndexValidity = (index: number, array: any[] | (() => any[])): void => {
  let checkArray: any[]
  if (typeof array === 'function') { checkArray = array() } else { checkArray = array }

  if (!(index >= 0 && index < checkArray.length)) {
    throw Error('out of bounds')
  }
}

export const sleep = async (timeInMs: number): Promise<unknown> => {
  return await new Promise(resolve => {
    setTimeout(resolve, timeInMs)
  })
}

export const throwConfetti = async (timeInMs = 2000): Promise<void> => {
  void confetti()

  await sleep(timeInMs)

  confetti.reset()
}
