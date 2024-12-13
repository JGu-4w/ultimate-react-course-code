import { useEffect } from 'react'

export default function Timer({ remainingSecond, dispatch }) {
  const mins = Math.floor(remainingSecond / 60)
  const second = remainingSecond % 60

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)
    return () => clearInterval(timer)
  }, [dispatch])

  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{second < 10 && '0'}
      {second}
    </div>
  )
}
