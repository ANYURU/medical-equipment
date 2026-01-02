# Sanity CMS Guide

A non-technical guide for content editors and managers to use the Sanity Studio CMS.

## Accessing Sanity Studio

### Local Development
Visit: http://localhost:3333

### Production
Visit: https://your-project.sanity.studio

### Login
Use your Google or GitHub account to sign in.

## Content Types Overview

### Singletons (One per site)

#### Site Settings
Global website configuration:
- **Site Name**: Your website name
- **Site URL**: Your website URL
- **Logo**: Upload your logo image
- **Favicon**: Upload favicon (small icon for browser tabs)
- **Contact Info**: Email, phone, address, working hours
- **Social Links**: Facebook, Twitter, LinkedIn, Instagram, YouTube
- **Footer Text**: Text appearing in website footer

#### Homepage
Main landing page content:
- **Hero Section**: Large banner with heading, image, and call-to-action
- **Featured Categories**: Select up to 8 categories to highlight
- **Featured Brands**: Select up to 12 brands to showcase
- **Services Section**: Highlight your services
- **CTA Section**: Call-to-action with buttons

### Regular Content

#### Categories
Product categories (e.g., "Diagnostic Equipment", "Surgical Instruments"):
- **Title**: Category name
- **Slug**: URL-friendly name (auto-generated)
- **Description**: Brief description
- **Image**: Category image
- **Icon**: Small icon (optional)
- **Content**: Detailed information (rich text)
- **Products**: Link products to this category
- **Related Brands**: Associate brands
- **Display Order**: Number for sorting (0 = first)

#### Brands
Equipment manufacturers (e.g., "Philips", "GE Healthcare"):
- **Name**: Brand name
- **Slug**: URL-friendly name
- **Logo**: Brand logo (required)
- **Description**: Brief description
- **Content**: Detailed brand information
- **Website**: Brand's official website
- **Banner Image**: Large header image
- **Country**: Country of origin
- **Certifications**: List of certifications
- **Featured**: Mark as featured brand
- **Display Order**: Sorting number

#### Products
Individual medical equipment items:
- **Name**: Product name
- **Slug**: URL-friendly name
- **SKU**: Product code/identifier
- **Description**: Short description
- **Content**: Detailed product information
- **Main Image**: Primary product image (required)
- **Gallery**: Additional product images
- **Brand**: Select brand
- **Categories**: Select one or more categories (required)
- **Specifications**: Key specs (label + value pairs)
- **Features**: Bullet points of key features
- **Applications**: Use cases
- **Documents**: Upload brochures, manuals, datasheets
- **Featured**: Mark as featured product
- **Status**: Available, Coming Soon, or Discontinued

#### Services
Services you offer (e.g., "Equipment Installation", "Maintenance"):
- **Title**: Service name
- **Slug**: URL-friendly name
- **Subtitle**: Short tagline
- **Description**: Brief description
- **Icon**: Small icon
- **Image**: Service image
- **Content**: Detailed service information
- **Features**: Key features with descriptions
- **Benefits**: List of benefits
- **Related Products**: Link relevant products
- **Related Brands**: Link relevant brands
- **Display Order**: Sorting number

#### Blog Posts
News, articles, and updates:
- **Title**: Post title
- **Slug**: URL-friendly name
- **Excerpt**: Short summary (required)
- **Featured Image**: Main image (required)
- **Content**: Full article content
- **Author**: Author name
- **Published At**: Publication date/time
- **Categories**: Link to relevant categories
- **Related Products**: Link relevant products
- **Tags**: Keywords for organization
- **Featured**: Mark as featured post

#### Pages
Custom pages (e.g., "About Us", "Contact"):
- **Title**: Page title
- **Slug**: URL-friendly name
- **Subtitle**: Optional subtitle
- **Content**: Page content (rich text)
- **Featured Image**: Header image
- **Template**: Page layout (default, about, contact, faq)
- **Show in Navigation**: Display in main menu
- **Navigation Order**: Menu position (if shown)
- **Parent Page**: Create page hierarchy

#### FAQs
Frequently asked questions:
- **Question**: The question
- **Answer**: The answer (rich text)
- **Category**: general, products, services, ordering, support
- **Display Order**: Sorting number

## Common Tasks

### Creating New Content

1. Click the content type in the left sidebar
2. Click "Create" button (+ icon)
3. Fill in required fields (marked with *)
4. Add optional fields as needed
5. Click "Publish" button

### Editing Existing Content

1. Click the content type in the left sidebar
2. Find and click the item to edit
3. Make your changes
4. Click "Publish" to save changes

### Uploading Images

1. Click the image field
2. Click "Upload" or drag and drop
3. Wait for upload to complete
4. Add alt text (description for accessibility)
5. Adjust hotspot (focal point) if needed

### Adding Rich Text Content

The content editor supports:
- **Headings**: H2, H3, H4
- **Text formatting**: Bold, italic, underline
- **Lists**: Bullet points and numbered lists
- **Links**: Internal and external links
- **Images**: Embed images with captions
- **Quotes**: Blockquotes

### Linking Content

When you see a "reference" field:
1. Click the field
2. Search for the item to link
3. Select from results
4. Item is now linked

### Organizing Content

**Display Order**: Lower numbers appear first (0, 1, 2...)
**Featured**: Toggle to highlight important items
**Categories/Tags**: Use for filtering and organization

## Best Practices

### Images

- **Size**: Upload high-quality images (at least 1200px wide)
- **Format**: Use JPG for photos, PNG for logos/graphics
- **Alt Text**: Always add descriptive alt text
- **File Names**: Use descriptive names before uploading

### Writing Content

- **Titles**: Clear, descriptive, under 60 characters
- **Descriptions**: Concise, informative, 150-160 characters
- **Content**: Break into sections with headings
- **Links**: Use descriptive link text (not "click here")

### SEO Fields

Each content type has SEO fields:
- **Meta Title**: 50-60 characters, include keywords
- **Meta Description**: 150-160 characters, compelling summary
- **OG Image**: 1200x630px for social media sharing
- **Keywords**: 3-5 relevant keywords

### Slugs

- Auto-generated from titles
- Can be edited before first publish
- Use lowercase, hyphens, no spaces
- Don't change after publishing (breaks URLs)

## Content Workflow

### Draft → Review → Publish

1. **Draft**: Create and edit content
2. **Review**: Check for errors, test links
3. **Publish**: Make live on website

### Unpublishing Content

1. Open the document
2. Click the menu (three dots)
3. Select "Unpublish"
4. Confirm

### Deleting Content

1. Open the document
2. Click the menu (three dots)
3. Select "Delete"
4. Confirm (cannot be undone!)

## Troubleshooting

### Can't Publish

- Check for required fields (marked with *)
- Ensure all validation rules are met
- Check for error messages

### Image Won't Upload

- Check file size (max 10MB recommended)
- Check file format (JPG, PNG, GIF, WebP)
- Try a different browser
- Check internet connection

### Changes Not Showing on Website

- Wait 1-2 minutes for cache to clear
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check if content is published (not draft)

### Lost Work

- Sanity auto-saves frequently
- Check document history (clock icon)
- Restore previous version if needed

## Keyboard Shortcuts

- **Ctrl/Cmd + S**: Save draft
- **Ctrl/Cmd + Enter**: Publish
- **Ctrl/Cmd + B**: Bold text
- **Ctrl/Cmd + I**: Italic text
- **Ctrl/Cmd + K**: Add link

## Getting Help

- Check this guide first
- Ask your technical team
- Contact Sanity support: https://www.sanity.io/help

## Tips for Success

1. **Save Often**: Click "Save" regularly while editing
2. **Preview**: Use preview mode to see how content looks
3. **Consistency**: Use consistent naming and formatting
4. **Organization**: Use categories and tags effectively
5. **Quality**: Prioritize quality over quantity
6. **Mobile**: Remember content appears on mobile devices
7. **Accessibility**: Always add alt text to images
8. **SEO**: Fill in SEO fields for better search rankings

## Content Checklist

Before publishing:
- [ ] All required fields filled
- [ ] Images uploaded with alt text
- [ ] Links tested and working
- [ ] Spelling and grammar checked
- [ ] SEO fields completed
- [ ] Preview looks correct
- [ ] Categories/tags added
- [ ] Display order set (if applicable)
