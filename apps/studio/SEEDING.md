# Quick Start: Seeding Your Sanity CMS

## 1. Get Your Write Token

Visit: https://sanity.io/manage/personal/project/t1xfyfxz/api/tokens

Create a token with **Editor** permissions.

## 2. Add Token to Environment

```bash
# apps/studio/.env.local
SANITY_WRITE_TOKEN=your_token_here
```

## 3. Install Dependencies

```bash
cd apps/studio
npm install tsx @sanity/client
```

## 4. Run the Seed

```bash
npm run seed
```

## 5. Add Images (Optional)

Create this folder structure and add your images:

```
apps/studio/images/
├── categories/       # 6 category images (1200x800px)
├── brands/          # 6 brand logos (400x200px PNG)
├── products/        # 8 product images (1200x800px)
└── hero/            # 1 hero background (1920x1080px)
```

**Image naming:**
- `lab-solutions.jpg`
- `medical-furniture.jpg`
- `icu-or-equipment.jpg`
- `dental-solutions.jpg`
- `dialysis-solutions.jpg`
- `imaging-solutions.jpg`
- `baxter-logo.png`
- `aegea-logo.png`
- `cami-logo.png`
- `fujifilm-logo.png`
- `linet-logo.png`
- `medwish-logo.png`
- `ak-98-dialysis-machine.jpg`
- `prismaflex-system.jpg`
- `artis-physio.jpg`
- `artis-physio-plus.jpg`
- `icu-bed.jpg`
- `ultrasound-machine.jpg`
- `dental-unit.jpg`
- `centrifuge.jpg`
- `hero-background.jpg`

Then upload manually via Sanity Studio at http://localhost:3333

## What Gets Seeded

✅ Site Settings (contact info, SEO)
✅ Homepage content
✅ 6 Categories (Lab, Furniture, ICU/OR, Dental, Dialysis, Imaging)
✅ 6 Brands (Baxter, Aegea, CAMI, Fujifilm, Linet, Medwish)
✅ 8 Products (dialysis machines, beds, imaging equipment, etc.)
✅ 6 Services (installation, maintenance, training, etc.)
✅ 5 Blog Posts
✅ 4 FAQs
✅ About Us page

## Next Steps

1. Visit http://localhost:3333 to see your content
2. Upload images to documents
3. Customize content as needed
4. Your Next.js app will fetch this data automatically
