"use client";

import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, Eye, Loader2 } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useGalleryData } from "@/hooks/useGalleryData";

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    categories, 
    styles, 
    industries, 
    designs, 
    loading, 
    error,
    hasMore,
    loadMore 
  } = useGalleryData();

  // Get filter values from URL params
  const categoryParam = searchParams.get("category") || "All";
  const styleParam = searchParams.get("style") || "All";
  const industryParam = searchParams.get("industry") || "All";
  const searchQuery = searchParams.get("q") || "";
  const showFilters = searchParams.get("filters") === "true";

  // Intersection Observer for infinite loading
  const observer = useRef<IntersectionObserver>();
  const lastDesignElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  // Update URL params when filters change
  const updateFilters = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "All") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  // Filter designs based on URL params
  const filteredDesigns = designs.filter((design) => {
    const matchesCategory =
      categoryParam === "All" || design.category?.name === categoryParam;
    const matchesStyle =
      styleParam === "All" || design.style?.name === styleParam;
    const matchesIndustry =
      industryParam === "All" || design.industry?.name === industryParam;
    const matchesSearch =
      !searchQuery ||
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStyle && matchesIndustry && matchesSearch;
  });

  // Toggle filters visibility
  const toggleFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    if (showFilters) {
      newParams.delete("filters");
    } else {
      newParams.set("filters", "true");
    }
    setSearchParams(newParams);
  };

  // Handle search input
  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  // Set initial category from URL if provided
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.some(c => c.name === categoryFromUrl)) {
      updateFilters({ category: categoryFromUrl });
    }
  }, [categories]);

  if (error) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to load gallery data</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

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
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={toggleFilters}
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
                  <Badge
                    key="all-categories"
                    variant={categoryParam === "All" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateFilters({ category: "All" })}
                  >
                    All
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant={
                        categoryParam === category.name ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => updateFilters({ category: category.name })}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground block">
                  Style:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    key="all-styles"
                    variant={styleParam === "All" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateFilters({ style: "All" })}
                  >
                    All
                  </Badge>
                  {styles.map((style) => (
                    <Badge
                      key={style.id}
                      variant={
                        styleParam === style.name ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => updateFilters({ style: style.name })}
                    >
                      {style.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground block">
                  Industry:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    key="all-industries"
                    variant={industryParam === "All" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateFilters({ industry: "All" })}
                  >
                    All
                  </Badge>
                  {industries.map((industry) => (
                    <Badge
                      key={industry.id}
                      variant={
                        industryParam === industry.name ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => updateFilters({ industry: industry.name })}
                    >
                      {industry.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {loading && designs.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : filteredDesigns.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No designs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchParams(new URLSearchParams());
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredDesigns.map((design, index) => (
                <div
                  key={design.id}
                  ref={index === filteredDesigns.length - 1 ? lastDesignElementRef : null}
                >
                  <Link to={`/gallery/${design.id}`}>
                    <div className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={design.image_url}
                        alt={design.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                            {design.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                            <Badge variant="secondary">
                              {design.category?.name}
                            </Badge>
                            <Badge variant="secondary">{design.style?.name}</Badge>
                          </div>
                          <Button variant="secondary" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            View Design
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center mt-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}