import { Sidebar } from '@/components/layout/Sidebar'

export default function WebAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 w-64">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto bg-gray-50">
        {children}
      </div>
    </div>
  )
}

