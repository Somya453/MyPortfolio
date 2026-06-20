import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Project from './components/Project';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen overflow-x-hidden w-full select-none selection:bg-indigo-500/30">
      <Navbar />
      <Home />
      <About />
      <Project />
      <Contact />
    </div>
  );
}