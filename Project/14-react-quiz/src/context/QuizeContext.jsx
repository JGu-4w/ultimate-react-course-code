import { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

const initialState = {
  questions: [],
  // 'loaidng', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSecond: 0,
}

const SECOND_PER_QUESTION = 30

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        remainingSecond: state.questions.length * SECOND_PER_QUESTION,
      }
    case 'setAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
      }
    case 'tick':
      return {
        ...state,
        remainingSecond: state.remainingSecond - 1,
        status: state.remainingSecond === 0 ? 'finished' : state.status,
      }

    default:
      break
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, remainingSecond },
    dispatch,
  ] = useReducer(reducer, initialState)

  const questionsCount = questions.length
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((res) => dispatch({ type: 'dataReceived', payload: res }))
      .catch((error) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingSecond,
        questionsCount,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('QuizContext was used outside of the QuizProvider.')
  return context
}

export { QuizProvider, useQuiz }
