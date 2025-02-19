/*
  # Add Dummy Designs Data

  1. New Data
    - Adds realistic dummy designs data for testing
    - Includes various categories, styles, and industries
    - Contains realistic image URLs and descriptions
*/

-- Insert dummy designs
INSERT INTO designs (
  title,
  description,
  image_url,
  additional_images,
  category_id,
  style_id,
  industry_id,
  designer,
  likes,
  tags,
  created_at
) 
SELECT
  'Analytics Dashboard ' || generate_series(1, 10)::text,
  'Modern analytics dashboard with real-time data visualization, customizable widgets, and responsive design.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
  ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'
  ],
  (SELECT id FROM categories WHERE name = 'Dashboard UI' LIMIT 1),
  (SELECT id FROM styles WHERE name = 'Minimal' LIMIT 1),
  (SELECT id FROM industries WHERE name = 'SaaS' LIMIT 1),
  'PixelPerfect Team',
  floor(random() * 500 + 100),
  ARRAY['Dashboard', 'Analytics', 'Data Visualization', 'Admin Panel'],
  now() - (random() * interval '60 days');

-- E-commerce designs
INSERT INTO designs (
  title,
  description,
  image_url,
  additional_images,
  category_id,
  style_id,
  industry_id,
  designer,
  likes,
  tags,
  created_at
) 
SELECT
  'E-commerce Product Page ' || generate_series(1, 10)::text,
  'Clean and conversion-focused e-commerce product page with immersive product visualization.',
  'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000'
  ],
  (SELECT id FROM categories WHERE name = 'E-commerce' LIMIT 1),
  (SELECT id FROM styles WHERE name = 'Modern' LIMIT 1),
  (SELECT id FROM industries WHERE name = 'Retail' LIMIT 1),
  'PixelPerfect Team',
  floor(random() * 500 + 100),
  ARRAY['E-commerce', 'Product Page', 'Shopping', 'Retail'],
  now() - (random() * interval '60 days');

-- Landing pages
INSERT INTO designs (
  title,
  description,
  image_url,
  additional_images,
  category_id,
  style_id,
  industry_id,
  designer,
  likes,
  tags,
  created_at
) 
SELECT
  'SaaS Landing Page ' || generate_series(1, 10)::text,
  'High-converting SaaS landing page with clear value proposition and optimized user flow.',
  'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=2000',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000'
  ],
  (SELECT id FROM categories WHERE name = 'Landing Pages' LIMIT 1),
  (SELECT id FROM styles WHERE name = 'Bold' LIMIT 1),
  (SELECT id FROM industries WHERE name = 'Technology' LIMIT 1),
  'PixelPerfect Team',
  floor(random() * 500 + 100),
  ARRAY['Landing Page', 'SaaS', 'Conversion', 'Marketing'],
  now() - (random() * interval '60 days');

-- Mobile apps
INSERT INTO designs (
  title,
  description,
  image_url,
  additional_images,
  category_id,
  style_id,
  industry_id,
  designer,
  likes,
  tags,
  created_at
) 
SELECT
  'Healthcare App UI ' || generate_series(1, 10)::text,
  'User-centric mobile app interface designed for healthcare applications with accessibility in mind.',
  'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=2000',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=2000'
  ],
  (SELECT id FROM categories WHERE name = 'Mobile Apps' LIMIT 1),
  (SELECT id FROM styles WHERE name = 'Minimal' LIMIT 1),
  (SELECT id FROM industries WHERE name = 'Healthcare' LIMIT 1),
  'PixelPerfect Team',
  floor(random() * 500 + 100),
  ARRAY['Mobile', 'Healthcare', 'App Design', 'UI/UX'],
  now() - (random() * interval '60 days');

-- Update category counts
UPDATE categories
SET count = (
  SELECT COUNT(*)
  FROM designs
  WHERE designs.category_id = categories.id
);