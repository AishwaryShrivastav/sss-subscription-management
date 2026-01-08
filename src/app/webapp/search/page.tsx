'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubscriberTable } from '@/components/subscribers/SubscriberTable'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { Subscriber } from '@/types/database'

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    first_name: searchParams.get('first_name') || '',
    last_name: searchParams.get('last_name') || '',
    subscriber_id: searchParams.get('subscriber_id') || '',
    mobile: searchParams.get('mobile') || '',
    status: searchParams.get('status') || 'active',
  })
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'))
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  })

  const fetchSubscribers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      params.append('page', page.toString())
      params.append('limit', '10')

      const response = await fetch(`/api/subscribers?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch subscribers')

      const data = await response.json()
      setSubscribers(data.data)
      setTotalPages(data.totalPages)
      setTotalCount(data.count)

      // Update URL without reload
      router.replace(`/webapp/search?${params.toString()}`, { scroll: false })
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchSubscribers()
  }

  const handleDelete = async () => {
    if (!deleteModal.id) return

    try {
      const response = await fetch(`/api/subscribers/${deleteModal.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete subscriber')

      setDeleteModal({ isOpen: false, id: null })
      fetchSubscribers()
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      alert('Failed to delete subscriber')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Subscribers</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              label="First Name"
              name="first_name"
              value={filters.first_name}
              onChange={(e) => setFilters({ ...filters, first_name: e.target.value })}
            />
            <Input
              label="Last Name"
              name="last_name"
              value={filters.last_name}
              onChange={(e) => setFilters({ ...filters, last_name: e.target.value })}
            />
            <Input
              label="Subscriber ID"
              name="subscriber_id"
              value={filters.subscriber_id}
              onChange={(e) => setFilters({ ...filters, subscriber_id: e.target.value })}
            />
            <Input
              label="Mobile"
              name="mobile"
              value={filters.mobile}
              onChange={(e) => setFilters({ ...filters, mobile: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="p-6">
              <div className="mb-4 text-sm text-gray-600">
                Showing {subscribers.length} of {totalCount} subscribers
              </div>
              <SubscriberTable subscribers={subscribers} onDelete={(id) => setDeleteModal({ isOpen: true, id })} />
            </div>
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <Button
                  variant="secondary"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        title="Delete Subscriber"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this subscriber? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8"><div className="text-center text-gray-500">Loading...</div></div>}>
      <SearchPageContent />
    </Suspense>
  )
}

