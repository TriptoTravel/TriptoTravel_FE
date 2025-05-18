"use client";

import { useEffect, useState } from "react";

const images = [
  "/images/landing1.svg",
  "/images/landing2.svg",
  "/images/landing3.svg",
  "/images/landing4.svg",
  "/images/landing5.svg",
  "/images/landing6.svg",
];

const durations = [1000, 1800, 2000, 2000, 1800, 4000];

export default function LandingAnimation() {
  const [index, setIndex] = useState(0);
  const [opacityLevel, setOpacityLevel] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let transitionTimer: NodeJS.Timeout;

    if (index === 2) {
      // ✅ 3 → 4: opacity 0.5
      timer = setTimeout(() => {
        setOpacityLevel(0.5);
        transitionTimer = setTimeout(() => {
          setIndex(3);
          setOpacityLevel(1);
        }, 300);
      }, durations[2]);
    } else if (index === 5) {
      // ✅ 6 → 1: opacity 0 (완전 fade-out)
      timer = setTimeout(() => {
        setOpacityLevel(0);
        transitionTimer = setTimeout(() => {
          setIndex(0);
          setOpacityLevel(1);
        }, 300);
      }, durations[5]);
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
