import React from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import CommandPalette from './components/ui/CommandPalette'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import OpenSource from './components/OpenSource'
import CodingProfiles from './components/CodingProfiles'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <OpenSource />
      <CodingProfiles />
      <Contact />
      <Footer />
    </>
  )
}

export default App
