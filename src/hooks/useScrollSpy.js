import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

function useScrollSpy({ sectionRefs, offset = 0, throttleMs = 100 }) {
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      let activeSection;
      Object.keys(sectionRefs.current).forEach((key) => {
        const section = sectionRefs.current[key];
        if (section.offsetTop - offset <= scrollPosition) {
          activeSection = key;
        }
      });

      setCurrentSection(activeSection);
    }, throttleMs);

    window.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRefs, offset, throttleMs]);

  return currentSection;
}

export default useScrollSpy;
