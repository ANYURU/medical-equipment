# Sanity CMS Seeding Guide

## Setup

1. **Get your Sanity write token:**
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with "Editor" permissions
   - Copy the token

2. **Add token to environment:**
   ```bash
   # In apps/studio/.env.local
   SANITY_WRITE_TOKEN=your_token_here
   ```

3. **Install dependencies:**
   ```bash
   npm install tsx @sanity/client --save-dev
   ```

## Running the Seed

```bash
cd apps/studio
npx tsx scripts/seed.ts
```

## Adding Images

### Directory Structure
Create an `images` folder in the studio directory:

```
apps/studio/
├── scripts/
├── images/
│   ├── categories/
│   │   ├── lab-solutions.jpg
│   │   ├── medical-furniture.jpg
│   │   ├── icu-or-equipment.jpg
│   │   ├── dental-solutions.jpg
│   │   ├── dialysis-solutions.jpg
│   │   └── imaging-solutions.jpg
│   ├── brands/
│   │   ├── baxter-logo.png
│   │   ├── aegea-logo.png
│   │   ├── cami-logo.png
│   │   ├── fujifilm-logo.png
│   │   ├── linet-logo.png
│   │   └── medwish-logo.png
│   ├── products/
│   │   ├── ak-98-dialysis-machine.jpg
│   │   ├── prismaflex-system.jpg
│   │   ├── artis-physio.jpg
│   │   ├── artis-physio-plus.jpg
│   │   ├── icu-bed.jpg
│   │   ├── ultrasound-machine.jpg
│   │   ├── dental-unit.jpg
│   │   └── centrifuge.jpg
│   └── hero/
│       └── hero-background.jpg
```

### Image Requirements

**Categories & Products:**
- Format: JPG or PNG
- Recommended size: 1200x800px
- Max file size: 2MB

**Brand Logos:**
- Format: PNG (with transparency)
- Recommended size: 400x200px
- Max file size: 500KB

**Hero Image:**
- Format: JPG
- Recommended size: 1920x1080px
- Max file size: 3MB

### Adding Images to Seed Data

Once you have images in the `images` folder, update the seed files to include image uploads:

```typescript
// Example in products.ts
import {uploadImage} from '../uploadImage'

// In your seed function:
const productImage = await uploadImage('./images/products/ak-98-dialysis-machine.jpg', 'ak-98-dialysis-machine.jpg')

export const productsData = [
  {
    _id: 'product-ak-98-dialysis-machine',
    _type: 'product',
    name: 'AK 98 Dialysis Machine',
    mainImage: productImage, // Add the uploaded image
    // ... rest of data
  }
]
```

## Manual Image Upload (Alternative)

If you prefer to add images manually:

1. Run the seed script without images
2. Go to Sanity Studio (http://localhost:3333)
3. Open each document
4. Upload images directly in the Studio UI

## Seed Data Structure

- **siteSettings**: Site-wide configuration (singleton)
- **homepage**: Homepage content (singleton)
- **categories**: 6 medical equipment categories
- **brands**: 6 medical equipment brands
- **products**: 8 products across different categories
- **services**: 6 service offerings
- **blogPosts**: 5 blog articles
- **faqs**: 4 frequently asked questions
- **pages**: About Us page

## Troubleshooting

**Error: "Insufficient permissions"**
- Ensure your SANITY_WRITE_TOKEN has Editor permissions

**Error: "Document not found"**
- Make sure your Sanity schemas match the seed data structure

**Error: "Cannot find module"**
- Run `npm install` in the studio directory

## Next Steps

After seeding:
1. Visit http://localhost:3333 to view your content
2. Add images to documents
3. Customize content as needed
4. Your Next.js frontend will automatically fetch this data
