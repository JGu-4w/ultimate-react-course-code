import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

const skills = [
  // advanced intermediate beginner
  {
    skill: 'HTML+CSS',
    level: 'advanced',
    color: 'skyblue',
  },
  {
    skill: 'JavaScript',
    level: 'advanced',
    color: 'orange',
  },
  {
    skill: 'Vue',
    level: 'advanced',
    color: 'lightgreen',
  },
  {
    skill: 'React',
    level: 'intermediate',
    color: 'tomato',
  },
  {
    skill: 'Solidity',
    level: 'beginner',
    color: 'pink',
  },
]

const emojiMapper = {
  advanced: '💪',
  intermediate: '👍',
  beginner: '👶',
}

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  )
}

function Avatar() {
  return <img className="avatar" src="avatar.jpg" alt="avatar" />
}

function Intro() {
  return (
    <div>
      <h1>Joe Gu</h1>
      <p>Front-End Developer</p>
    </div>
  )
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill
          skill={skill.skill}
          emoji={emojiMapper[skill.level]}
          backgroundColor={skill.color}
        />
      ))}
    </div>
  )
}

function Skill({ skill, emoji, backgroundColor }) {
  return (
    <div className="skill" style={{ backgroundColor: backgroundColor }}>
      <span>{skill}</span>
      <span>{emoji}</span>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
