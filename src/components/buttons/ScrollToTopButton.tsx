"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY >= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-white w-12 h-12 rounded-full shadow-[0px_0px_50px_0px_rgba(0,_0,_0,_0.35)] transition-shadow"
        >
          <img src="/icons/up.svg" alt="scroll to top" className="w-12 h-12" />
        </button>
      )}
    </>
  );
}
