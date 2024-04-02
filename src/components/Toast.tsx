import { $toast } from '@/stores/toast'
import { useStore } from '@nanostores/solid'
import { type JSXElement } from 'solid-js'
import '@scss/toast.scss'

export const Toast = (): JSXElement => {
  const message = useStore($toast)

  return (
      <div aria-hidden={message() === ''} class="toast">{message()}</div>
  )
}

