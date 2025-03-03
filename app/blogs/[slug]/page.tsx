import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the blog post data based on the slug
  // For this example, we'll use hardcoded data
  const blogPost = {
    id: params.slug,
    title: params.slug === "responsive-design-2025" 
      ? "Responsive Design Trends for 2025" 
      : "The Ultimate Guide to Modern Web Development",
    date: "May 15, 2025",
    author: "Priya Sharma",
    category: "Design",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    content: `
      <p class="mb-4">The landscape of web design is constantly evolving, and staying ahead of the curve is essential for businesses that want to maintain a competitive edge. As we look toward 2025, several responsive design trends are emerging that promise to reshape how users interact with websites across devices.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">1. Fluid Typography and Spacing</h2>
      <p class="mb-4">Gone are the days of fixed font sizes and spacing. In 2025, we're seeing a shift toward fully fluid typography that scales seamlessly across all device sizes. This approach uses viewport units and calc() functions to create typography that responds not just to breakpoints, but to every pixel change in screen size.</p>
      <p class="mb-4">Example CSS:</p>
      <pre class="bg-muted p-4 rounded-md overflow-x-auto mb-4"><code>:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1200;
  --fluid-min-size: 16;
  --fluid-max-size: 24;
  --fluid-min-ratio: calc(var(--fluid-min-size) / var(--fluid-min-width));
  --fluid-max-ratio: calc(var(--fluid-max-size) / var(--fluid-max-width));
  --fluid-size: calc(
    var(--fluid-min-ratio) * 100vw + 
    (var(--fluid-max-ratio) - var(--fluid-min-ratio)) * 
    ((100vw - (var(--fluid-min-width) * 1px)) / 
    (var(--fluid-max-width) - var(--fluid-min-width)))
  );
}

body {
  font-size: clamp(
    var(--fluid-min-size) * 1px,
    var(--fluid-size),
    var(--fluid-max-size) * 1px
  );
}</code></pre>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Container Queries</h2>
      <p class="mb-4">While media queries have been the backbone of responsive design for years, container queries are taking center stage in 2025. They allow elements to respond to their parent container's size rather than the viewport, enabling truly modular responsive components.</p>
      <p class="mb-4">This means a card component can adapt its layout based on whether it's in a sidebar, main content area, or full-width section—regardless of the overall screen size.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Responsive Animation</h2>
      <p class="mb-4">Animations are no longer one-size-fits-all. In 2025, we're seeing sophisticated animation systems that adapt based on device capabilities and user preferences. This includes:</p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Reduced motion options for users with vestibular disorders</li>
        <li class="mb-2">Device-specific animations that leverage unique hardware capabilities</li>
        <li class="mb-2">Performance-aware animations that scale complexity based on device processing power</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Adaptive Loading Patterns</h2>
      <p class="mb-4">Responsive design in 2025 goes beyond layout to include how content is loaded. Adaptive loading uses network information, device memory, and CPU capabilities to deliver appropriately sized assets and functionality.</p>
      <p class="mb-4">For example, a high-end device on a fast connection might receive high-resolution images and advanced interactive features, while a low-end device on a slow connection would get optimized images and a streamlined experience.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Variable Everything</h2>
      <p class="mb-4">CSS variables (custom properties) combined with variable fonts are creating unprecedented flexibility in responsive design. In 2025, we're seeing designs that use variables not just for colors and spacing, but for:</p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Font weight that adjusts based on screen size for optimal readability</li>
        <li class="mb-2">Border radius that scales proportionally with component size</li>
        <li class="mb-2">Animation timing that adapts to user interaction patterns</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">The responsive design trends of 2025 are moving beyond the basic principles of flexible grids and media queries toward a more holistic approach that considers device capabilities, user preferences, and contextual factors. By embracing these trends, designers and developers can create web experiences that truly adapt to users' needs across an increasingly diverse digital landscape.</p>
      <p class="mb-4">As you plan your website redesign or new project, consider how these responsive design trends might enhance your users' experience and keep your digital presence feeling fresh and modern in the years to come.</p>
    `
  };

  // Related posts
  const relatedPosts = [
    {
      id: "web-animation-techniques",
      title: "Advanced Web Animation Techniques Using GSAP",
      date: "April 10, 2025",
      image: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "website-performance-optimization",
      title: "Website Performance Optimization: A Complete Guide",
      date: "March 5, 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80"
    },
    {
      id: "ai-web-design",
      title: "How AI is Transforming Web Design in 2025",
      date: "February 18, 2025",
      image: "https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blogs">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blogs
              </Button>
            </Link>

            <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                <span>By {blogPost.author}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Tag className="h-4 w-4 mr-2" />
                <span>{blogPost.category}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-8">{blogPost.title}</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

            <div className="border-t border-border mt-16 pt-16">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link key={post.id} href={`/blogs/${post.id}`} className="group">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{post.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}