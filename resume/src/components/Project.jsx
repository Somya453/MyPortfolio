import React from 'react'
import Cards from './Cards'

const Project = () => {
  return (
    <div id="projects" className="bg-gray-100 py-16 px-4 sm:px-6">

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center">
        My Projects
      </h2>

      {/* Description */}
      <p className="text-center text-gray-600 mt-3 mb-10 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        Here are some of the projects I have built while learning Full Stack Development.
        Each project reflects my skills in frontend, backend, and problem solving using modern web technologies.
      </p>

      {/* Grid with proper gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        <Cards
          title="CommuneX"
          image="https://source.unsplash.com/600x400/?community"
          description="Community platform for reporting local issues and improving communication."
          demoLink="https://subtle-daifuku-a0a4c3.netlify.app/"
          codeLink="https://github.com/Somya453/communeX"
              />


                <Cards
          title="DonationFund"
          image="https://source.unsplash.com/600x400/?donation"
          description="Platform connecting donors, NGOs, and volunteers for social impact."
          demoLink="https://melodious-lamington-dbcaec.netlify.app/"
          codeLink="https://github.com/Somya453/DonationFund"
        />
              
        <Cards
          title="AI LearnPro"
          image="https://source.unsplash.com/600x400/?ai,learning"
          description="AI-powered learning platform for personalized education and skill development."
          demoLink="https://spontaneous-selkie-6972da.netlify.app/"
          codeLink="https://github.com/Somya453/AI-LEARNPRO"
              />
              

            

        <Cards
          title="E-commerce Store"
          image="https://source.unsplash.com/600x400/?ecommerce"
          description="Modern responsive e-commerce website with clean UI and cart system."
          demoLink="#"
          codeLink="https://github.com/Somya453/E-Commerce-Store"
        />

        

        

      </div>
    </div>
  )
}

export default Project