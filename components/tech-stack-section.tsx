"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const technologies = [
    {
      name: "Next.js",
      logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
      description: "React framework for production"
    },
    {
      name: "React",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      description: "JavaScript library for user interfaces"
    },
    {
      name: "Tailwind CSS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      description: "Utility-first CSS framework"
    },
    {
      name: "GSAP",
      logo: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
      description: "Professional-grade animation library"
    },
    {
      name: "Three.js",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg",
      description: "3D graphics library for the web"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tech Stack</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We use cutting-edge technologies to build fast, scalable, and beautiful websites
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {technologies.map((tech, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative h-16 w-16 mb-4">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-medium mb-1">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}