import React from 'react'

const Navbar = () => {
  const [menu, setMenu] = React.useState(false)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="text-white font-bold text-xl">
          My Portfolio
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="text-white md:hidden"
        >
          {menu ? '✕' : '☰'}
        </button>


        

        {/* Menu Links */}
        <ul className={`${menu ? 'block' : 'hidden'} md:flex space-x-4`}>
          <li>
            <a href="#home" className="text-gray-300 hover:text-white"
             onClick={() => document.getElementById('Home').scrollIntoView({ behavior: 'smooth' })}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-gray-300 hover:text-white"
             onClick={() => document.getElementById('About').scrollIntoView({ behavior: 'smooth' })}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="text-gray-300 hover:text-white"
             onClick={() => document.getElementById('Projects').scrollIntoView({ behavior: 'smooth' })}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-300 hover:text-white"
             onClick={() => document.getElementById('Contact').scrollIntoView({ behavior: 'smooth' })}>
              Contact
            </a>
          </li>
        </ul>

        {menu ? (
          <p className="text-white ml-4">Menu Open</p>
        ) : null}

      </div>
    </nav>
  )
}

export default Navbar