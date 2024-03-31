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

export const checkIndexValidity = (index: number, array: any[]): void => {
  if (!(index >= 0 && index < array.length)) {
    throw Error('out of bounds')
  }
}
