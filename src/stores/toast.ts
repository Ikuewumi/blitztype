import { atom } from 'nanostores'

export const $toast = atom('')

export const writeMessage = (message: string): void => { $toast.set(message) }
