"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  MessageSquare,
  ChevronRight,
  Send,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useBlogPost } from "@/hooks/useBlogPost";

export default function BlogPostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [commentForm, setCommentForm] = useState({
    author_name: "",
    author_email: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const { post, comments, loading, error, addComment } = useBlogPost(
    params.id || ""
  );

  // Handle social sharing
  const handleShare = async (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
        );
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: post.title,
              text: post.description,
              url: window.location.href,
            });
          } catch (error) {
            console.log("Error sharing:", error);
          }
        }
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !commentForm.author_name ||
      !commentForm.author_email ||
      !commentForm.content
    )
      return;

    setSubmitting(true);
    const result = await addComment(commentForm);
    setSubmitting(false);

    if (result.success) {
      setCommentForm({
        author_name: "",
        author_email: "",
        content: "",
      });
    } else {
      alert("Failed to add comment. Please try again.");
    }
  };

  // Handle scroll spy for TOC
  useEffect(() => {
    if (!post?.content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    // Extract headings from markdown content
    const headings = post.content.match(/^#{2,3} .+$/gm) || [];
    const ids = headings.map((h) =>
      h
        .toLowerCase()
        .replace(/^#+\s+/, "")
        .replace(/\s+/g, "-")
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [post?.content]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "The article you're looking for doesn't exist."}
          </p>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  // Extract headings for TOC
  const headings = post.content.match(/^#{2,3} .+$/gm) || [];
  const toc = headings.map((heading) => {
    const level = (heading.match(/^#+/) || [""])[0].length;
    const text = heading.replace(/^#+\s+/, "");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    return { id, text, level };
  });

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <img
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="container">
            <Link
              to="/blog"
              className="inline-flex items-center text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
        <div className="relative container px-4 text-center">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <img
                src={post.author?.avatar_url}
                alt={post.author?.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{post.author?.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time}</span>
            </div>
            <span>•</span>
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    // Style code blocks
                    code: ({ node, className, children, ...props }) => {
                      return (
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm" {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    // Style headings with IDs for TOC
                    h1: ({ children }) => (
                      <h1 className="scroll-m-20">{children}</h1>
                    ),
                    h2: ({ children }) => {
                      const id = children
                        ?.toString()
                        .toLowerCase()
                        .replace(/\s+/g, "-");
                      return (
                        <h2 id={id} className="scroll-m-20">
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => {
                      const id = children
                        ?.toString()
                        .toLowerCase()
                        .replace(/\s+/g, "-");
                      return (
                        <h3 id={id} className="scroll-m-20">
                          {children}
                        </h3>
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </article>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 mb-12">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mb-12">
                <span className="text-muted-foreground">Share:</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleShare("whatsapp")}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleShare("native")}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Comments Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Comments</h3>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Your name"
                      value={commentForm.author_name}
                      onChange={(e) =>
                        setCommentForm((prev) => ({
                          ...prev,
                          author_name: e.target.value,
                        }))
                      }
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={commentForm.author_email}
                      onChange={(e) =>
                        setCommentForm((prev) => ({
                          ...prev,
                          author_email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Write your comment..."
                    className="mb-4"
                    value={commentForm.content}
                    onChange={(e) =>
                      setCommentForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    required
                  />
                  <Button type="submit" className="gap-2" disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Post Comment
                  </Button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-muted/30 rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">
                              {comment.author_name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-foreground/90">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-muted/30 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">
                  Need a Stunning Website Like This?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how we can help you create a beautiful,
                  user-friendly website that converts.
                </p>
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() =>
                    window.open("https://wa.me/1234567890", "_blank")
                  }
                >
                  <MessageSquare className="w-4 h-4" />
                  Let's Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Table of Contents Sidebar */}
            <div className="lg:w-64 shrink-0">
              <div className="sticky top-24">
                <h4 className="font-semibold mb-4">Table of Contents</h4>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`
                        block py-1 text-sm transition-colors
                        ${item.level === 3 ? "pl-4" : ""}
                        ${
                          activeSection === item.id
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="fixed bottom-6 right-4 left-4 lg:hidden">
        <Button
          className="w-full gap-2 shadow-lg"
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
        >
          <MessageSquare className="w-4 h-4" />
          Let's Chat on WhatsApp
        </Button>
      </div>
    </main>
  );
}
