/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })

  return result
}

export const debounce = (fn: () => any, delay: number = 100) => {
  let timer: number
  let last = 0

  return function (...args: []): any {
    const now = Date.now()

    if (now - last < delay) {
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args)
      }, delay)
    } else {
      // @ts-ignore
      fn.apply(this, args)
      last = now
    }
  }
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <V>(value: V, delay: number = 100) => {
  const [debounceValue, setDebounceValue] = useState(value)
  const debounceSet = useRef(null)
  if (!debounceSet.current) {
    // @ts-ignore
    debounceSet.current = debounce(setDebounceValue, delay)
  }

  useEffect(() => {
    // @ts-ignore
    debounceSet.current(value)
  }, [value, delay])

  return debounceValue
}

export function useArray<T>(arr: T[]) {
  const [value, setValue] = useState(arr)
  const add = (item: T) => {
    setValue([...value, item])
  }

  const clear = () => setValue([])
  const removeIndex = (index: number) => {
    value.splice(index, 1)
    setValue([...value])
  }

  return { value, clear, removeIndex, add }
}
