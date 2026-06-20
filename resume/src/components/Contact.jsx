import React from 'react'
import { IoMailOutline, IoLocationOutline } from 'react-icons/io5'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-6" id="contact">

      <div className="max-w-4xl w-full bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-10 text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Contact Me
        </h2>

        <p className="text-gray-600 mb-10">
          Feel free to reach out for collaboration or just a friendly hello 👋
        </p>

        {/* Contact Info */}
        <div className="space-y-5">

          {/* Email */}
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <IoMailOutline className="text-2xl text-blue-600" />
            <span>somyasharma0488@gmail.com</span>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FaLinkedin className="text-2xl text-blue-700" />
            <a
              href="https://www.linkedin.com/in/somya-sharma-0984a8264/"
              target="_blank"
              className="hover:underline"
            >
              https://www.linkedin.com/in/somya-sharma-0984a8264/
            </a>
          </div>

          {/* GitHub */}
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FaGithub className="text-2xl text-gray-800" />
            <a
              href="https://github.com/Somya453"
              target="_blank"
              className="hover:underline"
            >
              https://github.com/Somya453
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <IoLocationOutline className="text-2xl text-red-500" />
            <span>India</span>
          </div>

        </div>

        {/* Button */}
        <div className="mt-8">
          <a
            href="mailto:somyasharma0488@gmail.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-110 transition duration-300 shadow-md "
          >
            Send Email
          </a>
        </div>

      </div>
    </div>
  )
}

export default Contact