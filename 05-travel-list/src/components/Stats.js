export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    )

  const itemsNum = items.length
  const packedItemNum = items.filter((item) => item.packed).length
  const percentage = Math.round(packedItemNum / items.length) * 100

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go 🛫'
          : `💼 You have ${itemsNum} items on your list, and you already packed ${packedItemNum} (${percentage}%)`}
      </em>
    </footer>
  )
}
