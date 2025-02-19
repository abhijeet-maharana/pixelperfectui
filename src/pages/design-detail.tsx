"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, MessageSquare, ArrowLeft } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { designs } from "@/data/designs";

export default function DesignDetailClient() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const design = designs.find((d) => d.id === Number(params.id));

  // If design is not found, redirect to gallery
  if (!design) {
    navigate("/gallery");
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the "${design.title}" design (ID: ${design.id}). Can you provide more information?`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: design.title,
          text: design.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/gallery"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Gallery</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 md:h-10 md:w-10"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    isLiked ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 md:h-10 md:w-10"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                className="gap-2 hidden md:inline-flex"
              >
                <MessageSquare className="w-4 h-4" />
                Get This Design
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Design Content */}
      <div className="container px-4 mx-auto py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Design Info */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              {design.title}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
              <Badge variant="secondary">{design.category}</Badge>
              <Badge variant="secondary">{design.style}</Badge>
              <Badge variant="secondary">{design.industry}</Badge>
            </div>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
              {design.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {design.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-muted-foreground">
              <span>By {design.designer}</span>
              <span className="hidden md:inline">•</span>
              <span>{new Date(design.created).toLocaleDateString()}</span>
              <span className="hidden md:inline">•</span>
              <span>{design.likes} likes</span>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6 md:space-y-8">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover"
              />
            </div>

            {design.additionalImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary"
              >
                <img
                  src={image}
                  alt={`${design.title} - View ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Fixed Button */}
      <div className="fixed bottom-6 right-4 left-4 md:hidden">
        <Button
          onClick={handleWhatsAppClick}
          className="w-full gap-2 shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          Get This Design
        </Button>
      </div>
    </main>
  );
}
