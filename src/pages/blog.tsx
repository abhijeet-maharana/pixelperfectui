"use client";

import { useEffect, useRef, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, ChevronRight, Loader2 } from "lucide-react";
import { useBlogData } from "@/hooks/useBlogData";

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("q") || "";

  const {
    posts,
    featuredPosts,
    categories,
    loading,
    error,
    hasMore,
    resetPosts,
    loadMore
  } = useBlogData();

  // Reset posts when filters change
  useEffect(() => {
    resetPosts(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  // Intersection Observer for infinite loading
  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore(selectedCategory, searchQuery);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, selectedCategory, searchQuery]);

  // Update category filter
  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  // Update search query
  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  if (error) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to load blog posts</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 md:py-12 bg-background">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights and guides on modern UI design, development tips, and industry trends.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-3xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {searchQuery === "" && selectedCategory === "All" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading && featuredPosts.length === 0 ? (
                // Loading skeletons for featured posts
                [...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="relative aspect-[16/9] rounded-lg bg-muted animate-pulse"
                  />
                ))
              ) : (
                featuredPosts.map((post) => (
                  <Link to={`/blog/${post.id}`} key={post.id}>
                    <div className="group relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <Badge className="mb-3">{post.category}</Badge>
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{post.reading_time}</span>
                            </div>
                            <span>•</span>
                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* All Posts */}
        {loading && posts.length === 0 ? (
          // Loading skeletons for posts grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-[400px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          // No results message
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or category filter
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
          // Posts grid
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  ref={index === posts.length - 1 ? lastPostElementRef : null}
                >
                  <Link to={`/blog/${post.id}`} className="group">
                    <article className="h-full flex flex-col bg-card rounded-lg overflow-hidden border transition-colors hover:border-primary">
                      <div className="relative aspect-[16/9]">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <Badge className="mb-3">{post.category}</Badge>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.author?.avatar_url}
                              alt={post.author?.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{post.author?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.reading_time}</span>
                          </div>
                        </div>
                      </div>
                    </article>
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

        {/* Newsletter Signup */}
        <div className="mt-20 max-w-2xl mx-auto text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest design insights and resources delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </form>
        </div>
      </div>
    </main>
  );
}