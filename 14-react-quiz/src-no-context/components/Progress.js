export default function Progress({
  index,
  points,
  answer,
  count,
  totalPoints,
}) {
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
