"use client";

import { useEffect, useState } from "react";

const images = [
  "/images/landing1.svg",
  "/images/landing2.svg",
  "/images/landing3.svg",
  "/images/landing4.svg",
];

const durations = [1000, 2000, 2000, 4000];

export default function LandingAnimation() {
  const [index, setIndex] = useState(0);
  const [opacityLevel, setOpacityLevel] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let transitionTimer: NodeJS.Timeout;

    if (index === 1) {
      timer = setTimeout(() => {
        setOpacityLevel(0.4);
        transitionTimer = setTimeout(() => {
          setIndex(2);
          setOpacityLevel(1);
        }, 1000);
      }, durations[1]);
    } 
    
    else if (index === 3) {
      timer = setTimeout(() => {
        setOpacityLevel(0);
        transitionTimer = setTimeout(() => {
          setIndex(0);
          setOpacityLevel(1);
        }, 300);
      }, durations[3]);
    } else {
      // ✅ 그 외: 그냥 전환
      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, durations[index]);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(transitionTimer);
    };
  }, [index]);

  return (
    <img
      src={images[index]}
      alt={`Landing ${index + 1}`}
      style={{ opacity: opacityLevel }}
      className="w-[400px] h-auto object-contain mx-auto transition-opacity duration-300"
    />
  );
}
