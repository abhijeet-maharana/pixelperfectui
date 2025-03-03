import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BlogsPage() {
  const blogPosts = [
    {
      id: "responsive-design-2025",
      title: "Responsive Design Trends for 2025",
      excerpt: "Discover the latest responsive design techniques that will dominate the web development landscape in 2025.",
      date: "May 15, 2025",
      author: "Priya Sharma",
      category: "Design",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
    },
    {
      id: "seo-optimization-guide",
      title: "The Ultimate SEO Optimization Guide for Websites",
      excerpt: "Learn how to optimize your website for search engines and drive more organic traffic to your business.",
      date: "April 28, 2025",
      author: "Rahul Mehta",
      category: "SEO",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
    },
    {
      id: "web-animation-techniques",
      title: "Advanced Web Animation Techniques Using GSAP",
      excerpt: "Explore how to create stunning animations that enhance user experience without sacrificing performance.",
      date: "April 10, 2025",
      author: "Ananya Patel",
      category: "Development",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "ecommerce-conversion-tips",
      title: "10 Proven Ways to Boost E-commerce Conversion Rates",
      excerpt: "Implement these strategies to increase your online store's conversion rates and maximize revenue.",
      date: "March 22, 2025",
      author: "Vikram Singh",
      category: "E-commerce",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "website-performance-optimization",
      title: "Website Performance Optimization: A Complete Guide",
      excerpt: "Learn how to optimize your website's performance to improve user experience and search engine rankings.",
      date: "March 5, 2025",
      author: "Neha Gupta",
      category: "Performance",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80"
    },
    {
      id: "ai-web-design",
      title: "How AI is Transforming Web Design in 2025",
      excerpt: "Discover how artificial intelligence is revolutionizing the web design industry and what it means for businesses.",
      date: "February 18, 2025",
      author: "Arjun Reddy",
      category: "Technology",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground">
              Insights, tips, and trends in web design and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                    {post.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">
                    <Link href={`/blogs/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm">By {post.author}</div>
                  <Link href={`/blogs/${post.id}`}>
                    <Button variant="ghost" size="sm" className="group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}