import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Project from './components/Project'  



export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Project />
      <Contact />
    
      
      <div className="bg-blue-500 h-auto w-full overflow-hidden"></div>
    </>
  )
}