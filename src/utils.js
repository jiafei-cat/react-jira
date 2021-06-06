/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
export const isFalsy = (value) => (value === 0 ? false : !value)

export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })

  return result
}

export const debounce = (fn, delay) => {
  let timer
  let last = 0

  return function (...args) {
    const now = Date.now()

    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    } else {
      fn.apply(this, args)
      last = now
    }
  }
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay, immediate) => {
  const [debounceValue, setDebounceValue] = useState(value)
  const debounceSet = useRef(null)
  if (!debounceSet.current) {
    debounceSet.current = debounce(setDebounceValue, delay, immediate)
  }

  useEffect(() => {
    debounceSet.current(value)
  }, [value, delay, immediate])

  return debounceValue
}
