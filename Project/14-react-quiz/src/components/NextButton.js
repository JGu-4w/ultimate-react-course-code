import { useQuiz } from '../context/QuizeContext'

export default function NextButton() {
  const { index, questionsCount: count, answer, dispatch } = useQuiz()

  if (answer === null) return null
  const finish = !(index < count - 1)
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: finish ? 'finish' : 'nextQuestion' })}
    >
      {finish ? 'Finish' : 'Next'}
    </button>
  )
}
