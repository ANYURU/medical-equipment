# Sanity CMS Setup Guide for Landing Page

## ✅ What We've Integrated

All landing page sections are now managed through Sanity CMS:
- ✅ Partners/Brands Carousel
- ✅ Stats Section
- ✅ Testimonials
- ✅ Why Choose Us Features
- ✅ Mission & Vision
- ✅ Hero Section
- ✅ Enhanced CTA Section

## 🚀 Quick Start

### 1. Start Sanity Studio

```bash
npm run dev:studio
# Access at http://localhost:3333
```

### 2. Create Content in This Order

#### Step 1: Create Partners (4 new documents)
Navigate to: **Content → Partner/Brand → Create**

Create 4-8 partners with:
- **Brand Name**: e.g., "Medtronic", "GE Healthcare"
- **Logo**: Upload brand logo (PNG/SVG, transparent background recommended)
- **Display Order**: 0, 1, 2, 3... (controls carousel order)

**Tip**: Use grayscale logos for best visual effect (component applies grayscale filter)

---

#### Step 2: Create Stats (4 new documents)
Navigate to: **Content → Statistic → Create**

Create 4 stats:

**Stat 1:**
- Value: `13`
- Suffix: `+`
- Label: `Years of Excellence`
- Display Order: `0`

**Stat 2:**
- Value: `50`
- Suffix: `+`
- Label: `Dedicated Employees`
- Display Order: `1`

**Stat 3:**
- Value: `98`
- Suffix: `%`
- Label: `Client Satisfaction`
- Display Order: `2`

**Stat 4:**
- Value: `1000`
- Suffix: `+`
- Label: `Happy Clients`
- Display Order: `3`

---

#### Step 3: Create Features (6 new documents)
Navigate to: **Content → Feature → Create**

Create 6 features:

**Feature 1:**
- Title: `Quality Guaranteed`
- Description: `ISO-certified equipment from world-leading manufacturers with full warranty coverage`
- Icon Name: `shield`
- Display Order: `0`

**Feature 2:**
- Title: `24/7 Support`
- Description: `Round-the-clock technical support and emergency response for critical equipment`
- Icon Name: `clock`
- Display Order: `1`

**Feature 3:**
- Title: `Expert Installation`
- Description: `Professional installation and training by certified technicians for optimal performance`
- Icon Name: `settings`
- Display Order: `2`

**Feature 4:**
- Title: `Flexible Financing`
- Description: `Affordable pricing with flexible payment plans tailored to your budget`
- Icon Name: `dollar`
- Display Order: `3`

**Feature 5:**
- Title: `Complete Documentation`
- Description: `Full compliance support with certifications, manuals, and regulatory documentation`
- Icon Name: `document`
- Display Order: `4`

**Feature 6:**
- Title: `Fast Delivery`
- Description: `Quick turnaround times with efficient logistics across East Africa`
- Icon Name: `lightning`
- Display Order: `5`

---

#### Step 4: Create Testimonials (3 new documents)
Navigate to: **Content → Testimonial → Create**

Create 3 testimonials:

**Testimonial 1:**
- Quote: `Medequip Uganda transformed our ICU with state-of-the-art equipment and exceptional installation service. Their support team is always responsive.`
- Author Name: `Dr. Sarah Namukasa`
- Role/Position: `Head of ICU`
- Facility/Organization: `Mulago Hospital`
- Featured on Homepage: ✅ (checked)
- Display Order: `0`

**Testimonial 2:**
- Quote: `The quality of their medical equipment is outstanding, and their after-sales service is unmatched. We trust them for all our equipment needs.`
- Author Name: `Dr. James Okello`
- Role/Position: `Medical Director`
- Facility/Organization: `Kampala International Hospital`
- Featured on Homepage: ✅ (checked)
- Display Order: `1`

**Testimonial 3:**
- Quote: `From consultation to installation, the entire process was seamless. Their team truly understands the needs of healthcare facilities.`
- Author Name: `Nurse Margaret Achieng`
- Role/Position: `Procurement Manager`
- Facility/Organization: `Nsambya Hospital`
- Featured on Homepage: ✅ (checked)
- Display Order: `2`

---

#### Step 5: Configure Homepage
Navigate to: **Content → Homepage → Edit**

Fill in all sections:

**Hero Section:**
- Title: `Medequip Uganda` (or your site name)
- Subtitle: `Premium medical equipment and supplies for healthcare facilities across Uganda and East Africa. Complete solutions with installation, service, and 24/7 support.`

**Stats Section:**
- Heading: `Why Choose Medequip Uganda`
- Statistics: Select all 4 stats you created

**Partners/Brands Section:**
- Heading: `Authorized Distributors of Leading Brands`
- Partners: Select all partners you created

**Why Choose Us Section:**
- Heading: `Why Healthcare Facilities Choose Us`
- Description: `Comprehensive solutions backed by expertise and reliability`
- Features: Select all 6 features you created

**Mission & Vision Section:**
- Section Heading: `Our Story`
- Description: `Empowering East African Healthcare Since 2011`
- Mission Text: `To provide high-quality, complete medical equipment solutions tailored to our clients' needs, including installation, service, repair, and affordable pricing. We're committed to supporting healthcare facilities with reliable equipment and exceptional service that saves lives.`
- Mission Metric: `98% Support Satisfaction Rate`
- Vision Text: `To lead as the top medical equipment distributor in Africa and beyond, setting the standard for quality, innovation, and customer service. We envision a future where every healthcare facility has access to world-class equipment and support.`
- Vision Metric: `Serving Multiple East African Countries`

**Testimonials Section:**
- Heading: `What Our Clients Say`
- Description: `Trusted by healthcare professionals across East Africa`
- Testimonials: Select all 3 testimonials you created

**Call to Action Section:**
- Heading: `Ready to Equip Your Healthcare Facility?`
- Description: `Get in touch with our team to discuss your equipment needs and receive a customized quote. We're here to support your mission of delivering exceptional healthcare.`
- Primary Button Text: `Request a Call Back`
- Primary Button Link: `/contact`
- Secondary Button Text: `Browse Products`
- Secondary Button Link: `/products`

---

## 🎨 Logo Upload Tips

### For Partner Logos:
1. **Format**: PNG with transparent background (preferred) or SVG
2. **Size**: 400x200px recommended (will be resized automatically)
3. **Style**: Grayscale or color (component applies grayscale filter with color on hover)
4. **Quality**: High resolution for crisp display

### Where to Find Logos:
- Official brand websites (press/media kits)
- [Brandfetch.com](https://brandfetch.com)
- [Seeklogo.com](https://seeklogo.com)

---

## 🔄 How It Works

### Fallback System
If no content is added to Sanity, the site displays default hardcoded data. Once you add content:
- ✅ Sanity data takes priority
- ✅ Components sort by `order` field
- ✅ Changes reflect immediately (ISR revalidation)

### Content Updates
1. Edit content in Sanity Studio
2. Click **Publish**
3. Changes appear on site within seconds (Next.js ISR)

---

## 📝 Content Management Best Practices

### Display Order
- Use increments of 10 (0, 10, 20, 30...) to allow easy reordering
- Lower numbers appear first

### Writing Tips
- **Stats**: Keep labels short (2-4 words)
- **Features**: Descriptions should be 10-15 words
- **Testimonials**: Quotes should be 20-40 words for best layout
- **Mission/Vision**: 40-60 words each

### Image Guidelines
- **Partners**: Logos only, no text overlays
- **Testimonials**: Optional photos (square crop, 400x400px)

---

## 🚨 Troubleshooting

### Content Not Showing?
1. Check if Homepage document exists and is published
2. Verify references are selected (not just created)
3. Clear browser cache
4. Check browser console for errors

### Images Not Loading?
1. Ensure images are published in Sanity
2. Check image file size (< 5MB recommended)
3. Verify SANITY_PROJECT_ID in `.env.local`

### Wrong Order?
- Check `Display Order` field (lower = first)
- Ensure all items have unique order numbers

---

## 🎯 Next Steps

After populating content:

1. **Test**: View site at `http://localhost:3000`
2. **Refine**: Adjust copy, images, order as needed
3. **Deploy**: Push to production when satisfied
4. **Train**: Show team how to update content

---

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Image Optimization Guide](https://www.sanity.io/docs/image-urls)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

## 💡 Pro Tips

1. **Batch Create**: Create all partners first, then reference them in Homepage
2. **Preview**: Use Sanity's preview feature before publishing
3. **Backup**: Export content regularly (Tools → Export)
4. **Collaborate**: Invite team members with appropriate roles
5. **Schedule**: Use Sanity's scheduling feature for timed updates (paid feature)

---

## 🎉 You're All Set!

Your landing page is now fully CMS-powered. Non-technical team members can update:
- Partner logos
- Statistics
- Testimonials
- Features
- Mission/Vision
- All copy and CTAs

No code changes needed! 🚀
