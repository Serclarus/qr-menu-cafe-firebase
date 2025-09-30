# QR Menü - Kafe Mobil Menü Sistemi

Bu proje, kafeler için QR kod ile erişilebilen mobil menü sistemidir.

## Özellikler

- 📱 Mobil odaklı tasarım
- 🔥 Firebase entegrasyonu
- 👨‍💼 Admin paneli (5 kez cafe ismine tıklayarak erişim)
- 📊 Gerçek zamanlı menü güncellemeleri
- 🎨 Modern ve kullanıcı dostu arayüz
- 📱 Instagram entegrasyonu

## Kurulum

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. "Create a project" tıklayın
3. Proje adını girin (örn: "thee-bbubb-menu")
4. Google Analytics'i etkinleştirin (opsiyonel)
5. "Create project" tıklayın

### 2. Firestore Database Kurulumu

1. Firebase Console'da "Firestore Database" seçin
2. "Create database" tıklayın
3. "Start in test mode" seçin
4. Lokasyon seçin (örn: europe-west1)
5. "Done" tıklayın

### 3. Authentication Kurulumu

1. Firebase Console'da "Authentication" seçin
2. "Get started" tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" seçin ve etkinleştirin

### 4. Web App Konfigürasyonu

1. Firebase Console'da "Project settings" (⚙️) tıklayın
2. "Your apps" bölümünde "Web" (</>) tıklayın
3. App nickname girin (örn: "QR Menu")
4. "Register app" tıklayın
5. Konfigürasyon kodunu kopyalayın

### 5. Firebase Config Güncelleme

`firebase-config.js` dosyasındaki konfigürasyonu güncelleyin:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 6. İlk Veri Ekleme

Firebase Console'da Firestore'da şu koleksiyonları oluşturun:

#### `cafe` koleksiyonu:
```json
{
  "info": {
    "name": "THEE BBUBB CAFE",
    "welcomeText": "Hoşgeldiniz"
  }
}
```

#### `menuItems` koleksiyonu (örnek):
```json
{
  "category": "hotdrinks",
  "name": "Türk Kahvesi",
  "price": "15",
  "description": "Geleneksel Türk kahvesi",
  "order": 1
}
```

### 7. İkonları Ekleme

`icons/` klasörüne şu dosyaları ekleyin:
- `hotdrinks_icon.png`
- `colddrinks_icon.png`
- `foods_icon.png`
- `desserts_icon.png`
- `snacks_icon.png`
- `hookah_icon.png`
- `instagram-icon.png`

### 8. Netlify Deploy

1. [Netlify](https://netlify.com)'a gidin
2. "New site from Git" tıklayın
3. GitHub repository'nizi bağlayın
4. Build settings:
   - Build command: `npm install`
   - Publish directory: `.`
5. "Deploy site" tıklayın

## Kullanım

### Admin Paneli Erişimi
1. Cafe ismine 5 kez tıklayın
2. Şifre: `admin123` (değiştirilebilir)
3. Kafe bilgilerini ve menü öğelerini yönetin

### Menü Kategorileri
- SICAK İÇECEKLER
- SOĞUK İÇECEKLER
- ANA YEMEKLER
- TATLILAR
- ATIŞTIRMALIKLAR
- NARGİLE

## Özelleştirme

### Admin Şifresi Değiştirme
`app.js` dosyasında `handleAdminLogin` fonksiyonunda şifreyi değiştirin.

### Instagram Linki
`index.html` dosyasında Instagram butonunun `onclick` özelliğini güncelleyin.

## Teknik Detaylar

- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Netlify
- **Icons**: PNG formatında yerel dosyalar

## Lisans

MIT License
