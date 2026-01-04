"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navItems } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuContent = open ? (
    <>
      <div
        className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={() => setOpen(false)}
      />
      <div className="fixed inset-y-0 left-0 z-9999 w-[85vw] max-w-xs bg-white dark:bg-zinc-950 md:hidden flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600"
            onClick={() => setOpen(false)}
          >
            MedSupply
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="-mr-2"
          >
            <span className="sr-only">Close menu</span>
            <div className="relative h-5 w-5">
              <span className="absolute left-0 top-2 h-0.5 w-5 bg-current rotate-45" />
              <span className="absolute left-0 top-2 h-0.5 w-5 bg-current -rotate-45" />
            </div>
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="search"
              placeholder="Search equipment..."
              className="w-full h-10 px-3 pl-9 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-foreground hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    {/* Simple icons based on title logic - could be mapped better */}
                    {item.title === "Home" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    {item.title === "Products" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    )}
                    {item.title === "Brands" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    )}
                    {item.title === "Services" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                    {item.title === "About" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {item.title === "Contact" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}

                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t mt-auto">
          <Button
            asChild
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Link href="/contact" onClick={() => setOpen(false)}>
              Request Quote
            </Link>
          </Button>
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        <div className="relative h-5 w-5">
          <span
            className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "rotate-45 top-2" : ""}`}
          />
          <span
            className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "-rotate-45 top-2" : ""}`}
          />
        </div>
        <span className="sr-only">Toggle menu</span>
      </Button>

      {mounted && menuContent && createPortal(menuContent, document.body)}
    </>
  );
}
