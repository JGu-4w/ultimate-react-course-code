import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Timer from './Timer'
import { useQuiz } from '../context/QuizeContext'
import { useEffect } from 'react'

export default function App() {
  const { status } = useQuiz()
  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Timer />
            <NextButton />
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  )
}
