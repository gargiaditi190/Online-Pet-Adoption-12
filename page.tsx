'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock pet data
const MOCK_PETS: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Luna',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    gender: 'Female',
    weight: '65 lbs',
    color: 'Golden',
    image: '/golden-retriever.png',
    description: 'Luna is a sweet and energetic Golden Retriever who loves playing fetch and swimming. She is great with kids and other dogs. Luna would make an excellent family companion.',
    vaccinated: true,
    neutered: true,
    adoptionFee: 250,
  },
  '2': {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Persian',
    age: 3,
    gender: 'Male',
    weight: '10 lbs',
    color: 'White',
    image: '/fluffy-persian-cat.png',
    description: 'Whiskers is a calm and affectionate Persian cat who enjoys lounging in sunny spots. He prefers a quiet home and would be perfect for someone looking for a peaceful companion.',
    vaccinated: true,
    neutered: true,
    adoptionFee: 150,
  },
}

export default function PetDetail() {
  const params = useParams()
  const petId = params?.id as string
  const pet = MOCK_PETS[petId] || MOCK_PETS['1']
  const [applied, setApplied] = useState(false)

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/" className="text-primary hover:underline mb-6 inline-block">
            ← Back Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={pet.image || "/placeholder.svg"}
                alt={pet.name}
                className="w-full rounded-lg shadow-lg mb-4"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{pet.name}</h1>
              
              <Card className="p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/60">Type</p>
                    <p className="font-semibold text-foreground">{pet.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Breed</p>
                    <p className="font-semibold text-foreground">{pet.breed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Age</p>
                    <p className="font-semibold text-foreground">{pet.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Gender</p>
                    <p className="font-semibold text-foreground">{pet.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Weight</p>
                    <p className="font-semibold text-foreground">{pet.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Color</p>
                    <p className="font-semibold text-foreground">{pet.color}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-6 bg-secondary/10">
                <h3 className="font-semibold text-foreground mb-3">Health Status</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 font-bold">✓</span>
                    {pet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 font-bold">✓</span>
                    {pet.neutered ? 'Neutered/Spayed' : 'Not Neutered/Spayed'}
                  </p>
                </div>
              </Card>

              <div className="mb-6">
                <p className="text-lg font-semibold text-foreground mb-2">Adoption Fee</p>
                <p className="text-3xl font-bold text-primary">${pet.adoptionFee}</p>
              </div>

              {!applied ? (
                <Button
                  onClick={() => setApplied(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                >
                  Apply to Adopt
                </Button>
              ) : (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                  <p className="font-semibold">Application submitted!</p>
                  <p className="text-sm mt-1">We will contact you soon to discuss your adoption.</p>
                </div>
              )}
            </div>
          </div>

          <Card className="mt-8 p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">About {pet.name}</h2>
            <p className="text-foreground/80 leading-relaxed">{pet.description}</p>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
