import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      
    </div>
  )
}