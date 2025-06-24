"use client";

import { ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function FadeIn({
  children,
  className = "",
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  // Set the direction variants
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  overflow?: boolean;
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  overflow = false,
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Adjust the parallax factor based on direction
  const factor = direction === "down" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, factor * speed * 100]);
  
  // Create a smooth spring effect
  const springY = useSpring(y, { damping: 15, stiffness: 80 });

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={`${className} ${overflow ? "" : "overflow-hidden"}`}
    >
      {children}
    </motion.div>
  );
}

interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
  delay?: number;
}

export function ScrollZoom({
  children,
  className = "",
  scale = 0.95,
  duration = 0.5,
  delay = 0,
}: ScrollZoomProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { scale, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration,
        delay
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  direction?: "horizontal" | "vertical" | "both";
}

export function FloatingElement({
  children,
  className = "",
  amplitude = 10,
  duration = 4,
  delay = 0,
  direction = "vertical",
}: FloatingElementProps) {
  const animationProps = {
    horizontal: {
      x: [-amplitude, amplitude, -amplitude],
      transition: {
        repeat: Infinity,
        duration,
        delay
      },
    },
    vertical: {
      y: [-amplitude, amplitude, -amplitude],
      transition: {
        repeat: Infinity,
        duration,
        delay
      },
    },
    both: {
      y: [-amplitude, amplitude, -amplitude],
      x: [amplitude, -amplitude, amplitude],
      transition: {
        repeat: Infinity,
        duration,
        delay
      },
    },
  };

  return (
    <motion.div
      animate={animationProps[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RotatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function RotatingElement({
  children,
  className = "",
  amplitude = 10,
  duration = 15,
  delay = 0,
}: RotatingElementProps) {
  return (
    <motion.div
      animate={{
        rotate: [0, amplitude, 0, -amplitude, 0],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StickyScroll({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}