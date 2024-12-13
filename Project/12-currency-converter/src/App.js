// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react'

export default function App() {
  const [currency, setCurrency] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('JPY')
  const [toCurrency, setToCurrency] = useState('CNY')
  const [resCurrency, setResCurrency] = useState('')

  useEffect(
    function () {
      const controller = new AbortController()
      async function fetchCurrencyConverter() {
        if (currency > 0) {
          try {
            const res = await fetch(
              `https://api.frankfurter.app/latest?amount=${currency}&from=${fromCurrency}&to=${toCurrency}`,
              { signal: controller.signal }
            )
            const data = await res.json()
            if (data.rates?.[toCurrency]) {
              setResCurrency(data.rates?.[toCurrency])
            }
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.log(err.message)
            }
          }
        }
      }

      if (fromCurrency === toCurrency) return setResCurrency(currency)
      fetchCurrencyConverter()

      return function () {
        controller.abort()
      }
    },
    [currency, fromCurrency, toCurrency]
  )

  return (
    <div>
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="CNY">CNY</option>
        <option value="JPY">JPY</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="CNY">CNY</option>
        <option value="JPY">JPY</option>
      </select>
      <p>{resCurrency ? `${resCurrency} ${toCurrency}` : ''}</p>
    </div>
  )
}
