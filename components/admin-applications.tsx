'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Application {
  id: number
  petName: string
  petId: number
  userName: string
  userEmail: string
  userPhone: string
  status: 'pending' | 'approved' | 'rejected'
  date: string
  reason?: string
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    petName: 'Luna',
    petId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '555-0101',
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: 2,
    petName: 'Whiskers',
    petId: 2,
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    userPhone: '555-0102',
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: 3,
    petName: 'Max',
    petId: 3,
    userName: 'Bob Johnson',
    userEmail: 'bob@example.com',
    userPhone: '555-0103',
    status: 'approved',
    date: '2024-01-13',
  },
]

export function ApplicationsReview() {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')

  const handleApprove = (id: number) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'approved' } : app
    ))
    setSelectedApp(null)
  }

  const handleReject = (id: number) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'rejected', reason: rejectionReason } : app
    ))
    setRejectionReason('')
    setSelectedApp(null)
  }

  const pendingApplications = applications.filter(app => app.status === 'pending')
  const approvedApplications = applications.filter(app => app.status === 'approved')
  const rejectedApplications = applications.filter(app => app.status === 'rejected')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Adoption Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800 font-semibold">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-900">{pendingApplications.length}</p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm text-green-800 font-semibold">Approved</p>
          <p className="text-3xl font-bold text-green-900">{approvedApplications.length}</p>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-800 font-semibold">Rejected</p>
          <p className="text-3xl font-bold text-red-900">{rejectedApplications.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Pending Applications</h2>
            <div className="space-y-3">
              {pendingApplications.length > 0 ? (
                pendingApplications.map(app => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/10 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{app.userName}</p>
                        <p className="text-sm text-foreground/60">Applied for: {app.petName} • {app.date}</p>
                      </div>
                      <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        Pending
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-foreground/60 py-8 text-center">No pending applications</p>
              )}
            </div>
          </Card>
        </div>

        {selectedApp && (
          <Card className="p-6 h-fit sticky top-20">
            <h3 className="text-xl font-bold text-foreground mb-4">Application Details</h3>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-foreground/60">Name</p>
                <p className="font-semibold text-foreground">{selectedApp.userName}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Email</p>
                <p className="font-semibold text-foreground">{selectedApp.userEmail}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Phone</p>
                <p className="font-semibold text-foreground">{selectedApp.userPhone}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Pet Interested In</p>
                <p className="font-semibold text-foreground">{selectedApp.petName}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Application Date</p>
                <p className="font-semibold text-foreground">{selectedApp.date}</p>
              </div>
            </div>

            {selectedApp.status === 'pending' && (
              <div className="space-y-3">
                <textarea
                  placeholder="Rejection reason (optional)"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  rows={3}
                />
                <Button
                  onClick={() => handleApprove(selectedApp.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Application
                </Button>
                <Button
                  onClick={() => handleReject(selectedApp.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Reject Application
                </Button>
              </div>
            )}

            {selectedApp.status === 'approved' && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                <p className="font-semibold">Approved</p>
                <p className="text-sm mt-1">This application has been approved.</p>
              </div>
            )}

            {selectedApp.status === 'rejected' && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
                <p className="font-semibold">Rejected</p>
                <p className="text-sm mt-1">{selectedApp.reason || 'This application has been rejected.'}</p>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
