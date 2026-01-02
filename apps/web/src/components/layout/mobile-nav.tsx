'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Menu} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Sheet, SheetContent, SheetTrigger, SheetTitle} from '@/components/ui/sheet'
import {navItems} from '@/config/site'
import {VisuallyHidden} from '@radix-ui/react-visually-hidden'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg hover:text-foreground/80 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
