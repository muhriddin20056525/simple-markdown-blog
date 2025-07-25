# Oddiy Markdown Blog

Next.js 15 da qurilgan zamonaviy, to'liq xususiyatlarga ega blog ilovasi. Markdown qo'llab-quvvatlash, autentifikatsiya, izohlar va layklar bilan.

## ✨ Xususiyatlar

- **📝 Markdown Qo'llab-quvvatlash**: To'liq renderlash bilan markdown yordamida postlar yozish
- **🔐 Autentifikatsiya**: NextAuth.js bilan xavfsiz foydalanuvchi autentifikatsiyasi
- **💬 Izohlar Tizimi**: Foydalanuvchilar postlarga izoh qoldirishlari mumkin
- **👍 Layk Tizimi**: Foydalanuvchilar postlarni layk boshishlari va laykni olib tashlashlari mumkin
- **👤 Foydalanuvchi Profillari**: Foydalanuvchi avatarlari va profil ma'lumotlari
- **📱 Responsive Dizayn**: Mobilga moslashgan responsive dizayn
- **🎨 Zamonaviy UI**: Tailwind CSS va shadcn/ui komponentlari bilan chiroyli interfeys
- **🗄️ Ma'lumotlar bazasi**: Mongoose ODM bilan MongoDB

## 🚀 Texnologiya Stack

- **Framework**: Next.js 15 (App Router)
- **Til**: TypeScript
- **Stillar**: Tailwind CSS
- **UI Komponentlar**: shadcn/ui + Radix UI
- **Autentifikatsiya**: NextAuth.js
- **Ma'lumotlar bazasi**: MongoDB
- **ODM**: Mongoose
- **Markdown**: react-markdown + remark-gfm
- **Ikonlar**: Lucide React

## 📋 Talablar

Ushbu loyihani ishga tushirishdan oldin quyidagilarga ega bo'lishingiz kerak:

- Node.js 18+ o'rnatilgan
- MongoDB ma'lumotlar bazasi (mahalliy yoki bulut)
- Git

##

🛠️ O'rnatish

1. **Repositoryni klonlash**
   ```bash
   git clone <repository-url>
   cd simple-markdown-blog
   ```
2. **Dependencies o'rnatish**

   ```bash
   npm install
   ```

3. **Env sozlamalari**

   Root papkada `.env` faylini yarating:

   ```env
   # Ma'lumotlar bazasi
   MONGODB_URI=sizning_mongodb_ulanish_stringingiz

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=sizning_nextauth_maxfiy_kalitingiz

   # OAuth Provayderlar
   GOOGLE_CLIENT_ID=sizning_google_client_id
   GOOGLE_CLIENT_SECRET=sizning_google_client_secret
   ```

4. **Ishlab chiqarish serverini ishga tushirish**

   ```bash
   npm run dev
   ```

5. **Brauzeringizni oching**

   [http://localhost:3000](http://localhost:3000) ga o'ting

## 📁 Loyiha Tuzilishi

```
simple-markdown-blog/
├── app/                   # Next.js App Router
│   ├── api/               # API yo'llari
│   │   ├── auth/          # Autentifikatsiya endpointlari
│   │   └── posts/         # Post boshqaruvi endpointlari
│   ├── posts/             # Post sahifalari
│   │   ├── [id]/          # Alohida post ko'rinishi
│   │   └── create/        # Yangi post yaratish
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Bosh sahifa
├── components/            # React komponentlari
│   ├── ui/               # shadcn/ui komponentlari
│   ├── AuthButton.tsx    # Autentifikatsiya tugmasi
│   ├── PostCard.tsx      # Post karta komponenti
│   ├── CommentCard.tsx   # Izoh komponenti
│   └── MarkdownRenderer.tsx # Markdown renderer
├── lib/                  # Utility kutubxonalar
│   ├── auth.ts           # NextAuth konfiguratsiyasi
│   ├── mongoose.ts       # Ma'lumotlar bazasi ulanishi
│   └── utils.ts          # Utility funksiyalar
├── models/               # Mongoose modellar
│   ├── Post.ts           # Post modeli
│   ├── User.ts           # Foydalanuvchi modeli
│   └── Comment.ts        # Izoh modeli
└── types/                # TypeScript turi aniqlashlari
    └── index.ts          # Asosiy turi aniqlashlari
```