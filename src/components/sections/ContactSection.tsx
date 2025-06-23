"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiMail, FiMapPin, FiPhone, FiInstagram, FiTwitter, FiYoutube, FiLinkedin, FiSend, FiArrowRight } from "react-icons/fi";
import { FaLeaf, FaTree } from "react-icons/fa";
import Image from "next/image";
import { FadeIn, Parallax, ScrollZoom, FloatingElement, RotatingElement } from "@/components/ui/motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  }

  const contactInfo = [
    {
      icon: <FiMail className="w-5 h-5" />,
      title: "Email Us",
      details: "support@vanam.eco",
      link: "mailto:support@vanam.eco",
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      title: "Call Us",
      details: "+91 (800) 123-4567",
      link: "tel:+918001234567",
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Visit Us",
      details: "123 Green Avenue, Bengaluru, India",
      link: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: <FiInstagram className="w-5 h-5" />,
      href: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: <FiTwitter className="w-5 h-5" />,
      href: "https://twitter.com",
    },
    {
      name: "YouTube",
      icon: <FiYoutube className="w-5 h-5" />,
      href: "https://youtube.com",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
    },
  ];

  return (
    <section id="contact" className="py-28 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-[5%] text-primary/10 z-10 leaf-decoration">
        <RotatingElement amplitude={5} duration={20}>
          <FaLeaf size={60} />
        </RotatingElement>
      </div>
      <div className="absolute bottom-40 right-[5%] text-primary/10 z-10 leaf-decoration">
        <RotatingElement amplitude={7} duration={25} delay={2}>
          <FaLeaf size={50} />
        </RotatingElement>
      </div>
      <div className="absolute top-1/3 right-[15%] text-primary/5 z-10 leaf-decoration">
        <RotatingElement amplitude={4} duration={30}>
          <FaTree size={80} />
        </RotatingElement>
      </div>
      
      {/* Background Image with Parallax Effect */}
      <Parallax speed={0.15} direction="down" className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90 z-10"></div>
        <Image 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
          alt="Forest background" 
          fill 
          priority
          className="object-cover object-center"
          style={{ filter: 'brightness(0.8) contrast(1.2)' }}
        />
      </Parallax>
      
      <div className="container mx-auto px-4 relative z-20">
        <ScrollZoom scale={0.9} duration={0.8}>
          <div className="flex flex-col items-center text-center mb-20">
            <FadeIn direction="up" duration={0.5}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/40 text-primary text-sm font-medium mb-6 border border-primary/50 shadow-sm backdrop-blur-md">
                Contact Us
              </div>
            </FadeIn>
            
            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-md">
                Get in Touch with <span className="text-primary">Vanam</span>
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="mt-4 text-xl text-white/90 max-w-3xl mx-auto drop-shadow-sm">
                Have questions about our platform or want to partner with us?
                Reach out and we'll get back to you soon.
              </p>
            </FadeIn>
          </div>
        </ScrollZoom>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Information */}
            <FadeIn direction="left" duration={0.7} distance={40} className="lg:col-span-4">
              <div className="h-full bg-white/25 backdrop-blur-md p-8 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-semibold mb-8 text-white">Contact Information</h3>
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <FadeIn key={index} direction="up" duration={0.5} delay={0.2 + index * 0.1}>
                      <a
                        href={item.link}
                        className="flex items-start gap-5 group hover:translate-x-1 transition-transform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FloatingElement 
                          amplitude={4} 
                          duration={4 + index} 
                          className="w-12 h-12 rounded-full bg-primary/40 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-md group-hover:shadow-lg"
                        >
                          {item.icon}
                        </FloatingElement>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">{item.title}</h4>
                          <p className="text-white/80 group-hover:text-white transition-colors">
                            {item.details}
                          </p>
                          <div className="mt-1 text-primary flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Connect</span>
                            <FiArrowRight className="ml-1 w-3 h-3" />
                          </div>
                        </div>
                      </a>
                    </FadeIn>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                  <FadeIn direction="up" duration={0.5} delay={0.5}>
                    <h4 className="text-lg font-medium text-white mb-6">Follow Us</h4>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <FloatingElement 
                          key={index}
                          amplitude={5} 
                          duration={3} 
                          delay={index * 0.2}
                          direction="vertical"
                        >
                          <a
                            href={social.href}
                            className="w-12 h-12 rounded-full bg-white/25 text-white hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                          >
                            {social.icon}
                          </a>
                        </FloatingElement>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="right" duration={0.7} distance={40} delay={0.1} className="lg:col-span-8">
              <div className="bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-semibold mb-8 text-white">Send a Message</h3>
                {isSuccess ? (
                  <div className="bg-green-500/30 text-green-100 rounded-lg p-6 flex items-center gap-4 backdrop-blur-sm border border-green-500/40 shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-green-500/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <span className="text-lg">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </span>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FadeIn direction="up" duration={0.5} delay={0.2}>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your name" 
                                    {...field} 
                                    className="form-shine bg-white/20 border-white/40 text-white placeholder:text-white/70 transition-all focus:ring-2 focus:ring-primary/60 focus:border-primary/80" 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </FadeIn>
                        
                        <FadeIn direction="up" duration={0.5} delay={0.3}>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your email" 
                                    {...field} 
                                    className="form-shine bg-white/20 border-white/40 text-white placeholder:text-white/70 transition-all focus:ring-2 focus:ring-primary/60 focus:border-primary/80" 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </FadeIn>
                      </div>
                      
                      <FadeIn direction="up" duration={0.5} delay={0.4}>
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Subject</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Subject of your message" 
                                  {...field} 
                                  className="form-shine bg-white/20 border-white/40 text-white placeholder:text-white/70 transition-all focus:ring-2 focus:ring-primary/60 focus:border-primary/80" 
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                      </FadeIn>
                      
                      <FadeIn direction="up" duration={0.5} delay={0.5}>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Your message"
                                  className="form-shine min-h-40 resize-y bg-white/20 border-white/40 text-white placeholder:text-white/70 transition-all focus:ring-2 focus:ring-primary/60 focus:border-primary/80"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                      </FadeIn>
                      
                      <FadeIn direction="up" duration={0.5} delay={0.6}>
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 group transition-all"
                          disabled={isSubmitting}
                          size="lg"
                        >
                          <span className="flex items-center gap-2">
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </FadeIn>
                    </form>
                  </Form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
} 