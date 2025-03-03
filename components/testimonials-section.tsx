"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      avatar: "SJ",
      content:
        "Working with PixelPerfectUI was a game-changer for our business. Our website traffic increased by 150% within just two months of launch, and our conversion rate doubled!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, GrowthLabs",
      avatar: "MC",
      content:
        "The team delivered a stunning website that perfectly captures our brand identity. The attention to detail and the smooth animations have received countless compliments from our clients.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Marketing Director, EcoSolutions",
      avatar: "PS",
      content:
        "Not only is our new website visually impressive, but it's also incredibly fast and optimized for SEO. We've seen a significant improvement in our search rankings since the launch.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            clients
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?u=${testimonial.name}`}
                      />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
