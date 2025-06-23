"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { FiStar } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Environmental Activist",
    quote:
      "Vanam has completely transformed how I track the trees I plant. The AI health assessment is incredibly accurate and has helped me save several saplings that showed early signs of disease.",
    avatar: "/testimonials/ananya.jpg",
    rating: 5,
    type: "user",
  },
  {
    name: "Green Earth Foundation",
    role: "NGO Partner",
    quote:
      "As an organization committed to reforestation, Vanam has provided us with invaluable data on our tree-planting initiatives. The geolocation feature ensures accountability and transparency.",
    avatar: "/testimonials/greenearth.jpg",
    rating: 5,
    type: "organization",
  },
  {
    name: "Michael Chen",
    role: "Urban Gardener",
    quote:
      "The gamification aspect of Vanam keeps me motivated. I've turned my urban garden into a mini-forest, and the badges I've earned along the way make the journey even more rewarding.",
    avatar: "/testimonials/michael.jpg",
    rating: 4,
    type: "user",
  },
  {
    name: "EcoTech Industries",
    role: "Corporate Sponsor",
    quote:
      "Vanam has revolutionized our CSR initiatives. We can now easily track the impact of our tree-planting programs and share verifiable results with our stakeholders.",
    avatar: "/testimonials/ecotech.jpg",
    rating: 5,
    type: "organization",
  },
  {
    name: "Priya Patel",
    role: "School Teacher",
    quote:
      "I use Vanam with my students for our school's environmental projects. The kids love watching their trees grow and compete to earn badges. It's education and environmental action combined!",
    avatar: "/testimonials/priya.jpg",
    rating: 5,
    type: "user",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  
  // Setup autoplay effect
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      if (!isPaused) {
        api.scrollNext();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [api, isPaused]);
  
  // Update active index when carousel changes
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="testimonials" className="py-20 relative">
      {/* Green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/5" />
      
      {/* Decorative elements */}
      <div className="absolute left-5 top-20">
        <FaLeaf className="text-primary/10 h-10 w-10 animate-leaf-float" />
      </div>
      <div className="absolute right-5 bottom-20">
        <FaLeaf className="text-primary/10 h-10 w-10 animate-leaf-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute left-[20%] top-[30%]">
        <FaLeaf className="text-primary/10 h-6 w-6 animate-leaf-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute right-[30%] top-[60%]">
        <FaLeaf className="text-primary/10 h-7 w-7 animate-leaf-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="absolute left-[80%] top-[40%]">
        <FaLeaf className="text-primary/10 h-8 w-8 animate-leaf-float" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4 shadow-sm border border-primary/20">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by Nature Enthusiasts and Organizations
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
            Hear from our community of individuals, schools, NGOs, and corporate
            partners who are making a difference with Vanam.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="border border-primary/20 h-full shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted shadow-sm">
                              {testimonial.avatar ? (
                                <Image
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-lg font-medium">
                                  {testimonial.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? "fill-primary text-primary"
                                    : "fill-none text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <blockquote className="flex-grow">
                          <p className="text-muted-foreground italic">
                            "{testimonial.quote}"
                          </p>
                        </blockquote>
                        <div className="mt-4 pt-4 border-t border-primary/20">
                          <span className="text-xs text-muted-foreground">
                            {testimonial.type === "user"
                              ? "Verified Vanam User"
                              : "Verified Partner Organization"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative static translate-y-0 mr-2 bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary" />
              <div className="flex gap-1 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index
                        ? "bg-primary w-4"
                        : "bg-primary/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext className="relative static translate-y-0 ml-2 bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
} 