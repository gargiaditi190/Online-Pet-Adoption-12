import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">PawMatch</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/browse" className="text-foreground/80 hover:text-foreground transition">Browse Pets</Link>
          <Link href="/about" className="text-foreground/80 hover:text-foreground transition">About</Link>
          <Link href="/contact" className="text-foreground/80 hover:text-foreground transition">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
