import { useState, useCallback, useRef } from "react";

export type SectionType = "bun" | "sauce" | "main";

interface SectionRefs {
  bun: HTMLDivElement | null;
  sauce: HTMLDivElement | null;
  main: HTMLDivElement | null;
}

function useTabNavigation(initialTab: SectionType) {
  const [current, setCurrent] = useState<SectionType>(initialTab);
  const sectionRefs = useRef<SectionRefs>({
    bun: null,
    sauce: null,
    main: null,
  });

  const scrollToSection = useCallback((sectionType: SectionType) => {
    setCurrent(sectionType);
    const sectionElement = sectionRefs.current[sectionType];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const setRef = useCallback(
    (sectionType: SectionType) => (element: HTMLDivElement | null) => {
      sectionRefs.current[sectionType] = element;
    },
    []
  );

  return { current, scrollToSection, setRef, setCurrent, sectionRefs };
}

export default useTabNavigation;
