import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg text-foreground mb-4">PawMatch</h3>
            <p className="text-foreground/70 text-sm">
              Connecting pets with loving families. Making adoption simple and joyful.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-foreground/70 hover:text-foreground transition text-sm">Browse Pets</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-foreground transition text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-foreground/70 hover:text-foreground transition text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-foreground/70 hover:text-foreground transition text-sm">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-foreground/70 hover:text-foreground transition text-sm">Cookies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition text-sm">Facebook</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition text-sm">Instagram</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition text-sm">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <p className="text-center text-foreground/60 text-sm">
            2024 PawMatch. All rights reserved. Helping pets find their forever homes.
          </p>
        </div>
      </div>
    </footer>
  )
}
