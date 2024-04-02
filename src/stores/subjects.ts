// Major Function of this file is to get the words associated to a particular subject and use it

import { atom, type WritableAtom } from 'nanostores'
import { $toast } from './toast'
import { sleep } from '@/composables/utils'

type JSONData = Record<string, string[]>

const FILE_NAME = '/output.json'
const MESSAGE_SUCCESS = '✅ Booting Complete'
const MESSAGE_ERROR = '❌ Booting Failed'
const MESSAGE_LOADING = '...Booting Up Words...'
const TOAST_CANCEL_DELAY = 2000

export const $allWords: WritableAtom<JSONData> = atom({})
export const $allWordsLoading = atom(false)

export const controller = new AbortController()
export const fetchWords = async (): Promise<void> => {
  try {
    $allWords.set({})
    $allWordsLoading.set(true)
    $toast.set(MESSAGE_LOADING)

    const res = await fetch(FILE_NAME, { signal: controller.signal })
    if (!res.ok) throw Error('could not find the words')
    const data: JSONData = await res.json()

    $allWords.set(data)
    $toast.set(MESSAGE_SUCCESS)
  } catch (e) {
    $toast.set(MESSAGE_ERROR)
  } finally {
    $allWordsLoading.set(false)
    await sleep(TOAST_CANCEL_DELAY)
    $toast.set('')
  }
}
