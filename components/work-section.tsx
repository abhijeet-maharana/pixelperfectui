"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function WorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [sliderPosition, setSliderPosition] = useState(50);
  
  const projects = [
    {
      id: "ecommerce",
      title: "E-Commerce Platform",
      description: "A high-converting online store with seamless checkout experience",
      image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "E-Commerce"
    },
    {
      id: "saas",
      title: "SaaS Dashboard",
      description: "Modern interface for a cloud-based software service",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "SaaS"
    },
    {
      id: "portfolio",
      title: "Creative Portfolio",
      description: "Stunning portfolio for a digital artist with interactive elements",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      category: "Portfolio"
    },
    {
      id: "corporate",
      title: "Corporate Website",
      description: "Professional website for a financial consulting firm",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Corporate"
    }
  ];

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setSliderPosition(x * 100);
  };

  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our recent projects and see the quality we deliver
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-16">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="E-Commerce">E-Commerce</TabsTrigger>
              <TabsTrigger value="SaaS">SaaS</TabsTrigger>
              <TabsTrigger value="Portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="Corporate">Corporate</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div 
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(50px)",
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
              }}
            >
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden group cursor-pointer">
                  <CardContent className="p-0 relative">
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-white text-xl font-bold">{project.title}</h3>
                        <p className="text-white/80 mt-2">{project.description}</p>
                        <span className="text-primary text-sm mt-2">{project.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["E-Commerce", "SaaS", "Portfolio", "Corporate"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects
                  .filter((project) => project.category === category)
                  .map((project) => (
                    <Card key={project.id} className="overflow-hidden group cursor-pointer">
                      <CardContent className="p-0 relative">
                        <div className="relative h-64 md:h-80 w-full overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white text-xl font-bold">{project.title}</h3>
                            <p className="text-white/80 mt-2">{project.description}</p>
                            <span className="text-primary text-sm mt-2">{project.category}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Before & After Transformation</h3>
          
          <div 
            className="relative h-96 w-full max-w-4xl mx-auto overflow-hidden cursor-ew-resize rounded-lg"
            onClick={handleSliderChange}
            onMouseMove={handleSliderChange}
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
                alt="Before redesign"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">Before</span>
              </div>
            </div>
            
            {/* After Image */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
                alt="After redesign"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium">After</span>
              </div>
            </div>
            
            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-1 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}