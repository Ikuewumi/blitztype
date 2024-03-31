import { startGame } from '@/stores/game'
import { $mode, $userTime, changeShowSettings } from '@stores/settings'

const words = [
  'Uninterpreted',
  'Bit',
  'Byte',
  'Trit',
  'Tryte',
  'Word',
  'Numeric',
  'Bignum',
  'Complex',
  'Decimal',
  'Integer',
  'signedness',
  'Interval',
  'Rational',
  'Pointer',
  'Address',
  'physical',
  'virtual',
  'Reference',
  'Text',
  'Character',
  'String',
  'Composite',
  'generalized',
  'Array',
  'Class',
  'Dependent',
  'Equality',
  'Inductive',
  'Intersection',
  'List',
  'Object',
  'metaobject',
  'Product',
  'Refinement',
  'Set',
  'Union',
  'tagged',
  'Other',
  'Boolean',
  'Collection',
  'Exception',
  'Semaphore',
  'Stream',
  'Void',
  'Data',
  'Generic',
  'Kind',
  'metaclass',
  'polymorphism',
  'Interface',
  'Subtyping',
  'Variable'
]

/**
 * Represents the app shortcuts
 */
export interface KeyMap {

  /** The key in string format, and it is case insensitive */
  keyCode: string

  /** States whether the control key has to be active for this shortcut */
  ctrlKey: boolean

  /** A callback function for when this shortcut is called */
  function: (...any: any) => any
}

const start = (): void => {
  changeShowSettings(false)
  startGame(words)
}

export const KEYMAPS: KeyMap[] = [
  { keyCode: 'K', ctrlKey: true, function: changeShowSettings },
  { keyCode: 'Escape', ctrlKey: false, function: changeShowSettings.bind(null, false) },
  { keyCode: '/', ctrlKey: true, function: start }
]
