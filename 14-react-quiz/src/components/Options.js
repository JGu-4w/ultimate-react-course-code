export default function Options({ question, answer, dispatch }) {
  const hasAnswer = answer !== null

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswer
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: 'setAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
