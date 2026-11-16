"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface AceHeadingRevealProps {
  text?: string;
  goldHex?: string;
}

const CREAM = "#f7f2e7";

export default function AceSlantedShutterReveal({
  text = "How It Works",
  goldHex = "#d4af37",
}: AceHeadingRevealProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  if (!mounted || reduce) {
    return (
      <h1 className="text-4xl font-extrabold tracking-wider uppercase md:text-6xl" style={{ color: CREAM }}>
        {text}
      </h1>
    );
  }

  return (
    <div
      className="relative inline-flex items-center justify-center overflow-visible"
      style={{ padding: "0 24px" }}
    >
      {/* Masked Heading Layer */}
      <motion.div
        initial={{
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        }}
        whileInView={{
          clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.75,
          delay: 0.22,
          ease: easeCurve,
        }}
        className="px-4"
      >
        <h1 className="text-4xl font-extrabold tracking-wider uppercase md:text-6xl" style={{ color: CREAM }}>
          {text}
        </h1>
      </motion.div>

      {/* Left Splitting Gold Line */}
      <motion.div
        initial={{ left: "50%", scaleY: 0, opacity: 0 }}
        whileInView={{
          left: ["50%", "50%", "0%"],
          scaleY: [0, 1, 1],
          opacity: [0, 1, 0.6],
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.9,
          times: [0, 0.22, 1],
          ease: easeCurve,
        }}
        style={{
          backgroundColor: "#FFFDF5",
          boxShadow: `0 0 8px #FFFDF5, 0 0 12px ${goldHex}99, 0 0 20px ${goldHex}55`,
        }}
        className="pointer-events-none absolute top-[-8%] h-[116%] w-[3px] -translate-x-1/2 -skew-x-[15deg]"
      />

      {/* Right Splitting Gold Line */}
      <motion.div
        initial={{ left: "50%", scaleY: 0, opacity: 0 }}
        whileInView={{
          left: ["50%", "50%", "100%"],
          scaleY: [0, 1, 1],
          opacity: [0, 1, 0.6],
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.9,
          times: [0, 0.22, 1],
          ease: easeCurve,
        }}
        style={{
          backgroundColor: "#FFFDF5",
          boxShadow: `0 0 8px #FFFDF5, 0 0 12px ${goldHex}99, 0 0 20px ${goldHex}55`,
        }}
        className="pointer-events-none absolute top-[-8%] h-[116%] w-[3px] -translate-x-1/2 -skew-x-[15deg]"
      />
    </div>
  );
}