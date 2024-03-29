import { useState, useCallback, useRef } from 'react';

function useTabNavigation(initialTab) {
  const [current, setCurrent] = useState(initialTab);
  const sectionRefs = useRef({ bun: null, sauce: null, main: null });

  const scrollToSection = useCallback((sectionType) => {
    setCurrent(sectionType);
    const sectionElement = sectionRefs.current[sectionType];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const setRef = useCallback(
    (sectionType) => (element) => {
      sectionRefs.current[sectionType] = element;
    },
    []
  );

  return { current, scrollToSection, setRef, setCurrent, sectionRefs };
}

export default useTabNavigation;
