"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FiMapPin, FiAward, FiActivity, FiGift, FiUsers, FiBriefcase } from "react-icons/fi";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import Image from "next/image";
import { FadeIn, Parallax, ScrollZoom, FloatingElement, RotatingElement } from "@/components/ui/motion";

const features = [
  {
    title: "Plant a Tree",
    description: "Plant and geo-tag your trees to track their location and growth progress over time.",
    icon: <FiMapPin className="h-10 w-10" />,
    color: "bg-primary/10 text-primary",
    image: "https://images.unsplash.com/photo-1503785640985-f62e3aeee448?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    alt: "Person planting a young tree"
  },
  {
    title: "AI Disease Detection",
    description: "Our AI analyzes photos to identify potential tree diseases and provides treatment recommendations.",
    icon: <FiActivity className="h-10 w-10" />,
    color: "bg-accent/10 text-accent",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "AI scanning a plant leaf for disease"
  },
  {
    title: "Rewards & Badges",
    description: "Earn points and unlock achievement badges as your trees grow healthier and stronger.",
    icon: <FiAward className="h-10 w-10" />,
    color: "bg-primary/10 text-primary",
    image: "https://images.pexels.com/photos/6532372/pexels-photo-6532372.jpeg",
    alt: "Golden trophy representing achievements and rewards"
  },
  {
    title: "Birthday Trees",
    description: "Plant a special tree to mark birthdays and other significant life events, creating lasting memories.",
    icon: <FiGift className="h-10 w-10" />,
    color: "bg-accent/10 text-accent",
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    alt: "Small tree with decorative ribbon as a gift"
  },
  {
    title: "Community Connection",
    description: "Connect with like-minded individuals in your area and participate in local planting events.",
    icon: <FiUsers className="h-10 w-10" />,
    color: "bg-primary/10 text-primary",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Diverse group of people working together in community"
  },
  {
    title: "CSR/Sponsorship",
    description: "Companies and NGOs can sponsor tree-planting initiatives and track their environmental impact.",
    icon: <FiBriefcase className="h-10 w-10" />,
    color: "bg-accent/10 text-accent",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Corporate social responsibility tree planting event"
  },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background gradient and decorative elements */}
      <Parallax speed={0.2} direction="down" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 -z-10" />
      </Parallax>
      
      {/* Decorative leaf elements */}
      <FloatingElement direction="both" amplitude={15} duration={8.5} className="absolute top-40 right-10 text-primary/10">
        <FaLeaf size={40} />
      </FloatingElement>
      
      <FloatingElement direction="both" amplitude={12} duration={9.5} delay={1.5} className="absolute bottom-40 left-10 text-primary/10">
        <FaLeaf size={30} />
      </FloatingElement>
      
      <RotatingElement amplitude={7} duration={22} delay={1} className="absolute top-1/3 left-1/5 text-primary/5">
        <FaSeedling size={50} />
      </RotatingElement>
      
      <div className="container mx-auto px-4">
        {/* Enhanced Features Header */}
        <ScrollZoom scale={0.92} duration={0.8} className="mb-16">
          <div className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
            <div className="relative">
              {/* Background image with gradient overlay */}
              <div className="absolute inset-0 z-0 rounded-2xl shadow-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2113&q=80"
                  alt="Trees growing in a forest"
                  fill
                  priority
                  className="object-cover object-center"
                  style={{ opacity: 0.25 }}
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/10 to-primary/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/70" />
              </div>

              {/* Content over the image */}
              <div className="relative z-10 pt-14 pb-12 px-8 text-center bg-white/10">
                <FadeIn direction="up" duration={0.6}>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 border border-primary/30 shadow-sm">
                    <span className="drop-shadow-sm">Key Features</span>
                  </div>
                </FadeIn>
                
                <FadeIn direction="up" duration={0.7} delay={0.1}>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground drop-shadow-sm">
                    Everything You Need to <span className="text-primary">Grow Your Impact</span>
                  </h2>
                </FadeIn>
                
                <FadeIn direction="up" duration={0.7} delay={0.2}>
                  <p className="mt-4 text-xl text-foreground/90 max-w-3xl mx-auto drop-shadow-sm">
                    Vanam combines technology, community, and sustainability to help
                    you make a measurable difference in fighting climate change.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </ScrollZoom>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {features.map((feature, index) => (
            <FadeIn 
              key={index} 
              direction={index % 2 === 0 ? "left" : "right"} 
              duration={0.6} 
              delay={0.1 * index}
              distance={40}
            >
              <Card className="h-full border-2 border-muted hover:border-primary/20 transition-colors overflow-hidden group">
                <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 top-0 left-0" />
                <CardHeader>
                  <FloatingElement
                    direction="vertical" 
                    amplitude={5} 
                    duration={3 + index * 0.5}
                    delay={index * 0.2}
                    className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                  >
                    {feature.icon}
                  </FloatingElement>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 w-full rounded-lg overflow-hidden relative group-hover:shadow-md transition-all">
                    <Image 
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
} 