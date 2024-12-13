import { useQuiz } from '../context/QuizeContext'

export default function Progress() {
  const {
    index,
    answer,
    points,
    questionsCount: count,
    totalPoints,
  } = useQuiz()

  return (
    <header className="progress">
      <progress max={count} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} / {count}
      </p>
      <p>
        {points} / {totalPoints}
      </p>
    </header>
  )
}
