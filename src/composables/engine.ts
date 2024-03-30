export const getFormattedTime = (seconds: number): { string: string, number: number[] } => {
  const secondsCount = seconds % 60
  const minuitesCount = Math.floor(seconds / 60)

  let string = `${secondsCount} secs`
  const number = [minuitesCount, secondsCount]
  if (minuitesCount > 0) {
    string = `${minuitesCount} ${minuitesCount > 1 ? 'mins' : 'min'} ${secondsCount > 0 ? ` ${secondsCount} seconds` : ''}`
  }

  return {
    string,
    number
  }
}

export const checkIndexValidity = (index: number, array: any[]): void => {
  if (!(index >= 0 && index < array.length)) {
    throw Error('out of bounds')
  }
}
