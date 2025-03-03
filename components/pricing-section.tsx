"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const plans = [
    {
      name: "Basic Landing Page",
      price: "₹25,000",
      description: "Perfect for small businesses looking to establish an online presence",
      features: [
        "Custom single-page design",
        "Mobile responsive layout",
        "Contact form integration",
        "Basic SEO optimization",
        "Fast loading speed",
        "1 round of revisions"
      ],
      popular: false
    },
    {
      name: "Advanced Website",
      price: "₹50,000+",
      description: "Ideal for growing businesses that need a comprehensive web presence",
      features: [
        "Multi-page custom design",
        "Advanced responsive layouts",
        "Content management system",
        "Advanced SEO optimization",
        "Performance optimization",
        "Interactive elements",
        "3 rounds of revisions",
        "1 month of support"
      ],
      popular: true
    },
    {
      name: "Premium Custom Build",
      price: "₹1,00,000+",
      description: "For businesses that want a unique, high-end web experience",
      features: [
        "Fully custom design & development",
        "Advanced animations (GSAP)",
        "3D elements & WebGL effects",
        "Custom functionality",
        "E-commerce integration (if needed)",
        "Comprehensive SEO strategy",
        "Performance optimization",
        "Unlimited revisions",
        "3 months of support"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
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
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/50'} relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}
                </div>
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="#contact" className="w-full">
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'bg-card hover:bg-card/80 text-foreground border border-border'}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}