export const siteConfig = {
  name: 'Medical Equipment Supply',
  description: 'Premium medical equipment supplier',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  links: {
    github: 'https://github.com/ANYURU/medical-equipment',
  },
}

export const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Brands', href: '/brands' },
  { title: 'Services', href: '/services' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]
