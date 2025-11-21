import { useState } from 'react';
import type { Project } from '../types/project';

function useFilter(projects: Project[]) {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => 
                           tech.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    filteredProjects
  };
}

export default useFilter;