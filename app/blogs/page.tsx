import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export default function BlogsPage() {
  return (
    <>
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
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border/50 bg-card/50 backdrop-blur-sm"
              >
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
                    <Link
                      href={`/blogs/${post.id}`}
                      className="hover:text-primary transition-colors"
                    >
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
    </>
  );
}
