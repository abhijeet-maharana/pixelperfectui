"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Paintbrush, Zap, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: <Paintbrush className="h-10 w-10 text-primary" />,
      title: "Custom Design, No Templates",
      description: "Your website, tailored to your brand. We create unique designs that reflect your business identity and stand out from the competition."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Speed & SEO Optimized",
      description: "Lightning-fast load times & SEO-friendly architecture. Our websites are built for performance and visibility in search engines."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "High-End Animations",
      description: "GSAP, Three.js & WebGL for stunning effects. We create immersive experiences that engage your visitors and leave a lasting impression."
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We deliver exceptional web experiences that help your business grow
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {services.map((service, index) => (
            <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}