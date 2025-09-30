# QR Menu Admin Kılavuzu

Bu kılavuz, QR Menu uygulamasının admin panelini nasıl kullanacağınızı açıklar.

## 🔐 Admin Paneline Erişim

### 1. Giriş Yapma
1. `https://your-site.netlify.app/admin` adresine gidin
2. "Log in with Netlify Identity" butonuna tıklayın
3. Email ve şifrenizi girin
4. Admin paneli yüklenecek

### 2. İlk Giriş
- İlk kez giriş yapıyorsanız, davet email'inizi kontrol edin
- Email'deki linke tıklayarak şifrenizi oluşturun
- Admin paneli otomatik olarak açılacak

## 🏪 Cafe Bilgileri Yönetimi

### 1. Cafe Bilgilerini Güncelleme
1. **Cafe Bilgileri** bölümüne gidin
2. Aşağıdaki bilgileri güncelleyin:

#### Temel Bilgiler
- **Cafe Adı**: Menüde görünecek cafe adı
- **Açıklama**: Hoşgeldiniz mesajı
- **Instagram URL**: Instagram hesap linki
- **Telefon**: İletişim numarası
- **Adres**: Cafe adresi

#### Görsel Ayarlar
- **Logo URL**: Cafe logosu (önerilen: 200x200px)
- **Arka Plan Resmi**: Ana sayfa arka planı (önerilen: 1920x1080px)
- **Tema Rengi**: Ana renk (hex kodu, örn: #4A90E2)

### 2. Görsel Yükleme
1. **Media** bölümüne gidin
2. "Add new media" butonuna tıklayın
3. Dosyayı seçin ve yükleyin
4. URL'yi kopyalayın ve ilgili alana yapıştırın

## 📂 Kategori Yönetimi

### 1. Yeni Kategori Ekleme
1. **Kategoriler** bölümüne gidin
2. "New Kategoriler" butonuna tıklayın
3. Aşağıdaki bilgileri doldurun:

#### Kategori Bilgileri
- **Kategori Adı**: Örn: "SICAK İÇECEKLER"
- **Açıklama**: Kategori açıklaması
- **İkon**: Emoji kullanın (☕, 🍽️, 🍰, vb.)
- **Sıralama**: Menüdeki sıralama (0-100)
- **Aktif**: Kategoriyi aktif/pasif yap

### 2. Kategori Düzenleme
1. Düzenlemek istediğiniz kategoriye tıklayın
2. Bilgileri güncelleyin
3. "Save" butonuna tıklayın

### 3. Kategori Silme
1. Silmek istediğiniz kategoriye tıklayın
2. "Delete" butonuna tıklayın
3. Onay verin

## 🍽️ Menü Öğeleri Yönetimi

### 1. Yeni Menü Öğesi Ekleme
1. **Menü Öğeleri** bölümüne gidin
2. "New Menü Öğeleri" butonuna tıklayın
3. Aşağıdaki bilgileri doldurun:

#### Ürün Bilgileri
- **Ürün Adı**: Örn: "Türk Kahvesi"
- **Açıklama**: Ürün açıklaması
- **Fiyat**: Fiyat (₺, $, € sembolü ile)
- **Kategori**: Dropdown'dan seçin
- **Mevcut**: Ürün mevcut/mu değil
- **Resim**: Ürün fotoğrafı (opsiyonel)

### 2. Menü Öğesi Düzenleme
1. Düzenlemek istediğiniz ürüne tıklayın
2. Bilgileri güncelleyin
3. "Save" butonuna tıklayın

### 3. Menü Öğesi Silme
1. Silmek istediğiniz ürüne tıklayın
2. "Delete" butonuna tıklayın
3. Onay verin

## 📱 Önizleme ve Test

### 1. Canlı Önizleme
1. Değişiklikleri kaydettikten sonra
2. Ana siteye gidin: `https://your-site.netlify.app`
3. Değişikliklerin yansıdığını kontrol edin

### 2. Mobil Test
1. Telefonunuzdan siteye gidin
2. QR kod ile test edin
3. Tüm özelliklerin çalıştığını kontrol edin

## 🔧 Gelişmiş Ayarlar

### 1. Toplu İçerik Yönetimi
- **CSV Import**: Toplu ürün ekleme
- **Bulk Edit**: Toplu düzenleme
- **Template**: Hazır şablonlar

### 2. İçerik Organizasyonu
- **Tags**: Ürün etiketleri
- **Filters**: Filtreleme seçenekleri
- **Search**: Arama özelliği

### 3. Analytics
- **Page Views**: Sayfa görüntüleme
- **User Engagement**: Kullanıcı etkileşimi
- **Popular Items**: Popüler ürünler

## 🚨 Sorun Giderme

### 1. Yaygın Sorunlar

#### Değişiklikler Görünmüyor
- **Çözüm**: Sayfayı yenileyin (Ctrl+F5)
- **Kontrol**: Cache temizleme
- **Bekleme**: 1-2 dakika bekleyin

#### Resim Yüklenmiyor
- **Kontrol**: Dosya boyutu (max 5MB)
- **Format**: JPG, PNG, WebP
- **Çözüm**: Resmi yeniden yükleyin

#### Kategori Sıralaması
- **Kontrol**: Sıralama numaraları
- **Düzenleme**: 0-100 arası değerler
- **Test**: Farklı numaralar deneyin

### 2. Teknik Sorunlar

#### Admin Panel Açılmıyor
1. Tarayıcı cache'ini temizleyin
2. Farklı tarayıcı deneyin
3. İnternet bağlantınızı kontrol edin

#### İçerik Kayboldu
1. "History" bölümüne bakın
2. Son değişiklikleri kontrol edin
3. Geri yükleme yapın

#### Yavaş Yükleme
1. Resim boyutlarını kontrol edin
2. Gereksiz içerikleri silin
3. CDN cache'ini temizleyin

## 📊 İçerik Stratejisi

### 1. Menü Organizasyonu
- **Kategoriler**: 6-8 kategori ideal
- **Ürün Sayısı**: Kategori başına 5-15 ürün
- **Açıklamalar**: Kısa ve açıklayıcı

### 2. Görsel Stratejisi
- **Logo**: 200x200px, PNG format
- **Ürün Resimleri**: 400x400px, JPG format
- **Arka Plan**: 1920x1080px, yüksek kalite

### 3. Fiyatlandırma
- **Format**: ₺, $, € sembolü kullanın
- **Tutarlılık**: Aynı para birimi
- **Güncel**: Fiyatları düzenli güncelleyin

## 🔄 Düzenli Bakım

### 1. Haftalık Kontroller
- [ ] Yeni ürünler eklendi mi?
- [ ] Fiyatlar güncel mi?
- [ ] Resimler düzgün yükleniyor mu?
- [ ] Kategoriler düzenli mi?

### 2. Aylık Kontroller
- [ ] Popüler ürünler analizi
- [ ] Kullanıcı geri bildirimleri
- [ ] Performans metrikleri
- [ ] Güvenlik güncellemeleri

### 3. Sezonluk Güncellemeler
- [ ] Menü değişiklikleri
- [ ] Sezonluk ürünler
- [ ] Özel kampanyalar
- [ ] Tema güncellemeleri

## 📞 Destek

### 1. Teknik Destek
- **Email**: support@your-site.com
- **Telefon**: +90 XXX XXX XX XX
- **Saatler**: 09:00 - 18:00 (Pazartesi-Cuma)

### 2. Eğitim Kaynakları
- **Video Tutorials**: YouTube kanalı
- **Documentation**: Detaylı kılavuzlar
- **FAQ**: Sık sorulan sorular

### 3. Topluluk
- **Forum**: Kullanıcı forumu
- **Discord**: Canlı destek
- **Newsletter**: Güncelleme bildirimleri

## 🎯 En İyi Uygulamalar

### 1. İçerik Yönetimi
- **Tutarlılık**: Aynı format ve stil
- **Güncellik**: Düzenli içerik güncelleme
- **Kalite**: Yüksek kaliteli görseller
- **Doğruluk**: Doğru bilgiler

### 2. Kullanıcı Deneyimi
- **Hız**: Hızlı yükleme
- **Mobil**: Mobil-öncelikli tasarım
- **Erişilebilirlik**: Herkes için erişilebilir
- **Güvenlik**: Güvenli platform

### 3. SEO ve Performans
- **Meta Tags**: Doğru meta bilgileri
- **Alt Text**: Resim açıklamaları
- **Sitemap**: Arama motoru optimizasyonu
- **Analytics**: Performans takibi

---

**Not**: Bu kılavuz admin panelinin tüm özelliklerini kapsar. Herhangi bir sorunla karşılaştığınızda, ilgili bölümü tekrar okuyun veya destek ekibiyle iletişime geçin.
