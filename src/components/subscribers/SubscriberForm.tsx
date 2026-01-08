'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { subscriberSchema, type SubscriberFormData } from '@/utils/validation'
import type { Subscriber } from '@/types/database'

interface SubscriberFormProps {
  subscriber?: Subscriber
  onSubmit: (data: SubscriberFormData) => Promise<void>
  onCancel?: () => void
}

export function SubscriberForm({ subscriber, onSubmit, onCancel }: SubscriberFormProps) {
  const [formData, setFormData] = useState<SubscriberFormData>({
    first_name: '',
    last_name: '',
    subscriber_id: null,
    mobile: '',
    email: null,
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    number_of_copies: 1,
    subscription_start_date: '',
    subscription_end_date: '',
    status: 'active',
    bulk: false,
    samiti: null,
    delivery_method: 'registered',
    payment_method: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (subscriber) {
      setFormData({
        first_name: subscriber.first_name,
        last_name: subscriber.last_name,
        subscriber_id: subscriber.subscriber_id,
        mobile: subscriber.mobile,
        email: subscriber.email,
        address: subscriber.address,
        city: subscriber.city,
        district: subscriber.district,
        state: subscriber.state,
        pincode: subscriber.pincode,
        number_of_copies: subscriber.number_of_copies,
        subscription_start_date: subscriber.subscription_start_date,
        subscription_end_date: subscriber.subscription_end_date,
        status: subscriber.status,
        bulk: subscriber.bulk,
        samiti: subscriber.samiti,
        delivery_method: subscriber.delivery_method,
        payment_method: subscriber.payment_method,
      })
    }
  }, [subscriber])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? parseInt(value) || 0
          : value === ''
          ? null
          : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const validated = subscriberSchema.parse(formData)
      await onSubmit(validated)
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setErrors({ submit: error.message || 'Failed to save subscriber' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
          required
        />
        <Input
          label="Last Name *"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.last_name}
          required
        />
        <Input
          label="Subscriber ID"
          name="subscriber_id"
          value={formData.subscriber_id || ''}
          onChange={handleChange}
          error={errors.subscriber_id}
        />
        <Input
          label="Mobile *"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          error={errors.email}
        />
        <div className="md:col-span-2">
          <Input
            label="Address *"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />
        </div>
        <Input
          label="City *"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          required
        />
        <Input
          label="District *"
          name="district"
          value={formData.district}
          onChange={handleChange}
          error={errors.district}
          required
        />
        <Input
          label="State *"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
          required
        />
        <Input
          label="Pincode *"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          error={errors.pincode}
          required
        />
        <Input
          label="Number of Copies *"
          name="number_of_copies"
          type="number"
          min="1"
          value={formData.number_of_copies}
          onChange={handleChange}
          error={errors.number_of_copies}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <Input
          label="Subscription Start Date *"
          name="subscription_start_date"
          type="date"
          value={formData.subscription_start_date}
          onChange={handleChange}
          error={errors.subscription_start_date}
          required
        />
        <Input
          label="Subscription End Date *"
          name="subscription_end_date"
          type="date"
          value={formData.subscription_end_date}
          onChange={handleChange}
          error={errors.subscription_end_date}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Method *
          </label>
          <select
            name="delivery_method"
            value={formData.delivery_method}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="registered">Registered</option>
            <option value="unregistered">Unregistered</option>
          </select>
        </div>
        <Input
          label="Payment Method"
          name="payment_method"
          value={formData.payment_method || ''}
          onChange={handleChange}
          error={errors.payment_method}
        />
        <Input
          label="Samiti"
          name="samiti"
          value={formData.samiti || ''}
          onChange={handleChange}
          error={errors.samiti}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="bulk"
            id="bulk"
            checked={formData.bulk}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="bulk" className="ml-2 block text-sm text-gray-900">
            Bulk
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : subscriber ? 'Update Subscriber' : 'Add Subscriber'}
        </Button>
      </div>
    </form>
  )
}

