"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiDownload, FiSmartphone } from "react-icons/fi";

export default function DownloadSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="download" className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div 
        ref={ref}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get Started
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Download the Vanam App
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Take your tree-planting journey to the next level with our
              feature-rich mobile application.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-background border border-border rounded-xl p-5">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <FiSmartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Track on the Go</h3>
                <p className="text-muted-foreground">
                  Monitor your trees' health and progress anytime, anywhere with our mobile app.
                </p>
              </div>
              <div className="bg-background border border-border rounded-xl p-5">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <FiDownload className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Offline Capabilities</h3>
                <p className="text-muted-foreground">
                  Take photos and log tree data even without an internet connection.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2 h-14 px-6 rounded-xl" size="lg">
                <Image
                  src="/apple-store.svg"
                  alt="App Store"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download on the</span>
                  <span className="text-base font-semibold">App Store</span>
                </div>
              </Button>
              <Button className="flex items-center gap-2 h-14 px-6 rounded-xl" size="lg">
                <Image
                  src="/google-play.svg"
                  alt="Google Play"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Get it on</span>
                  <span className="text-base font-semibold">Google Play</span>
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            className="relative mx-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-[280px] mx-auto">
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-foreground/10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[9/19] bg-muted">
                {/* App screenshot */}
                <div className="absolute inset-0 bg-background">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">Vanam</span>
                  </div>
                  
                  {/* Mock app content */}
                  <div className="pt-12 px-3 flex flex-col h-full">
                    <div className="flex-1 overflow-hidden">
                      <div className="mt-4 h-32 bg-muted rounded-lg mb-3" />
                      <div className="h-6 w-2/3 bg-muted/70 rounded-full mb-3" />
                      <div className="h-4 w-1/2 bg-muted/50 rounded-full mb-6" />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/30 rounded-lg p-2 aspect-square flex flex-col items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary/20 mb-2" />
                          <div className="h-2 w-10 bg-muted rounded-full" />
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2 aspect-square flex flex-col items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary/20 mb-2" />
                          <div className="h-2 w-10 bg-muted rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-16 border-t border-muted flex items-center justify-around px-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-primary/20 rounded-full" />
                        <div className="h-2 w-10 bg-muted/50 rounded-full mt-1" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-primary/20 rounded-full" />
                        <div className="h-2 w-10 bg-muted/50 rounded-full mt-1" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-primary/20 rounded-full" />
                        <div className="h-2 w-10 bg-muted/50 rounded-full mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR code */}
              <div className="absolute -right-16 top-1/3 bg-white p-3 rounded-xl shadow-lg rotate-6">
                <div className="w-24 h-24 bg-[#000] relative">
                  <div className="absolute inset-2 bg-white grid grid-cols-4 grid-rows-4 gap-[2px]">
                    {/* Mock QR code pattern */}
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                    <div className="col-span-1 row-span-1 bg-transparent" />
                    <div className="col-span-1 row-span-1 bg-[#000]" />
                  </div>
                </div>
                <div className="text-[#000] text-xs font-medium text-center mt-2">
                  Scan to download
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 