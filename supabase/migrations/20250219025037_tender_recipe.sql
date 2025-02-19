/*
  # Gallery Tables Setup

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `count` (integer)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `styles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `industries`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `designs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `additional_images` (text[])
      - `category_id` (uuid, foreign key)
      - `style_id` (uuid, foreign key)
      - `industry_id` (uuid, foreign key)
      - `designer` (text)
      - `likes` (integer)
      - `created_at` (timestamp)
      - `tags` (text[])

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  count integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create styles table
CREATE TABLE IF NOT EXISTS styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create industries table
CREATE TABLE IF NOT EXISTS industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create designs table
CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  additional_images text[],
  category_id uuid REFERENCES categories(id),
  style_id uuid REFERENCES styles(id),
  industry_id uuid REFERENCES industries(id),
  designer text,
  likes integer DEFAULT 0,
  tags text[],
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on styles" ON styles
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on industries" ON industries
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on designs" ON designs
  FOR SELECT TO public USING (true);

-- Insert initial data
INSERT INTO categories (name, slug, count, image_url) VALUES
  ('Dashboard UI', 'dashboard-ui', 24, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500'),
  ('E-commerce', 'e-commerce', 18, 'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=500'),
  ('Landing Pages', 'landing-pages', 32, 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=500'),
  ('Mobile Apps', 'mobile-apps', 16, 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=500');

INSERT INTO styles (name) VALUES
  ('Minimal'),
  ('Modern'),
  ('Bold'),
  ('Playful');

INSERT INTO industries (name) VALUES
  ('SaaS'),
  ('Retail'),
  ('Technology'),
  ('Healthcare'),
  ('Finance');