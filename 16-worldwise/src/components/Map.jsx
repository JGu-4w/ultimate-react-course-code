import { useParams, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
  const params = useParams()
  const id = params.id
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <div className={styles.mapContainer}>
      <h2>id: {id}</h2>
      <h2>
        lat: {lat} lng: {lng}
      </h2>
      <button onClick={() => setSearchParams({ lat: 60, lng: 50 })}>
        Click
      </button>
    </div>
  )
}
