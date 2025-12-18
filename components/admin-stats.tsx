'use client'

import { Card } from '@/components/ui/card'

// Mock statistics
const STATS = [
  { label: 'Total Pets', value: '2.5K', change: '+12%', color: 'from-primary' },
  { label: 'Adoption Applications', value: '1.2K', change: '+23%', color: 'from-accent' },
  { label: 'Completed Adoptions', value: '850', change: '+8%', color: 'from-secondary' },
  { label: 'Active Users', value: '3.4K', change: '+15%', color: 'from-primary' },
]

const RECENT_APPLICATIONS = [
  { id: 1, petName: 'Luna', userName: 'John Doe', status: 'pending', date: '2024-01-15' },
  { id: 2, petName: 'Whiskers', userName: 'Jane Smith', status: 'approved', date: '2024-01-14' },
  { id: 3, petName: 'Max', userName: 'Bob Johnson', status: 'pending', date: '2024-01-13' },
  { id: 4, petName: 'Bella', userName: 'Alice Brown', status: 'rejected', date: '2024-01-12' },
]

export function AdminStats() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6 bg-gradient-to-br from-background to-card">
            <p className="text-sm text-foreground/60 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {RECENT_APPLICATIONS.map((app) => (
              <div key={app.id} className="flex items-center justify-between border-b border-border pb-4 last:border-b-0">
                <div>
                  <p className="font-semibold text-foreground">{app.petName}</p>
                  <p className="text-sm text-foreground/60">{app.userName} • {app.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  app.status === 'approved' ? 'bg-green-100 text-green-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pet Status Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Available</span>
                <span className="text-sm text-foreground/60">1,850 (74%)</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '74%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Pending Review</span>
                <span className="text-sm text-foreground/60">450 (18%)</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Adopted</span>
                <span className="text-sm text-foreground/60">200 (8%)</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
