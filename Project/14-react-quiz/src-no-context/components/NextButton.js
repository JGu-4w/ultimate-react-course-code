export default function NextButton({ index, count, answer, dispatch }) {
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
