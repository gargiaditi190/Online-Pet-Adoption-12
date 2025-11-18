import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="text-balance text-5xl md:text-6xl font-bold text-foreground">
            Find Your Perfect Pet
          </div>
          <p className="text-xl text-foreground/70 max-w-2xl text-balance">
            Connect with loving pets waiting for their forever homes. Adoption made simple, rewarding, and full of joy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/browse">Browse Pets Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">2.5K+</div>
              <p className="text-sm text-foreground/60">Pets Available</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-accent">1.2K+</div>
              <p className="text-sm text-foreground/60">Happy Families</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-secondary">95%</div>
              <p className="text-sm text-foreground/60">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
