'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SubscriberForm } from '@/components/subscribers/SubscriberForm'
import type { SubscriberFormData } from '@/utils/validation'
import type { Subscriber } from '@/types/database'

export default function EditSubscriberPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const response = await fetch(`/api/subscribers/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch subscriber')
        const data = await response.json()
        setSubscriber(data)
      } catch (error) {
        console.error('Error fetching subscriber:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriber()
  }, [params.id])

  const handleSubmit = async (data: SubscriberFormData) => {
    try {
      const response = await fetch(`/api/subscribers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update subscriber')
      }

      router.push(`/webapp/subscriber/${params.id}`)
    } catch (error: any) {
      throw error
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!subscriber) {
    return (
      <div className="p-8">
        <div className="text-center text-red-500">Subscriber not found</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Subscriber</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <SubscriberForm
          subscriber={subscriber}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/webapp/subscriber/${params.id}`)}
        />
      </div>
    </div>
  )
}

