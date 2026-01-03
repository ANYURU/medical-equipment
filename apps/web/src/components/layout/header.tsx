import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {MobileNav} from './mobile-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">MedEquip</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex md:gap-6">
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
              Categories
            </Link>
            <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/contact">Contact</Link>
          </Button>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  )
}
