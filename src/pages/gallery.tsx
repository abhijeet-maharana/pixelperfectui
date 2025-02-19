"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, Eye } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { designs } from "@/data/designs";

const categories = [
  "All",
  "Dashboard UI",
  "E-commerce",
  "Landing Pages",
  "Mobile Apps",
];
const styles = ["All", "Minimal", "Modern", "Bold", "Playful"];
const industries = [
  "All",
  "SaaS",
  "Retail",
  "Technology",
  "Healthcare",
  "Finance",
];

export default function GalleryPage() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Set the category from URL when component mounts
  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
      setShowFilters(true);
    }
  }, [categoryFromUrl]);

  const filteredDesigns = designs.filter((design) => {
    const matchesCategory =
      selectedCategory === "All" || design.category === selectedCategory;
    const matchesStyle =
      selectedStyle === "All" || design.style === selectedStyle;
    const matchesIndustry =
      selectedIndustry === "All" || design.industry === selectedIndustry;
    const matchesSearch = design.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStyle && matchesIndustry && matchesSearch;
  });

  return (
    <main className="min-h-screen py-6 md:py-12 bg-background">
      <div className="container px-4 mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-6 md:mb-8 space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground block">
                  Category:
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground block">
                  Style:
                </span>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <Badge
                      key={style}
                      variant={selectedStyle === style ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground block">
                  Industry:
                </span>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <Badge
                      key={industry}
                      variant={
                        selectedIndustry === industry ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => setSelectedIndustry(industry)}
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredDesigns.map((design) => (
            <Link to={`/gallery/${design.id}`} key={design.id}>
              <div className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      {design.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                      <Badge variant="secondary">{design.category}</Badge>
                      <Badge variant="secondary">{design.style}</Badge>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Design
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
