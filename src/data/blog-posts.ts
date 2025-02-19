export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  toc: {
    id: string;
    text: string;
    level: number;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "modern-dashboard-design-principles",
    title: "Modern Dashboard Design Principles for SaaS Applications",
    description: "Learn the key principles of creating effective, user-friendly dashboard interfaces for modern SaaS applications.",
    content: `# Modern Dashboard Design Principles

## Introduction
Creating an effective dashboard is more than just arranging charts and numbers on a screen. It's about telling a story with data and making complex information accessible at a glance.

## Key Principles

### 1. Visual Hierarchy
Establish a clear visual hierarchy to guide users through the interface. Use size, color, and spacing to emphasize important information.

\`\`\`css
.dashboard-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

### 2. Data Visualization
Choose the right charts and graphs for your data. Don't overcomplicate visualizations - clarity is key.

### 3. Responsive Design
Ensure your dashboard works seamlessly across all devices.

## Best Practices
- Use consistent spacing and alignment
- Implement clear navigation
- Provide context for data
- Use appropriate color schemes

## Conclusion
Remember that the best dashboards are those that help users make decisions quickly and effectively.`,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    category: "SaaS Design",
    tags: ["Dashboard", "UI Design", "Data Visualization"],
    publishedAt: "2024-03-15",
    readingTime: "8 min read",
    featured: true,
    toc: [
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "key-principles", text: "Key Principles", level: 2 },
      { id: "visual-hierarchy", text: "Visual Hierarchy", level: 3 },
      { id: "data-visualization", text: "Data Visualization", level: 3 },
      { id: "responsive-design", text: "Responsive Design", level: 3 },
      { id: "best-practices", text: "Best Practices", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 }
    ]
  },
  {
    id: "e-commerce-conversion-optimization",
    title: "E-commerce UI Patterns That Drive Conversions",
    description: "Discover proven UI patterns and design techniques that can significantly improve your e-commerce conversion rates.",
    content: `# E-commerce UI Patterns That Drive Conversions

## Understanding User Behavior
The key to designing high-converting e-commerce interfaces lies in understanding how users shop online.

## Essential UI Patterns

### Product Cards
Design effective product cards that showcase your items in the best light.

\`\`\`css
.product-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: var(--radius);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}
\`\`\`

### Call-to-Action Buttons
Create compelling CTAs that drive user action.

## Mobile Optimization
Optimize your e-commerce UI for mobile users to capture the growing mobile shopping market.

## Conclusion
Remember to always test and iterate on your designs based on user feedback and analytics.`,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    coverImage: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000",
    category: "E-commerce UI",
    tags: ["E-commerce", "Conversion Rate", "UI Patterns"],
    publishedAt: "2024-03-14",
    readingTime: "6 min read",
    featured: true,
    toc: [
      { id: "understanding-user-behavior", text: "Understanding User Behavior", level: 2 },
      { id: "essential-ui-patterns", text: "Essential UI Patterns", level: 2 },
      { id: "product-cards", text: "Product Cards", level: 3 },
      { id: "call-to-action-buttons", text: "Call-to-Action Buttons", level: 3 },
      { id: "mobile-optimization", text: "Mobile Optimization", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 }
    ]
  }
];