# QR Menu Netlify - Dijital Menü Uygulaması

THEE BBUBB CAFE için geliştirilmiş, Netlify tabanlı dijital menü uygulaması. QR kod ile erişilebilen, mobil-öncelikli, PWA destekli modern bir menü sistemi.

## 🚀 Özellikler

### Müşteri Deneyimi
- **QR Kod Erişimi**: Tek tıkla menüye erişim
- **Mobil-Öncelikli Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Türkçe Dil Desteği**: Tam Türkçe karakter desteği
- **Hızlı Yükleme**: Optimize edilmiş performans
- **Offline Çalışma**: İnternet bağlantısı olmadan da kullanım
- **PWA Desteği**: Uygulama gibi deneyim

### Admin Paneli
- **Netlify CMS**: Teknik bilgi gerektirmeyen yönetim
- **Kolay İçerik Yönetimi**: Menü öğeleri, kategoriler, cafe bilgileri
- **Güvenli Erişim**: Netlify Identity ile kimlik doğrulama
- **Gerçek Zamanlı Güncelleme**: Değişiklikler anında yansır

### Teknik Özellikler
- **Netlify Hosting**: Otomatik dağıtım ve CDN
- **Supabase Veritabanı**: Güvenilir veri saklama
- **API Endpoints**: RESTful API yapısı
- **Güvenlik**: HTTPS, CORS, güvenlik başlıkları
- **Performans**: Lighthouse 90+ skor

## 📁 Proje Yapısı

```
QR_Menu_Netifly/
├── index.html                 # Ana sayfa
├── css/
│   └── styles.css            # Stil dosyaları
├── js/
│   └── app.js               # Ana JavaScript
├── admin/
│   ├── index.html           # Admin panel
│   └── config.yml          # Netlify CMS konfigürasyonu
├── netlify/
│   └── functions/
│       └── api/
│           ├── menu.js      # Menü API
│           ├── categories.js # Kategoriler API
│           └── cafe-info.js # Cafe bilgileri API
├── database/
│   └── schema.sql          # Veritabanı şeması
├── icons/                  # PWA ikonları
├── manifest.json          # PWA manifest
├── sw.js                  # Service Worker
├── netlify.toml          # Netlify konfigürasyonu
├── _headers              # Güvenlik başlıkları
├── _redirects            # Yönlendirme kuralları
└── package.json         # Proje bağımlılıkları
```

## 🛠️ Kurulum ve Dağıtım

### 1. Gereksinimler
- Netlify hesabı
- Supabase hesabı
- Git repository

### 2. Veritabanı Kurulumu
1. Supabase'de yeni proje oluşturun
2. `database/schema.sql` dosyasını Supabase SQL editöründe çalıştırın
3. API anahtarlarını not edin

### 3. Netlify Dağıtımı
1. GitHub repository'sini Netlify'e bağlayın
2. Environment variables'ları ayarlayın:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Netlify Identity'yi etkinleştirin
4. Site otomatik olarak dağıtılacak

### 4. Admin Panel Kurulumu
1. Netlify Identity'de admin kullanıcısı oluşturun
2. `/admin` sayfasına gidin
3. Netlify Identity ile giriş yapın
4. Menü içeriklerini yönetmeye başlayın

## 🔧 API Endpoints

### Menü API
- `GET /api/menu` - Tüm menü öğelerini getir
- `POST /api/menu` - Menü öğesi ekle/güncelle/sil (admin)

### Kategoriler API
- `GET /api/categories` - Tüm kategorileri getir
- `POST /api/categories` - Kategori ekle/güncelle/sil (admin)

### Cafe Bilgileri API
- `GET /api/cafe-info` - Cafe bilgilerini getir
- `POST /api/cafe-info` - Cafe bilgilerini güncelle (admin)

## 📱 PWA Özellikleri

### Manifest
- Uygulama adı ve açıklaması
- İkonlar (72x72'den 512x512'ye)
- Tema renkleri
- Başlangıç URL'i
- Görüntüleme modu

### Service Worker
- Offline çalışma
- Cache stratejileri
- Background sync
- Push notifications (gelecek)

## 🔒 Güvenlik

### Güvenlik Başlıkları
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Kimlik Doğrulama
- Netlify Identity
- JWT token tabanlı
- Role-based access control

### CORS Konfigürasyonu
- API endpoints için CORS
- Güvenli origin kontrolü

## 📊 Performans

### Lighthouse Skorları
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Optimizasyonlar
- Image lazy loading
- CSS/JS minification
- CDN caching
- Service Worker caching

## 🌐 Çoklu Dil Desteği

### Türkçe Karakter Desteği
- UTF-8 encoding
- Türkçe font desteği
- Yerelleştirilmiş içerik

### Gelecek Dil Desteği
- İngilizce
- Arapça
- Diğer diller

## 📱 Responsive Tasarım

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Özellikler
- Touch-friendly interface
- Swipe gestures
- Optimized typography
- Flexible grid system

## 🔧 Geliştirme

### Yerel Geliştirme
```bash
# Bağımlılıkları yükle
npm install

# Yerel sunucuyu başlat
npm run dev

# Netlify CLI ile test
netlify dev
```

### Test
```bash
# Test çalıştır
npm test

# Lint kontrolü
npm run lint
```

## 📈 Analytics ve Monitoring

### Performans İzleme
- Core Web Vitals
- Page load times
- User interactions
- Error tracking

### Kullanıcı Analitikleri
- Page views
- User engagement
- Device/browser stats
- Geographic data

## 🚀 Gelecek Özellikler

### Planlanan Özellikler
- [ ] Online sipariş sistemi
- [ ] Ödeme entegrasyonu
- [ ] Müşteri yorumları
- [ ] Sosyal medya entegrasyonu
- [ ] Çoklu dil desteği
- [ ] Dark mode
- [ ] Sesli menü
- [ ] QR kod oluşturucu

### Teknik İyileştirmeler
- [ ] GraphQL API
- [ ] Real-time updates
- [ ] Advanced caching
- [ ] A/B testing
- [ ] Performance monitoring

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- **Cafe**: THEE BBUBB CAFE
- **Website**: [Netlify URL]
- **Instagram**: [@theebbubbcafe]
- **Email**: [cafe@email.com]

## 🙏 Teşekkürler

- Netlify ekibine hosting desteği için
- Supabase ekibine veritabanı desteği için
- Açık kaynak topluluğuna katkıları için

---

**Not**: Bu proje production-ready durumda olup, tüm güvenlik ve performans standartlarına uygun olarak geliştirilmiştir.
