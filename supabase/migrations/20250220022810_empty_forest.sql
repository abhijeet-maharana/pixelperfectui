/*
  # Add Blog Comments Schema

  1. New Tables
    - `blog_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references blog_posts)
      - `author_name` (text)
      - `author_email` (text)
      - `content` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `blog_comments` table
    - Add policy for public read access
    - Add policy for public insert access (anyone can comment)
*/

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access on blog_comments" ON blog_comments
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert access on blog_comments" ON blog_comments
  FOR INSERT TO public WITH CHECK (true);

-- Create index for faster lookups by post_id
CREATE INDEX blog_comments_post_id_idx ON blog_comments(post_id);

-- Insert some sample comments
INSERT INTO blog_comments (post_id, author_name, author_email, content)
SELECT 
  posts.id,
  'Sample User',
  'user@example.com',
  'This is a great article! Thanks for sharing.'
FROM blog_posts posts
WHERE posts.featured = true;