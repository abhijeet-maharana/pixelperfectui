"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Search, Palette, Code, Rocket } from "lucide-react";

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Discovery",
      description: "We start by understanding your business, goals, target audience, and competitors to create a strategic plan."
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Design",
      description: "Our designers create wireframes and mockups that align with your brand identity and business objectives."
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Development",
      description: "Our developers bring the designs to life with clean, efficient code that ensures optimal performance."
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Launch",
      description: "After thorough testing, we deploy your website and provide training on how to manage your new digital asset."
    }
  ];

  return (
    <section id="process" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our proven process ensures a smooth journey from concept to launch
          </p>
        </div>

        <div 
          ref={ref}
          className="relative"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden md:block" />
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'} mb-8 md:mb-0`}>
                  <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} md:justify-center items-center mb-4`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                <div className="md:w-0 relative flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold z-10">
                    {index + 1}
                  </div>
                </div>
                
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}