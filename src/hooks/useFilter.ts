import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import type { Project } from '../types/project';

function useFilter(projects: Project[]) {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(term), 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return projects.filter(project => {
      const matchesCategory = filter === 'All' || project.category === filter;
      if (!matchesCategory) return false;
      if (!query) return true;
      return project.title.toLowerCase().includes(query) ||
             project.description.toLowerCase().includes(query) ||
             project.technologies.some(tech =>
               tech.toLowerCase().includes(query)
             );
    });
  }, [projects, filter, debouncedSearch]);

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm: handleSetSearchTerm,
    filteredProjects
  };
}

export default useFilter;