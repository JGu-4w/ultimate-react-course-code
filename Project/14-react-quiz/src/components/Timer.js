import { useEffect } from 'react'
import { useQuiz } from '../context/QuizeContext'

export default function Timer() {
  const { remainingSecond, dispatch } = useQuiz()

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
