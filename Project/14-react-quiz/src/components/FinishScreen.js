import { useQuiz } from '../context/QuizeContext'

export default function FinishScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuiz()

  const percentage = (points / totalPoints) * 100
  return (
    <>
      <p className="result">
        <span>
          Your score <strong>{points}</strong> out of {totalPoints} (
          {Math.ceil(percentage)}%)
        </span>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz!
      </button>
    </>
  )
}
