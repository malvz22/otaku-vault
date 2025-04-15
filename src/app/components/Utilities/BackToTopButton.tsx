"use client";

import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      <button
        className={`fixed bottom-6 end-6 z-50 rounded-full bg-[#1E90FF] text-white hover:text-[#1E90FF] hover:bg-white shadow-lg p-3 justify-center items-center aspect-square transition-all duration-700 ${
          isVisible ? "block" : "hidden"
        }`}
        onClick={scrollToTop}
      >
        <IoArrowUp size={24} />
      </button>
    </div>
  );
};

export default BackToTopButton;
