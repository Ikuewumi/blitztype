export interface Subject {
  /** The Name of The Subject of words, e.g. medicine, engineering */
  name: string

  /** The File which contains the words pertaining to that subject */
  file: string
}

export const subjects = [
  { name: 'all words', file: '/all.json' },
  { name: 'medicine', file: '/medicine.json' },
  { name: 'engineering', file: '/engineering.json' }
] as Subject[]
