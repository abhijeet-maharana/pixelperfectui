"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Layout, Palette, MessageSquare, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGalleryData } from "@/hooks/useGalleryData";

const CATEGORIES_PER_PAGE = 4;

export default function Home() {
  const navigate = useNavigate();
  const { categories, loading, error } = useGalleryData();
  const [visibleCategories, setVisibleCategories] = useState(CATEGORIES_PER_PAGE);

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/gallery?category=${categorySlug}`);
  };

  const handleLoadMore = () => {
    setVisibleCategories(prev => prev + CATEGORIES_PER_PAGE);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            PixelPerfectUI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Curated design references for modern web interfaces. Inspire your
            next project with our handpicked collection.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-12">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search designs..." className="pl-10 h-12" />
            </div>
            <Button size="lg" className="w-full md:w-auto" asChild>
              <Link to="/gallery">Explore Designs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose PixelPerfectUI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Curated Collection"
              description="Hand-picked designs that meet our high standards for aesthetics and usability."
            />
            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="Responsive Layouts"
              description="All designs are fully responsive and tested across multiple devices."
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Modern Aesthetics"
              description="Stay ahead with designs that follow the latest UI/UX trends."
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse Categories
          </h2>
          
          {loading ? (
            // Loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="aspect-[4/3] rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center text-muted-foreground">
              <p>Failed to load categories. Please try again later.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : (
            // Categories grid
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.slice(0, visibleCategories).map((category) => (
                  <CategoryCard
                    key={category.id}
                    image={category.image_url}
                    title={category.name}
                    count={category.count}
                    onClick={() => handleCategoryClick(category.slug)}
                  />
                ))}
              </div>
              
              {/* Load More Button */}
              {visibleCategories < categories.length && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoadMore}
                    className="gap-2"
                  >
                    Load More Categories
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your UI?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get in touch with us to discuss your project needs
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={() => window.open("https://wa.me/1234567890", "_blank")}
          >
            <MessageSquare className="w-5 h-5" />
            Contact via WhatsApp
          </Button>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-background shadow-lg">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function CategoryCard({
  image,
  title,
  count,
  onClick,
}: {
  image: string;
  title: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-white/80">{count} designs</p>
        </div>
      </div>
    </div>
  );
}