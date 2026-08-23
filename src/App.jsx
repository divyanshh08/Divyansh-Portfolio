import './App.css'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import CodingActivity from './components/CodingActivity.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { profile } from './data/profile.js'
import { projects } from './data/projects.js'
import { codingActivity } from './data/codingActivity.js'

function App() {
  return (
    <div className="site-shell">
      <Header profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills projects={projects} />
        <Projects projects={projects} />
        <CodingActivity profile={profile} activity={codingActivity} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}

export default App
