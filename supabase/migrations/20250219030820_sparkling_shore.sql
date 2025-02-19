/*
  # Create blog tables and sample data

  1. New Tables
    - `blog_authors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `cover_image` (text)
      - `category` (text)
      - `tags` (text[])
      - `published_at` (timestamptz)
      - `reading_time` (text)
      - `featured` (boolean)
      - `author_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create blog_authors table
CREATE TABLE IF NOT EXISTS blog_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  cover_image text,
  category text,
  tags text[],
  published_at timestamptz DEFAULT now(),
  reading_time text,
  featured boolean DEFAULT false,
  author_id uuid REFERENCES blog_authors(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on blog_authors" ON blog_authors
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on blog_posts" ON blog_posts
  FOR SELECT TO public USING (true);

-- Insert sample authors
INSERT INTO blog_authors (name, avatar_url) VALUES
  ('Sarah Chen', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'),
  ('Alex Thompson', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150');

-- Insert featured blog posts
INSERT INTO blog_posts (
  title,
  description,
  content,
  cover_image,
  category,
  tags,
  reading_time,
  featured,
  author_id
) VALUES
  (
    'Modern Dashboard Design Principles',
    'Learn the key principles of creating effective, user-friendly dashboard interfaces for modern SaaS applications.',
    '# Modern Dashboard Design Principles...',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    'SaaS Design',
    ARRAY['Dashboard', 'UI Design', 'Data Visualization'],
    '8 min read',
    true,
    (SELECT id FROM blog_authors WHERE name = 'Sarah Chen')
  ),
  (
    'E-commerce UI Patterns That Drive Conversions',
    'Discover proven UI patterns and design techniques that can significantly improve your e-commerce conversion rates.',
    '# E-commerce UI Patterns That Drive Conversions...',
    'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000',
    'E-commerce UI',
    ARRAY['E-commerce', 'Conversion Rate', 'UI Patterns'],
    '6 min read',
    true,
    (SELECT id FROM blog_authors WHERE name = 'Alex Thompson')
  );

-- Insert sample blog posts
DO $$
DECLARE
  sarah_id uuid;
  alex_id uuid;
  categories text[] := ARRAY['SaaS Design', 'E-commerce UI', 'Landing Page Ideas', 'Mobile UI/UX'];
  images text[] := ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=2000'
  ];
BEGIN
  -- Get author IDs
  SELECT id INTO sarah_id FROM blog_authors WHERE name = 'Sarah Chen';
  SELECT id INTO alex_id FROM blog_authors WHERE name = 'Alex Thompson';
  
  -- Insert sample posts
  FOR i IN 1..30 LOOP
    INSERT INTO blog_posts (
      title,
      description,
      content,
      cover_image,
      category,
      tags,
      reading_time,
      featured,
      author_id,
      published_at
    ) VALUES (
      'Blog Post ' || i::text,
      'Sample description for blog post ' || i::text,
      '# Sample content...',
      images[1 + mod(i - 1, 3)],
      categories[1 + mod(i - 1, 4)],
      ARRAY['Sample Tag 1', 'Sample Tag 2'],
      (5 + mod(i, 5))::text || ' min read',
      false,
      CASE WHEN mod(i, 2) = 0 THEN sarah_id ELSE alex_id END,
      now() - (random() * interval '60 days')
    );
  END LOOP;
END $$;