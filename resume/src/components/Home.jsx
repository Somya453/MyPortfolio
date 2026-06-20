import React, { useEffect, useState } from 'react'

const Home = () => {
  const texts = [" Somya Sharma", " a Full Stack Developer"]

  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentText = texts[index]

    const speed = isDeleting ? 80 : 120

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // typing
        setText(currentText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000) // pause before deleting
        }
      } else {
        // deleting
        setText(currentText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)

        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, index])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100" id="Home">
      <div className="text-center">

        <h1 className="text-5xl font-bold text-gray-800">
                  Hello, I'm
          {text}
                  <span className="animate-pulse"></span>
                  👋
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
        I build responsive, accessible, and visually refined web applications by bridging design and development. |  
         I am a Full Stack Developer passionate about building responsive and user-friendly web applications while continuously learning modern technologies.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-110 transition"
           onClick={() => document.getElementById('Projects').scrollIntoView({ behavior: 'smooth' })}>
    View My Work
  </button>


                  
  <button
  className=" id px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-110 transition"
  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
>
  Contact Me
  </button>
                  

</div>

          </div>
          
          <div>
              

          </div>
    </div>
  )
}

export default Home