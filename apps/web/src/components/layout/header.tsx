'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {MobileNav} from './mobile-nav'
import {MainNav} from './main-nav'
import {HeaderSearch} from './header-search'
import {useScroll} from '@/hooks/use-scroll'

interface HeaderProps {
  products?: any[]
  categories?: any[]
}

export function Header({ products, categories }: HeaderProps) {
  const scrolled = useScroll(10)
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b shadow-sm' 
        : 'bg-transparent'
    }`}>
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <span className="text-xl font-bold">MedEquip</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            BETA
          </span>
        </Link>
        
        <div className="flex-1 flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              <MainNav products={products} categories={categories} />
            </div>

            <div className="flex items-center gap-4 ml-auto">
              {/* Search */}
              <HeaderSearch />
              
              {/* CTA Button */}
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden ml-4">
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}
