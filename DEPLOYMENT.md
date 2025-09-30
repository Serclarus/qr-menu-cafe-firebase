# QR Menu Netlify - Dağıtım Kılavuzu

Bu kılavuz, QR Menu uygulamasını Netlify'de nasıl dağıtacağınızı adım adım açıklar.

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler
- [Netlify hesabı](https://netlify.com)
- [Supabase hesabı](https://supabase.com)
- [GitHub hesabı](https://github.com)
- Git bilgisi

### 2. Repository Hazırlığı
```bash
# Repository'yi klonlayın
git clone https://github.com/Serclarus/QR_Menu_Netifly.git
cd QR_Menu_Netifly

# Bağımlılıkları yükleyin
npm install
```

## 🗄️ Veritabanı Kurulumu (Supabase)

### 1. Supabase Projesi Oluşturma
1. [Supabase](https://supabase.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. Proje adı: `qr-menu-db`
4. Şifre oluşturun ve kaydedin
5. Region seçin (Türkiye için en yakın)

### 2. Veritabanı Şeması Kurulumu
1. Supabase dashboard'da "SQL Editor"e gidin
2. `database/schema.sql` dosyasının içeriğini kopyalayın
3. SQL editörüne yapıştırın ve çalıştırın
4. Başarılı mesajını bekleyin

### 3. API Anahtarlarını Alma
1. Supabase dashboard'da "Settings" > "API" bölümüne gidin
2. Şu bilgileri not edin:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 🌐 Netlify Dağıtımı

### 1. Netlify'de Site Oluşturma
1. [Netlify](https://netlify.com) hesabınıza giriş yapın
2. "New site from Git" seçin
3. GitHub repository'nizi seçin
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.`
   - **Node version**: `18`

### 2. Environment Variables Ayarlama
Netlify dashboard'da "Site settings" > "Environment variables" bölümüne gidin:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=production
```

### 3. Netlify Identity Kurulumu
1. Netlify dashboard'da "Identity" bölümüne gidin
2. "Enable Identity" butonuna tıklayın
3. "Registration preferences" ayarlayın:
   - **Open**: Herkes kayıt olabilir
   - **Invite only**: Sadece davet edilenler
4. "External providers" ekleyin (Google, GitHub, etc.)

### 4. Git Gateway Kurulumu
1. "Identity" > "Services" bölümüne gidin
2. "Enable Git Gateway" butonuna tıklayın
3. GitHub repository'nizi authorize edin

## 🔧 Netlify Functions Konfigürasyonu

### 1. Function Dependencies
`package.json` dosyasında gerekli bağımlılıklar zaten tanımlı:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0"
  }
}
```

### 2. Function Test
Dağıtımdan sonra API endpoint'lerini test edin:

```bash
# Menü API test
curl https://your-site.netlify.app/api/menu

# Kategoriler API test
curl https://your-site.netlify.app/api/categories

# Cafe bilgileri API test
curl https://your-site.netlify.app/api/cafe-info
```

## 👤 Admin Panel Kurulumu

### 1. Admin Kullanıcısı Oluşturma
1. Netlify Identity'de "Invite users" bölümüne gidin
2. Admin email adresini ekleyin
3. "Admin" rolü verin
4. Davet email'ini gönderin

### 2. Admin Panel Erişimi
1. `https://your-site.netlify.app/admin` adresine gidin
2. Netlify Identity ile giriş yapın
3. CMS arayüzü yüklenecek

### 3. İlk İçerik Ekleme
1. **Cafe Bilgileri** bölümünden cafe bilgilerini güncelleyin
2. **Kategoriler** bölümünden menü kategorilerini ekleyin
3. **Menü Öğeleri** bölümünden ürünleri ekleyin

## 🔒 Güvenlik Konfigürasyonu

### 1. HTTPS Zorunluluğu
Netlify otomatik olarak HTTPS sağlar, ancak ek güvenlik için:

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

### 2. CORS Ayarları
API endpoint'leri için CORS zaten konfigüre edilmiş:

```javascript
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};
```

### 3. Rate Limiting
Netlify Functions için rate limiting ekleyin:

```javascript
// netlify/functions/api/menu.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // istek limiti
});
```

## 📊 Monitoring ve Analytics

### 1. Netlify Analytics
1. Netlify dashboard'da "Analytics" bölümüne gidin
2. "Enable Analytics" butonuna tıklayın
3. Site trafiğini izlemeye başlayın

### 2. Error Tracking
Netlify Functions için error tracking:

```javascript
// Error logging
console.error('API Error:', {
  error: error.message,
  stack: error.stack,
  timestamp: new Date().toISOString(),
  request: event
});
```

### 3. Performance Monitoring
Lighthouse CI ile performans izleme:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Lighthouse CI
        run: npm install -g @lhci/cli@0.12.x
        run: lhci autorun
```

## 🚀 Production Optimizasyonları

### 1. CDN Konfigürasyonu
Netlify otomatik CDN sağlar, ancak ek optimizasyon için:

```toml
# netlify.toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true
```

### 2. Image Optimization
Netlify Image Optimization kullanın:

```html
<!-- Optimized image loading -->
<img src="/images/logo.jpg" 
     alt="Cafe Logo"
     loading="lazy"
     width="200" 
     height="200">
```

### 3. Caching Strategy
Service Worker ile aggressive caching:

```javascript
// sw.js
const CACHE_NAME = 'qr-menu-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';
```

## 🔄 CI/CD Pipeline

### 1. Automatic Deployments
Netlify otomatik deployment sağlar:
- Git push → Otomatik build → Deploy
- Pull request → Preview deployment
- Branch protection → Production deployment

### 2. Environment Management
Farklı environment'lar için:

```bash
# Staging
netlify deploy --dir=dist --site=staging-site

# Production
netlify deploy --dir=dist --site=production-site --prod
```

### 3. Rollback Strategy
```bash
# Son deployment'a geri dön
netlify sites:list
netlify deploy:list --site=your-site-id
netlify rollback --site=your-site-id
```

## 🧪 Testing

### 1. Local Testing
```bash
# Yerel development
npm run dev

# Netlify CLI ile test
netlify dev

# Function test
netlify functions:invoke api/menu
```

### 2. Production Testing
```bash
# API endpoint test
curl -X GET https://your-site.netlify.app/api/menu
curl -X GET https://your-site.netlify.app/api/categories
curl -X GET https://your-site.netlify.app/api/cafe-info

# PWA test
lighthouse https://your-site.netlify.app --view
```

## 📱 PWA Deployment

### 1. Manifest Validation
```bash
# Manifest test
curl https://your-site.netlify.app/manifest.json

# PWA audit
lighthouse https://your-site.netlify.app --only-categories=pwa
```

### 2. Service Worker Test
```javascript
// Browser console'da test
navigator.serviceWorker.ready.then(registration => {
  console.log('SW registered:', registration);
});
```

## 🚨 Troubleshooting

### 1. Common Issues

**Build Failures:**
```bash
# Logs kontrol
netlify logs

# Build command test
npm run build
```

**Function Errors:**
```bash
# Function logs
netlify functions:log api/menu

# Local function test
netlify dev
```

**Database Connection:**
```javascript
// Supabase connection test
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
```

### 2. Performance Issues

**Slow Loading:**
- Image optimization kontrol
- CDN cache kontrol
- Bundle size analizi

**API Timeouts:**
- Function timeout ayarları
- Database query optimization
- Connection pooling

### 3. Security Issues

**CORS Errors:**
```javascript
// CORS headers kontrol
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};
```

**Authentication Issues:**
- JWT token validation
- Netlify Identity configuration
- Role-based access control

## 📈 Scaling

### 1. Traffic Scaling
- Netlify otomatik scaling sağlar
- CDN global distribution
- Edge caching

### 2. Database Scaling
- Supabase connection pooling
- Query optimization
- Index optimization

### 3. Function Scaling
- Netlify Functions otomatik scaling
- Cold start optimization
- Memory allocation

## 🔄 Maintenance

### 1. Regular Updates
```bash
# Dependencies update
npm update

# Security audit
npm audit
npm audit fix
```

### 2. Backup Strategy
- Supabase automatic backups
- Git repository backup
- Environment variables backup

### 3. Monitoring
- Uptime monitoring
- Performance monitoring
- Error tracking
- User analytics

---

**Not**: Bu kılavuz production-ready deployment için gerekli tüm adımları içerir. Herhangi bir sorunla karşılaştığınızda, ilgili bölümü tekrar kontrol edin veya Netlify/Supabase dokümantasyonuna başvurun.
