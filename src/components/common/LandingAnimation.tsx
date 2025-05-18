"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const images = [
  "/images/landing1.svg",
  "/images/landing2.svg",
  "/images/landing3.svg",
  "/images/landing4.svg",
  "/images/landing5.svg",
  "/images/landing6.svg",
];

// 각 이미지별로 보여줄 시간 (ms)
const durations = [1000, 1500, 2000, 2000, 1500, 4000];

export default function LandingAnimation() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const isFadeTransition =
      index === 2 || index === images.length - 1; // 3→4 or 6→1

    if (isFadeTransition) {
      setFade(false);

      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, durations[index]);
    } else {
      timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, durations[index]);
    }

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <img
      src={images[index]}
      alt={`Landing ${index + 1}`}
      className={clsx(
        "w-[400px] h-auto object-contain mx-auto transition-opacity duration-500",
        (index === 3 || index === 0) ? (fade ? "opacity-100" : "opacity-0") : "opacity-100"
      )}
    />
  );
}