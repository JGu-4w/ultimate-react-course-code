import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return <Message message={'Please Add Your First City !!!'} />

  const countries = cities.reduce((acc, curr) => {
    if (acc.map((item) => item.country).includes(curr.country)) return acc
    return [...acc, curr]
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  )
}

export default CountryList
