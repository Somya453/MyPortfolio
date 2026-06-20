import React from 'react'

const Cards = ({ title, image, description, demoLink, codeLink }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden">

      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-5 text-center">

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-5">

          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:scale-105 transition inline-block"
            >
              Demo
            </a>
          )}

          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:scale-105 transition inline-block"
            >
              Source Code
            </a>
          )}

        </div>

      </div>
    </div>
  )
}

export default Cards