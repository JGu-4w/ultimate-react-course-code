import { useState, useEffect } from 'react'

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    let storeValue = localStorage.getItem(key)
    storeValue = storeValue ? JSON.parse(storeValue) : initialState
    return storeValue
  })

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [value, key]
  )

  return [value, setValue]
}
