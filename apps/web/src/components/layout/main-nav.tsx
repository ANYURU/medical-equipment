'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Search } from 'lucide-react'

const products = [
  {
    title: 'Diagnostic Equipment',
    href: '/categories/diagnostic-equipment',
    description: 'Ultrasound machines, X-ray systems, and patient monitors.',
  },
  {
    title: 'Surgical Instruments',
    href: '/categories/surgical-instruments',
    description: 'High-precision tools for general and specialized surgery.',
  },
  {
    title: 'Life Support',
    href: '/categories/life-support',
    description: 'Ventilators, anesthesia machines, and defibrillators.',
  },
  {
    title: 'Hospital Furniture',
    href: '/categories/hospital-furniture',
    description: 'Beds, trolleys, and examination tables for clinics.',
  },
]

const categories = [
  { title: "Imaging", href: "/categories/imaging" },
  { title: "Laboratory", href: "/categories/laboratory" },
  { title: "Emergency", href: "/categories/emergency" },
  { title: "Dental", href: "/categories/dental" },
  { title: "Orthopedic", href: "/categories/orthopedic" },
  { title: "Consumables", href: "/categories/consumables" },
]

interface MainNavProps {
  products?: { title: string; href: string; description?: string }[]
  categories?: { title: string; href: string }[]
}

export function MainNav({ products: sanityProducts, categories: sanityCategories }: MainNavProps) {
  const displayProducts = sanityProducts?.length ? sanityProducts : products
  const displayCategories = sanityCategories?.length ? sanityCategories : categories

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Products Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-600 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                    href="/products"
                  >
                    <Search className="h-6 w-6 text-white" />
                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                      Browse Catalog
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      Explore our full range of certified medical equipment and supplies.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {displayProducts.map((product) => (
                <ListItem
                  key={product.title}
                  title={product.title}
                  href={product.href}
                >
                  {product.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Categories Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {displayCategories.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  View all {component.title.toLowerCase()} equipment
                </ListItem>
              ))}
              <div className="col-span-2 pt-2 border-t">
                <NavigationMenuLink asChild>
                   <Link href="/categories" className="flex items-center justify-center p-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                     View All Categories →
                   </Link>
                </NavigationMenuLink>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/services" className={`${navigationMenuTriggerStyle()} bg-transparent`}>
              Services
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about" className={`${navigationMenuTriggerStyle()} bg-transparent`}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact" className={`${navigationMenuTriggerStyle()} bg-transparent`}>
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
