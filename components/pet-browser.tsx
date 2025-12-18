'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock pet data - will be replaced with database integration
const MOCK_PETS = [
  { id: 1, name: 'Luna', type: 'Dog', breed: 'Golden Retriever', age: 2, image: '/golden-retriever.png' },
  { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Persian', age: 3, image: '/fluffy-persian-cat.png' },
  { id: 3, name: 'Max', type: 'Dog', breed: 'German Shepherd', age: 4, image: '/majestic-german-shepherd.png' },
  { id: 4, name: 'Bella', type: 'Cat', breed: 'Siamese', age: 1, image: '/siamese-cat.png' },
  { id: 5, name: 'Charlie', type: 'Dog', breed: 'Labrador', age: 2, image: '/labrador-dog.png' },
  { id: 6, name: 'Mittens', type: 'Cat', breed: 'Orange Tabby', age: 2, image: '/orange-tabby-cat.png' },
]

export function PetBrowser() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filtered = selectedType
    ? MOCK_PETS.filter(pet => pet.type === selectedType)
    : MOCK_PETS

  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Meet Our Available Pets
          </h2>
          <p className="text-foreground/70 text-balance mb-8">
            Browse our collection of wonderful pets ready for adoption
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedType === null ? 'default' : 'outline'}
              onClick={() => setSelectedType(null)}
              className={selectedType === null ? 'bg-primary text-primary-foreground' : ''}
            >
              All Pets
            </Button>
            <Button
              variant={selectedType === 'Dog' ? 'default' : 'outline'}
              onClick={() => setSelectedType('Dog')}
              className={selectedType === 'Dog' ? 'bg-primary text-primary-foreground' : ''}
            >
              Dogs
            </Button>
            <Button
              variant={selectedType === 'Cat' ? 'default' : 'outline'}
              onClick={() => setSelectedType('Cat')}
              className={selectedType === 'Cat' ? 'bg-primary text-primary-foreground' : ''}
            >
              Cats
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(pet => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden bg-secondary/20 h-48">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-foreground mb-2">{pet.name}</h3>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">Type:</span> {pet.type}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">Breed:</span> {pet.breed}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">Age:</span> {pet.age} years
                  </p>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={`/pet/${pet.id}`}>View Details</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
