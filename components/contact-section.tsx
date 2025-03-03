"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">
              Ready to start your project? Fill out the form below for a free consultation
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business">Business Type</Label>
                  <Input id="business" placeholder="E.g., E-commerce, SaaS, Agency" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website-type">What kind of website do you need?</Label>
                  <Select>
                    <SelectTrigger id="website-type">
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing-page">Landing Page</SelectItem>
                      <SelectItem value="multi-page">Multi-page Website</SelectItem>
                      <SelectItem value="e-commerce">E-commerce Store</SelectItem>
                      <SelectItem value="web-app">Web Application</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Your Budget</Label>
                  <Select>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25k">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50k">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="100k">₹1,00,000+</SelectItem>
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your project and requirements" 
                    rows={5}
                    required
                  />
                </div>
              </div>
              
              <Button className="w-full mt-8" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get a Free Consultation"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}