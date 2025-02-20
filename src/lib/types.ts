export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  image_url: string;
  created_at: string;
}

export interface Style {
  id: string;
  name: string;
  created_at: string;
}

export interface Industry {
  id: string;
  name: string;
  created_at: string;
}

export interface Design {
  id: string;
  title: string;
  description: string;
  image_url: string;
  additional_images: string[];
  category_id: string;
  style_id: string;
  industry_id: string;
  designer: string;
  likes: number;
  tags: string[];
  created_at: string;
  // Joined fields
  category?: Category;
  style?: Style;
  industry?: Industry;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  published_at: string;
  reading_time: string;
  featured: boolean;
  author_id: string;
  created_at: string;
  // Joined fields
  author?: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  replies?: Comment[];
}
