'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: number
  status: string
}

const MOCK_PETS: Pet[] = [
  { id: 1, name: 'Luna', type: 'Dog', breed: 'Golden Retriever', age: 2, status: 'available' },
  { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Persian', age: 3, status: 'available' },
  { id: 3, name: 'Max', type: 'Dog', breed: 'German Shepherd', age: 4, status: 'pending' },
  { id: 4, name: 'Bella', type: 'Cat', breed: 'Siamese', age: 1, status: 'available' },
]

export function PetManagement() {
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
  })

  const handleAddPet = () => {
    if (!formData.name || !formData.breed || !formData.age) {
      alert('Please fill in all fields')
      return
    }

    if (editingId) {
      setPets(pets.map(p => 
        p.id === editingId 
          ? { ...p, ...formData, age: parseInt(formData.age) }
          : p
      ))
      setEditingId(null)
    } else {
      setPets([...pets, {
        id: Math.max(...pets.map(p => p.id), 0) + 1,
        ...formData,
        age: parseInt(formData.age),
        status: 'available'
      }])
    }

    setFormData({ name: '', type: 'Dog', breed: '', age: '' })
    setShowForm(false)
  }

  const handleEdit = (pet: Pet) => {
    setFormData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age.toString(),
    })
    setEditingId(pet.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this pet?')) {
      setPets(pets.filter(p => p.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-foreground">Manage Pets</h1>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            if (showForm) setEditingId(null)
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {showForm ? 'Cancel' : '+ Add New Pet'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Pet' : 'Add New Pet'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Pet Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Hamster</option>
            </select>
            <input
              type="text"
              placeholder="Breed"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
            <input
              type="number"
              placeholder="Age (years)"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
          </div>
          <Button
            onClick={handleAddPet}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          >
            {editingId ? 'Update Pet' : 'Add Pet'}
          </Button>
        </Card>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Breed</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Age</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id} className="border-b border-border hover:bg-secondary/10 transition">
                <td className="py-4 px-4 text-foreground">{pet.name}</td>
                <td className="py-4 px-4 text-foreground">{pet.type}</td>
                <td className="py-4 px-4 text-foreground">{pet.breed}</td>
                <td className="py-4 px-4 text-foreground">{pet.age}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    pet.status === 'available' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 flex gap-2">
                  <Button
                    onClick={() => handleEdit(pet)}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(pet.id)}
                    variant="outline"
                    size="sm"
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
