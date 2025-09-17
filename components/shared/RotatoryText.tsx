"use client";

import React, { useState, useEffect, useRef } from "react";

interface RotatoryTextProps {
  phrases: string[];
  className?: string;
  textClassName?: string;
}

export const RotatoryText: React.FC<RotatoryTextProps> = ({
  phrases,
  className = "",
  textClassName = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  // Start the rotation when component becomes visible
  useEffect(() => {
    if (isVisible && phrases.length > 1) {
      intervalRef.current = setInterval(() => {
        const newNextIndex = (currentIndex + 1) % phrases.length;
        setNextIndex(newNextIndex);
        setIsAnimating(true);

        // After animation completes, update current index and reset animation
        setTimeout(() => {
          setCurrentIndex(newNextIndex);
          setIsAnimating(false);
        }, 500); // Match the CSS transition duration
      }, 6000); // 6 seconds between changes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, phrases.length, currentIndex]);

  // Don't render if no phrases
  if (!phrases || phrases.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative h-[14em] w-full overflow-hidden md:h-[8em] ${className}`}
    >
      {/* Current text */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
          isAnimating
            ? "translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <span className={`text-center ${textClassName}`}>
          {phrases[currentIndex]}
        </span>
      </div>

      {/* Next text (slides in from above) - only render during animation */}
      {isAnimating && (
        <div
          className="absolute inset-0 flex -translate-y-full items-center justify-center opacity-0 transition-all duration-500 ease-in-out"
          style={{
            animation: "slideDownIn 500ms ease-in-out forwards",
          }}
        >
          <span className={`text-center ${textClassName}`}>
            {phrases[nextIndex]}
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDownIn {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
