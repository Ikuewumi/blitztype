import { $allWords } from '@/stores/subjects'
import { computed } from 'nanostores'

export interface Subject {
  /** The Name of The Subject of words, e.g. medicine, engineering */
  name: string

  /** The array which contains the words pertaining to that subject */
  words: string[]
}

export const SUBJECTS = [
  { name: 'all words', words: ['/all.json'] },
  { name: 'medicine', words: ['/medicine.json'] },
  { name: 'engineering', words: ['/engineering.json'] }
] as Subject[]

export const $SUBJECTS = computed($allWords, (words) => {
  const subjectsArray: Subject[] = []

  for (const subject in words) {
    subjectsArray.push({ name: subject, words: words[subject] })
  }

  return subjectsArray
})
