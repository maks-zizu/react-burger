import { useState, useEffect, MutableRefObject } from "react";
import { throttle } from "lodash";

interface SectionRefs {
  [key: string]: HTMLElement;
}

interface UseScrollSpyParams {
  sectionRefs: MutableRefObject<SectionRefs>;
  offset?: number;
  throttleMs?: number;
}

function useScrollSpy({
  sectionRefs,
  offset = 0,
  throttleMs = 100,
}: UseScrollSpyParams) {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      let activeSection: string | null = null;
      Object.keys(sectionRefs.current).forEach((key) => {
        const section = sectionRefs.current[key];
        if (section.offsetTop - offset <= scrollPosition) {
          activeSection = key;
        }
      });

      setCurrentSection(activeSection);
    }, throttleMs);

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRefs, offset, throttleMs]);

  return currentSection;
}

export default useScrollSpy;
