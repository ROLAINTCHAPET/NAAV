-- Run this in your Supabase SQL Editor to create the partners table
CREATE TABLE IF NOT EXISTS partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default partners
INSERT INTO partners (name, logo_url, website_url, is_active) VALUES
    ('Amani Architects', '/images/partners/all-partners.png', 'https://amani-arch.com', true),
    ('Horizon Design', '/images/partners/all-partners.png', 'https://horizon-design.com', true),
    ('Urban Co.', '/images/partners/all-partners.png', 'https://urbanco.com', true),
    ('Terra Collective', '/images/partners/all-partners.png', 'https://terra-collective.com', true),
    ('Axis Group', '/images/partners/all-partners.png', 'https://axisgroup.com', true);

-- Enable Row Level Security
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON partners FOR SELECT USING (is_active = true);

-- Allow all operations for authenticated users (admins)
CREATE POLICY "Allow admin all" ON partners FOR ALL USING (auth.role() = 'authenticated');
