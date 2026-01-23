import { useEffect, useCallback } from "react";

interface Section {
  id: string;
  label: string;
}

interface UseKeyboardNavigationProps {
  sections: Section[];
  activeSection: string;
  containerRef: React.RefObject<HTMLElement>;
}

export const useKeyboardNavigation = ({
  sections,
  activeSection,
  containerRef,
}: UseKeyboardNavigationProps) => {
  const navigateToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element && containerRef.current) {
        containerRef.current.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [containerRef]
  );

  const navigateNext = useCallback(() => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      navigateToSection(sections[currentIndex + 1].id);
    }
  }, [sections, activeSection, navigateToSection]);

  const navigatePrev = useCallback(() => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      navigateToSection(sections[currentIndex - 1].id);
    }
  }, [sections, activeSection, navigateToSection]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          navigateNext();
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          navigatePrev();
          break;
        case "Home":
          event.preventDefault();
          navigateToSection(sections[0].id);
          break;
        case "End":
          event.preventDefault();
          navigateToSection(sections[sections.length - 1].id);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateNext, navigatePrev, navigateToSection, sections]);

  return { navigateNext, navigatePrev, navigateToSection };
};
