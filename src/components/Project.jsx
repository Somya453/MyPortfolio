import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import ScrollAnimate from './ScrollAnimate';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback defaults in case backend is offline
  const defaultProjects = [
    {
      id: '1',
      title: 'CommuneX',
      image: '/assets/sickIndia.avif',
      description: 'Community platform for reporting local issues and improving communication.',
      demoLink: 'https://subtle-daifuku-a0a4c3.netlify.app/',
      codeLink: 'https://github.com/Somya453/communeX'
    },
    {
      id: '2',
      title: 'DonationFund',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60',
      description: 'Platform connecting donors, NGOs, and volunteers for social impact.',
      demoLink: 'https://melodious-lamington-dbcaec.netlify.app/',
      codeLink: 'https://github.com/Somya453/DonationFund'
    },
    {
      id: '3',
      title: 'AI LearnPro',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60',
      description: 'AI-powered learning platform for personalized education and skill development.',
      demoLink: 'https://spontaneous-selkie-6972da.netlify.app/',
      codeLink: 'https://github.com/Somya453/AI-LEARNPRO'
    },
    // {
    //   id: '4',
    //   title: 'E-commerce Store',
    //   image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=60',
    //   description: 'Modern responsive e-commerce website with clean UI and cart system.',
    //   demoLink: '',
    //   codeLink: 'https://github.com/Somya453/E-Commerce-Store'
    // }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects');
        if (!res.ok) throw new Error('Network response not ok');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.warn('Backend offline, using fallback client-side projects:', err);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();

    // Listen for custom events to refresh project list (when projects are modified in AdminPanel)
    const handleProjectsUpdate = () => {
      fetchProjects();
    };
    window.addEventListener('projects-updated', handleProjectsUpdate);
    return () => window.removeEventListener('projects-updated', handleProjectsUpdate);
  }, []);

  return (
    <div id="projects" className="relative py-24 px-6 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden text-slate-100">
      
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title & Description wrapped in ScrollAnimate */}
        <ScrollAnimate className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My Creative Showcase
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mt-4 mb-6" />
          <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
            Here are some of the full-stack and frontend projects I've built. Each project reflects my dedication to robust engineering, responsive design, and intuitive user experiences.
          </p>
        </ScrollAnimate>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400" />
            <p className="mt-4 text-neutral-400 font-medium animate-pulse">Loading gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Cards
                key={project.id || index}
                index={index}
                title={project.title}
                image={project.image}
                description={project.description}
                demoLink={project.demoLink}
                codeLink={project.codeLink}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;