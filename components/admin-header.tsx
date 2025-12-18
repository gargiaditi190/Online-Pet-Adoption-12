import Link from 'next/link'
import { Button } from '@/components/ui/button'

type AdminTab = 'dashboard' | 'pets' | 'applications'

interface AdminHeaderProps {
  activeTab: AdminTab
  setActiveTab: (tab: AdminTab) => void
}

export function AdminHeader({ activeTab, setActiveTab }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-bold text-lg hidden sm:inline">PawMatch Admin</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'}
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'pets' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('pets')}
              className={activeTab === 'pets' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'}
            >
              Manage Pets
            </Button>
            <Button
              variant={activeTab === 'applications' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('applications')}
              className={activeTab === 'applications' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'}
            >
              Applications
            </Button>
          </nav>

          <Button variant="outline" asChild>
            <Link href="/">Exit Admin</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
