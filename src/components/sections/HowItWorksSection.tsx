"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn, Parallax, ScrollZoom, FloatingElement } from "@/components/ui/motion";

const steps = [
  {
    number: "01",
    title: "Sign up or login",
    description:
      "Create your account in seconds or log in with your existing credentials to access your green dashboard.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Take a picture of your tree",
    description:
      "Use your smartphone camera to snap a photo of your newly planted tree or an existing one you want to track.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Our AI assesses its health",
    description:
      "Vanam's advanced AI analyzes your tree's condition, identifies species, and provides personalized care recommendations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Gather rewards and badges",
    description:
      "Earn points for maintaining healthy trees and unlock special offers from our eco-friendly partners and sponsors.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Repeat and grow!",
    description:
      "Continue tracking your trees, planting new ones, and expanding your positive impact on the environment over time.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // This will control the path drawing animation
  const pathProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="how-it-works" className="py-20 bg-muted/30 overflow-hidden">
      <Parallax speed={0.1} className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 -z-10" />
      
      <div className="container mx-auto px-4">
        <ScrollZoom scale={0.92} duration={0.8}>
          <div className="flex flex-col items-center text-center mb-16">
            <FadeIn direction="up" duration={0.5}>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                How It Works
              </div>
            </FadeIn>
            
            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Simple Steps to Make a Difference
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
                Follow these easy steps to start tracking your trees and contributing
                to a greener planet with Vanam.
              </p>
            </FadeIn>
          </div>
        </ScrollZoom>

        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto mt-20"
        >
          {/* Path between steps (hidden on mobile) */}
          <div className="absolute top-0 left-1/2 h-full w-1 bg-muted hidden md:block transform -translate-x-1/2 z-0">
            <motion.div 
              className="h-full bg-primary w-full origin-top"
              style={{ scaleY: pathProgress }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative z-10 space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <FadeIn 
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                duration={0.7}
                delay={index * 0.1}
                distance={40}
                className={`flex flex-col ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="flex-1">
                  <div className="bg-background rounded-2xl p-6 border border-border shadow-sm relative hover:shadow-md transition-shadow duration-300">
                    <Badge variant="outline" className="absolute -top-3 left-4 bg-background">
                      {step.number}
                    </Badge>
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <FloatingElement 
                        direction="vertical" 
                        amplitude={4} 
                        duration={4} 
                        delay={index * 0.2}
                        className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
                      >
                        {step.icon}
                      </FloatingElement>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Center node for timeline (visible only on md and up) */}
                <motion.div 
                  className="hidden md:flex w-12 h-12 rounded-full bg-primary text-primary-foreground items-center justify-center relative z-20"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.1 + index * 0.2 
                  }}
                >
                  {step.number}
                </motion.div>
                
                <div className="flex-1 hidden md:block" />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 