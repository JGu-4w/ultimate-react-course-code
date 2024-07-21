export default function FinishScreen({
  points,
  totalPoints,
  highscore,
  dispatch,
}) {
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
