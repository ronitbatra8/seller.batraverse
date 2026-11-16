"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  text?: string;
  className?: string;
};

const GOLD = "#d4af37";
const GOLD_LIGHT = "#f0d98c";
const GOLD_PALE = "#f8e9bd";
const WHITE_GOLD = "#FFFDF5";
const CREAM = "#f7f2e7";

export default function AceGoldHeadingReveal({ text = "How It Works", className = "" }: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reduce) {
    return (
      <h1 className={`font-display text-5xl font-bold leading-tight sm:text-6xl ${className}`} style={{ color: CREAM }}>
        {text}
      </h1>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Step 1: slanted gold laser beams that ignite and split apart */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
        <motion.div
          initial={{ scaleY: 0, x: 0, opacity: 0 }}
          animate={{ scaleY: 1, x: "-46vw", opacity: [0, 1, 1, 0.35] }}
          transition={{
            scaleY: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.9, delay: 0.1, times: [0, 0.15, 0.7, 1] },
          }}
          className="absolute left-1/2 top-1/2 h-[2px] w-[40vw] origin-center -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: "rotate(-15deg)",
            background: `linear-gradient(90deg, transparent, ${GOLD_LIGHT}, ${WHITE_GOLD}, ${GOLD_LIGHT}, transparent)`,
            boxShadow: `0 0 14px 2px ${GOLD}, 0 0 30px 4px ${GOLD}55`,
          }}
        />
        <motion.div
          initial={{ scaleY: 0, x: 0, opacity: 0 }}
          animate={{ scaleY: 1, x: "46vw", opacity: [0, 1, 1, 0.35] }}
          transition={{
            scaleY: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.9, delay: 0.1, times: [0, 0.15, 0.7, 1] },
          }}
          className="absolute left-1/2 top-1/2 h-[2px] w-[40vw] origin-center -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: "rotate(-15deg)",
            background: `linear-gradient(90deg, transparent, ${GOLD_LIGHT}, ${WHITE_GOLD}, ${GOLD_LIGHT}, transparent)`,
            boxShadow: `0 0 14px 2px ${GOLD}, 0 0 30px 4px ${GOLD}55`,
          }}
        />
      </div>

      {/* Single SVG text: wireframe stroke layer + solid fill layer, perfectly aligned */}
      <svg
        className="pointer-events-none block h-auto w-full overflow-visible"
        viewBox="0 0 600 120"
        preserveAspectRatio="xMidYMid meet"
        aria-label={text}
        role="img"
      >
        {/* Wireframe stroke that draws itself, then dissolves */}
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="72"
          fontWeight="700"
          fontFamily="var(--font-display), Georgia, serif"
          fill="none"
          stroke={GOLD_LIGHT}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2000"
          initial={{ strokeDashoffset: 2000, opacity: 1 }}
          animate={{ strokeDashoffset: 0, opacity: [1, 1, 0] }}
          transition={{
            strokeDashoffset: { duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3, delay: 0.95, ease: "easeOut" },
          }}
          style={{ filter: `drop-shadow(0 0 6px ${GOLD})` }}
        >
          {text}
        </motion.text>

        {/* Solid fill unmasked via clip-path */}
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="72"
          fontWeight="700"
          fontFamily="var(--font-display), Georgia, serif"
          fill={CREAM}
          stroke="none"
          initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
          transition={{
            clipPath: { duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2, delay: 0.2 },
          }}
          style={{ filter: `drop-shadow(0 0 24px ${GOLD}33)` }}
        >
          {text}
        </motion.text>

        {/* Rapid diagonal white-gold shimmer sweep */}
        <motion.rect
          x="-30%"
          y="0"
          width="30%"
          height="100%"
          fill={`url(#shimmerGrad)`}
          initial={{ x: "-30%" }}
          animate={{ x: "130%" }}
          transition={{ duration: 0.55, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: 0.85 }}
        />
        <defs>
          <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={WHITE_GOLD} stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Step 3: outer lines settle as slanted accent brackets (left & right) */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -left-6 top-1/2 h-[1.5px] w-10 origin-left -translate-y-1/2"
        style={{
          transform: "rotate(-15deg)",
          background: `linear-gradient(90deg, ${GOLD}, transparent)`,
          boxShadow: `0 0 8px ${GOLD}88`,
        }}
        aria-hidden
      />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-6 top-1/2 h-[1.5px] w-10 origin-right -translate-y-1/2"
        style={{
          transform: "rotate(-15deg)",
          background: `linear-gradient(90deg, transparent, ${GOLD})`,
          boxShadow: `0 0 8px ${GOLD}88`,
        }}
        aria-hidden
      />
    </div>
  );
}