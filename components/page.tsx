'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ALL_PETS = [
  { id: 1, name: 'Luna', type: 'Dog', breed: 'Golden Retriever', age: 2, image: '/placeholder.svg?key=2ynvh', adoptionFee: 250 },
  { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Persian', age: 3, image: '/placeholder.svg?key=tbbis', adoptionFee: 150 },
  { id: 3, name: 'Max', type: 'Dog', breed: 'German Shepherd', age: 4, image: '/placeholder.svg?key=7a8sx', adoptionFee: 300 },
  { id: 4, name: 'Bella', type: 'Cat', breed: 'Siamese', age: 1, image: '/placeholder.svg?key=f48b0', adoptionFee: 120 },
  { id: 5, name: 'Charlie', type: 'Dog', breed: 'Labrador', age: 2, image: '/placeholder.svg?key=9rsru', adoptionFee: 280 },
  { id: 6, name: 'Mittens', type: 'Cat', breed: 'Orange Tabby', age: 2, image: '/placeholder.svg?key=ob0j4', adoptionFee: 100 },
]

type SortOption = 'name' | 'age' | 'fee-low' | 'fee-high'

export default function BrowsePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 10])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = ALL_PETS

    // Filter by type
    if (selectedType) {
      result = result.filter(pet => pet.type === selectedType)
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by age range
    result = result.filter(pet => pet.age >= ageRange[0] && pet.age <= ageRange[1])

    // Filter by price range
    result = result.filter(pet => pet.adoptionFee >= priceRange[0] && pet.adoptionFee <= priceRange[1])

    // Sort results
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'age':
        result.sort((a, b) => a.age - b.age)
        break
      case 'fee-low':
        result.sort((a, b) => a.adoptionFee - b.adoptionFee)
        break
      case 'fee-high':
        result.sort((a, b) => b.adoptionFee - a.adoptionFee)
        break
    }

    return result
  }, [selectedType, searchTerm, ageRange, priceRange, sortBy])

  const handleResetFilters = () => {
    setSelectedType(null)
    setSearchTerm('')
    setAgeRange([0, 10])
    setPriceRange([0, 500])
    setSortBy('name')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-balance">Browse Available Pets</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">Filters</h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden text-primary hover:underline text-sm font-semibold"
                  >
                    {showFilters ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Name or breed..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                    />
                  </div>

                  {/* Pet Type */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Pet Type</label>
                    <div className="space-y-2">
                      {['All', 'Dog', 'Cat'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            checked={selectedType === (type === 'All' ? null : type)}
                            onChange={() => setSelectedType(type === 'All' ? null : type)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-foreground">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Age Range: {ageRange[0]} - {ageRange[1]} years
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={ageRange[0]}
                      onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={ageRange[1]}
                      onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                      className="w-full mt-2"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Fee Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full mt-2"
                    />
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="age">Age (Youngest First)</option>
                      <option value="fee-low">Fee (Low to High)</option>
                      <option value="fee-high">Fee (High to Low)</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleResetFilters}
                    variant="outline"
                    className="w-full text-foreground hover:text-foreground"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-foreground/60">
                  Showing <span className="font-semibold">{filtered.length}</span> pet{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                          <p className="text-sm text-foreground/70">{pet.type} • {pet.breed}</p>
                          <p className="text-sm text-foreground/70">Age: {pet.age} years</p>
                          <p className="text-lg font-semibold text-primary mt-2">${pet.adoptionFee}</p>
                        </div>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Link href={`/pet/${pet.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-foreground/60 text-lg mb-4">No pets found matching your criteria.</p>
                  <Button
                    onClick={handleResetFilters}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
