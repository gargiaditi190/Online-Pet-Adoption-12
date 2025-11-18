import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { PetBrowser } from '@/components/pet-browser'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PetBrowser />
      </main>
      <Footer />
    </>
  )
}
