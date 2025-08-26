import { useEffect, useRef, useState } from 'react';

// Custom hook for scroll animations
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (defaultOptions.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!defaultOptions.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return [elementRef, isVisible] as const;
};

// Animation variants
export const fadeInUp = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
  transition: `all 0.6s ease-out ${delay}s`,
});

export const fadeInLeft = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateX(0px)' : 'translateX(-30px)',
  transition: `all 0.6s ease-out ${delay}s`,
});

export const fadeInRight = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateX(0px)' : 'translateX(30px)',
  transition: `all 0.6s ease-out ${delay}s`,
});

export const fadeIn = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transition: `opacity 0.6s ease-out ${delay}s`,
});

export const scaleIn = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
  transition: `all 0.6s ease-out ${delay}s`,
});

export const slideInUp = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
});

// Staggered animation helper
export const staggerChildren = (index: number, baseDelay = 0) => baseDelay + (index * 0.1);

// Component wrapper for easy animation
export const AnimatedSection: React.FC<{
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn' | 'slideInUp';
  delay?: number;
  className?: string;
}> = ({ children, animation = 'fadeInUp', delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollAnimation();

  const animations = {
    fadeInUp: fadeInUp(isVisible, delay),
    fadeInLeft: fadeInLeft(isVisible, delay),
    fadeInRight: fadeInRight(isVisible, delay),
    fadeIn: fadeIn(isVisible, delay),
    scaleIn: scaleIn(isVisible, delay),
    slideInUp: slideInUp(isVisible, delay),
  };

  return (
    <div 
      ref={ref as any}
      style={animations[animation]}
      className={className}
    >
      {children}
    </div>
  );
};