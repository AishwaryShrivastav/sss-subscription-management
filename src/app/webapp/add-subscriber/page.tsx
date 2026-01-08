'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubscriberForm } from '@/components/subscribers/SubscriberForm'
import type { SubscriberFormData } from '@/utils/validation'

export default function AddSubscriberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: SubscriberFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create subscriber')
      }

      router.push('/webapp/search')
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Subscriber</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <SubscriberForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

