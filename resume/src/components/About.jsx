import React from 'react'
import { IoArrowForward } from 'react-icons/io5'

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-yellow-100 px-6" id="about">

      <div className="max-w-5xl w-full md:flex items-center gap-10 bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-10">

        {/* Image Section */}
        <div className="flex justify-center md:w-1/2">
          <img
            src="/assets/profile.png"
            alt="About Me"
            className="w-72 h-72 object-cover rounded-full border-4 border-white shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 text-center md:text-left">

          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            About Me
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            I am a passionate Full Stack Developer at the beginning of my journey in web development.
            I enjoy learning modern technologies and building responsive, user-friendly web applications.
            I am continuously improving my skills in frontend and backend development and love turning ideas into real projects.
            My goal is to become a skilled developer who creates meaningful and impactful digital experiences.
          </p>

          {/* Skills / Roles */}
          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-lg hover:scale-105 transition cursor-pointer shadow-md">
              <IoArrowForward className="text-white text-lg" />
              <span className="font-medium">Frontend Development </span>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 bg-yellow-500 text-white rounded-lg hover:scale-105 transition cursor-pointer shadow-md">
              <IoArrowForward className="text-white text-lg" />
              <span className="font-medium">Backend Development </span>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 bg-blue-600 text-white rounded-lg hover:scale-105 transition cursor-pointer shadow-md">
              <IoArrowForward className="text-white text-lg" />
              <span className="font-medium">Building Projects & Practice</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default About