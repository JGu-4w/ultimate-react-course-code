import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import styles from './Homepage.module.css'
import PageNav from '../components/PageNav'

export default function Homepage() {
  const navigate = useNavigate()

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Button type="primary" onClick={() => navigate('/login')}>
          START TRACKING NOW
        </Button>
      </section>
    </main>
  )
}
