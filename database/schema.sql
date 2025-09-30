-- QR Menu Database Schema for Supabase
-- This file contains the complete database schema for the QR Menu application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    "order" INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price VARCHAR(20) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cafe_info table
CREATE TABLE IF NOT EXISTS cafe_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    instagram_url VARCHAR(500),
    phone VARCHAR(20),
    address TEXT,
    logo_url VARCHAR(500),
    background_image_url VARCHAR(500),
    theme_color VARCHAR(7) DEFAULT '#4A90E2',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for Netlify Identity integration
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    netlify_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories("order");
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_admin_users_netlify_id ON admin_users(netlify_user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at 
    BEFORE UPDATE ON menu_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cafe_info_updated_at 
    BEFORE UPDATE ON cafe_info 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default cafe information
INSERT INTO cafe_info (name, description, instagram_url, theme_color) 
VALUES (
    'THEE BBUBB CAFE', 
    'Hoşgeldiniz', 
    'https://instagram.com/theebbubbcafe',
    '#4A90E2'
) ON CONFLICT DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, description, icon, "order") VALUES
('SICAK İÇECEKLER', 'Sıcak içeceklerimiz', '☕', 1),
('SOĞUK İÇECEKLER', 'Soğuk içeceklerimiz', '🧊', 2),
('ANA YEMEKLER', 'Ana yemeklerimiz', '🍽️', 3),
('TATLILAR', 'Tatlılarımız', '🍰', 4),
('ATIŞTIRMALIKLAR', 'Atıştırmalıklarımız', '🍿', 5),
('NARGİLE', 'Nargile çeşitlerimiz', '🚬', 6)
ON CONFLICT DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (category_id, name, description, price) 
SELECT 
    c.id,
    item.name,
    item.description,
    item.price
FROM categories c
CROSS JOIN (
    VALUES 
    -- Hot Drinks
    ('SICAK İÇECEKLER', 'Türk Kahvesi', 'Geleneksel Türk kahvesi', '15₺'),
    ('SICAK İÇECEKLER', 'Espresso', 'İtalyan espresso', '12₺'),
    ('SICAK İÇECEKLER', 'Americano', 'Sıcak americano', '14₺'),
    ('SICAK İÇECEKLER', 'Cappuccino', 'Kremalı cappuccino', '16₺'),
    ('SICAK İÇECEKLER', 'Latte', 'Sütlü latte', '18₺'),
    ('SICAK İÇECEKLER', 'Mocha', 'Çikolatalı mocha', '20₺'),
    
    -- Cold Drinks
    ('SOĞUK İÇECEKLER', 'Soğuk Kahve', 'Buzlu soğuk kahve', '16₺'),
    ('SOĞUK İÇECEKLER', 'Frappé', 'Yunan frappé', '18₺'),
    ('SOĞUK İÇECEKLER', 'Iced Tea', 'Buzlu çay', '12₺'),
    ('SOĞUK İÇECEKLER', 'Limonata', 'Taze limonata', '10₺'),
    ('SOĞUK İÇECEKLER', 'Ayran', 'Taze ayran', '8₺'),
    
    -- Main Dishes
    ('ANA YEMEKLER', 'Mantı', 'Ev yapımı mantı', '35₺'),
    ('ANA YEMEKLER', 'Lahmacun', 'İnce hamurlu lahmacun', '25₺'),
    ('ANA YEMEKLER', 'Pide', 'Çeşitli pide çeşitleri', '30₺'),
    ('ANA YEMEKLER', 'Köfte', 'Izgara köfte', '40₺'),
    ('ANA YEMEKLER', 'Tavuk Şiş', 'Marine edilmiş tavuk şiş', '45₺'),
    
    -- Desserts
    ('TATLILAR', 'Baklava', 'Antep fıstıklı baklava', '25₺'),
    ('TATLILAR', 'Künefe', 'Sıcak künefe', '30₺'),
    ('TATLILAR', 'Sütlaç', 'Ev yapımı sütlaç', '15₺'),
    ('TATLILAR', 'Tiramisu', 'İtalyan tiramisu', '28₺'),
    ('TATLILAR', 'Cheesecake', 'New York cheesecake', '32₺'),
    
    -- Snacks
    ('ATIŞTIRMALIKLAR', 'Patates Kızartması', 'Çıtır patates kızartması', '18₺'),
    ('ATIŞTIRMALIKLAR', 'Soğan Halkası', 'Kızarmış soğan halkası', '20₺'),
    ('ATIŞTIRMALIKLAR', 'Çiğ Börek', 'Ev yapımı çiğ börek', '22₺'),
    ('ATIŞTIRMALIKLAR', 'Sigara Böreği', 'Peynirli sigara böreği', '25₺'),
    
    -- Hookah
    ('NARGİLE', 'Elma Nargile', 'Elma aromalı nargile', '80₺'),
    ('NARGİLE', 'Çilek Nargile', 'Çilek aromalı nargile', '80₺'),
    ('NARGİLE', 'Mint Nargile', 'Nane aromalı nargile', '80₺'),
    ('NARGİLE', 'Karışık Nargile', 'Karışık meyve aromalı', '85₺')
) AS item(category_name, name, description, price)
WHERE c.name = item.category_name
ON CONFLICT DO NOTHING;

-- Create RLS (Row Level Security) policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cafe_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and menu items
CREATE POLICY "Public read access for categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for menu_items" ON menu_items
    FOR SELECT USING (is_available = true);

CREATE POLICY "Public read access for cafe_info" ON cafe_info
    FOR SELECT USING (true);

-- Admin access policies (these would be configured with Netlify Identity)
CREATE POLICY "Admin full access to categories" ON categories
    FOR ALL USING (true);

CREATE POLICY "Admin full access to menu_items" ON menu_items
    FOR ALL USING (true);

CREATE POLICY "Admin full access to cafe_info" ON cafe_info
    FOR ALL USING (true);

CREATE POLICY "Admin full access to admin_users" ON admin_users
    FOR ALL USING (true);
