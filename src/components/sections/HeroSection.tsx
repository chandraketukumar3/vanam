"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const backgroundVariants: Variants = {
    hidden: { scale: 1.2, opacity: 1 },
    visible: { 
      scale: 1, 
      opacity: 5,
      transition: { 
        duration: 2.5,
        ease: "easeOut" as const
      }
    }
  };

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        ease: "easeOut" as const
      }
    }
  };

  const buttonContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.5
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 2
      }
    }
  };

  const numberBubbleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
        delay: 2 + (custom * 0.15)
      }
    })
  };

  return (
    <section className="relative min-h-[91vh] flex items-center overflow-hidden pt-16 pb-20 top-0">
      {/* Background image with animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={backgroundVariants}
          className="absolute inset-0"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70"
            animate={{ 
              opacity: [0.8, 0.7, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=100"
              alt="Dramatic misty forest landscape"
              fill
              priority
              className="object-cover"
              style={{ opacity: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        {/* Content with animations */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl relative z-10"
        >
          <motion.h1 
            variants={headingVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <motion.span 
              className="text-primary inline-block font-bold"
            >
              Vanam
            </motion.span>
            <motion.span 
              variants={headingVariants}
              className="inline-block text-white"
            >
              {" "}- Plant More, Grow More
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={headingVariants}
            className="mt-6 text-xl text-primary md:text-2xl md:leading-8"
          >
            Turn every sapling into a green future with Vanam.
          </motion.p>
          
          <motion.div 
            variants={buttonContainerVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button size="lg" className="rounded-full relative overflow-hidden group">
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut" as const
                  }}
                >
                  Get Started
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1.5, 
                    opacity: 0,
                    transition: { duration: 0.8 }
                  }}
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ 
                    x: [0, 5, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut" as const
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button variant="outline" size="lg" className="rounded-full group">
                <motion.span
                  animate={{ 
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Download App
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1.5, 
                    opacity: 0,
                    transition: { duration: 0.8 }
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={statsVariants}
            className="mt-10 flex items-center gap-6"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((num) => (
                <motion.div
                  key={num}
                  custom={num}
                  variants={numberBubbleVariants}
                  className={`w-10 h-10 rounded-full border-2 border-background ${
                    num % 2 === 0 ? "bg-primary/80" : "bg-accent/80"
                  } flex items-center justify-center text-xs font-medium text-white relative`}
                  whileHover={{ 
                    scale: 1.2,
                    zIndex: 10,
                    transition: { type: "spring" as const, stiffness: 300 }
                  }}
                >
                  <motion.span
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: num * 0.5
                    }}
                  >
                    {num}
                  </motion.span>
                </motion.div>
              ))}
            </div>
            <motion.p 
              className="text-sm text-white"
              animate={{ 
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.span 
                className="font-medium text-foreground"
                animate={{ 
                  color: ["#ffffff", "#f0f0f0", "#ffffff"],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                2,500+
              </motion.span> trees
              planted this week
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 