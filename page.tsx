'use client'

import { useState } from 'react'
import { AdminHeader } from '@/components/admin-header'
import { PetManagement } from '@/components/admin-pet-management'
import { ApplicationsReview } from '@/components/admin-applications'
import { AdminStats } from '@/components/admin-stats'

type AdminTab = 'dashboard' | 'pets' | 'applications'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  return (
    <>
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="min-h-screen bg-background">
        {activeTab === 'dashboard' && <AdminStats />}
        {activeTab === 'pets' && <PetManagement />}
        {activeTab === 'applications' && <ApplicationsReview />}
      </main>
    </>
  )
}
