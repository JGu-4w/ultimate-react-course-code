import { useQuiz } from '../context/QuizeContext'

export default function StartScreen() {
  const { questionsCount: count, dispatch } = useQuiz()
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{count} Questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's Start
      </button>
    </div>
  )
}
