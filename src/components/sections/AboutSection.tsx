"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaLeaf, FaSeedling, FaTree } from "react-icons/fa";
import { FadeIn, Parallax, ScrollZoom, FloatingElement, RotatingElement } from "@/components/ui/motion";

const impactStats = [
  {
    title: "1M+",
    description: "Trees planted and tracked",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c6.5-7 9-12 9-16a9 9 0 1 0-18 0c0 4 2.5 9 9 16z" />
        <circle cx="12" cy="6" r="1" />
      </svg>
    ),
  },
  {
    title: "10K+",
    description: "Active users globally",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "5K+",
    description: "Tons of CO₂ offset yearly",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12h2m8-12v2m8 8h2m-10 8v2m-8-8a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient and decorative elements */}
      <Parallax speed={0.3} direction="down" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-primary/5 to-primary/10 -z-10" />
      </Parallax>
      
      {/* Decorative leaf elements */}
      <FloatingElement direction="both" amplitude={15} duration={8} className="absolute top-20 left-10 text-primary/10">
        <FaLeaf size={40} />
      </FloatingElement>
      
      <FloatingElement direction="both" amplitude={15} duration={10} delay={1} className="absolute bottom-20 right-10 text-primary/10">
        <FaLeaf size={40} />
      </FloatingElement>
      
      <RotatingElement amplitude={5} duration={20} className="absolute top-1/2 right-1/4 text-primary/5">
        <FaTree size={60} />
      </RotatingElement>
      
      <RotatingElement amplitude={8} duration={25} delay={2} className="absolute bottom-1/3 left-1/4 text-primary/5">
        <FaSeedling size={50} />
      </RotatingElement>
      
      <div className="container mx-auto px-4">
        {/* Enhanced Mission Header */}
        <ScrollZoom scale={0.9} duration={0.8} className="flex flex-col items-center text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Background image with proper Next.js Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
                alt="Hands planting a young tree seedling"
                fill
                priority
                className="object-cover object-center"
                style={{ opacity: 0.35 }}
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/10 to-primary/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80" />
            </div>
            
            {/* Content over the image */}
            <div className="relative z-10 pt-16 pb-14 px-8 bg-white/10">
              <FadeIn direction="up" duration={0.6}>
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 border border-primary/30 shadow-sm">
                  <span className="drop-shadow-sm">Our Mission</span>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" duration={0.7} delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground drop-shadow-sm">
                  Creating a <span className="text-primary">Greener Future</span> Together
                </h2>
              </FadeIn>
              
              <FadeIn direction="up" duration={0.7} delay={0.2}>
                <p className="mt-4 text-xl text-foreground/90 max-w-3xl mx-auto drop-shadow-sm">
                  At Vanam, we believe that tracking and monitoring tree growth is key to 
                  fighting climate change and preserving our planet for future generations.
                </p>
              </FadeIn>
            </div>
          </motion.div>
        </ScrollZoom>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image/video part */}
          <FadeIn direction="left" duration={0.8} distance={50}>
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
              {/* Replace video with image since video file is missing */}
              <Image
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Forest conservation and tree planting initiative"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/80 backdrop-blur-sm rounded-lg">
                <p className="text-sm font-medium">
                  Every tree we plant is geotagged and monitored for its entire lifetime.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Content part */}
          <div>
            <FadeIn direction="right" duration={0.8} distance={50} delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  Environmental Impact Through Technology
                </h3>
                <p className="text-muted-foreground">
                  Climate change is a global crisis, but the solution starts with local action. 
                  Vanam combines cutting-edge technology with environmental stewardship to 
                  create measurable impact.
                </p>
                
                {/* Added satellite monitoring image */}
                <div className="relative rounded-xl overflow-hidden aspect-video shadow-lg mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
                    alt="Satellite monitoring technology for forest tracking"
                    width={600}
                    height={340}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/80 backdrop-blur-sm">
                    <p className="text-xs font-medium text-center">
                      Our satellite monitoring system tracks forest health and growth in real-time
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  Our AI-powered tree tracking system allows users to monitor their trees' health 
                  and growth, creating a direct connection between people and nature. By gamifying 
                  reforestation, we're making environmental conservation accessible and engaging.
                </p>

                <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {impactStats.map((stat, index) => (
                    <FadeIn 
                      key={stat.title} 
                      direction="up" 
                      duration={0.5} 
                      delay={0.3 + index * 0.15}
                    >
                      <Card className="transform transition-all hover:scale-105 duration-300">
                        <CardContent className="pt-6 text-center">
                          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            {stat.icon}
                          </div>
                          <h4 className="text-2xl font-bold">{stat.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {stat.description}
                          </p>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
} 