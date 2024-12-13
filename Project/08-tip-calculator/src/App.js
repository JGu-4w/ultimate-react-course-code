import { useState } from 'react'

function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  )
}

function TipCalculator() {
  const [bill, setBill] = useState('')
  const [percentage, setPercentage] = useState(0)
  const [friendPercentage, setFriendPercentage] = useState(0)

  const tip = bill * (((percentage + friendPercentage) / 2) * 0.01)

  function handleReset() {
    setBill('')
    setPercentage(0)
    setFriendPercentage(0)
  }

  return (
    <div>
      <BillInput bill={bill} onChange={setBill} />
      <ServicePercentage percentage={percentage} onSelect={setPercentage}>
        How did you like the service?
      </ServicePercentage>
      <ServicePercentage
        percentage={friendPercentage}
        onSelect={setFriendPercentage}
      >
        How did your friend like the service?
      </ServicePercentage>
      <TotalPrice bill={bill} tip={tip} />
      <ResetButton onReset={handleReset} />
    </div>
  )
}

function BillInput({ bill, onChange }) {
  return (
    <div className="bill-input">
      <span>How much was the bill?</span>
      <input value={bill} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}

function ServicePercentage({ percentage, onSelect, children }) {
  return (
    <div className="service-percentage">
      <span>{children}</span>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

function TotalPrice({ bill, tip }) {
  return (
    <div className="total-price">
      {bill && (
        <h3>
          You pay ${bill + tip} (${bill} + ${tip} tip)
        </h3>
      )}
    </div>
  )
}

function ResetButton({ onReset }) {
  return <button onClick={onReset}>Reset</button>
}

export default App
