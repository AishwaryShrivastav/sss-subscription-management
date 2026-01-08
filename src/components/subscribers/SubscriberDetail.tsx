'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { Subscriber, SubscriptionHistory } from '@/types/database'
import { format } from 'date-fns'

interface SubscriberDetailProps {
  subscriber: Subscriber
  subscriptionHistory?: SubscriptionHistory[]
}

export function SubscriberDetail({ subscriber, subscriptionHistory = [] }: SubscriberDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {subscriber.first_name} {subscriber.last_name}
        </h2>
        <Link href={`/webapp/edit-subscriber/${subscriber.id}`}>
          <Button>Edit Subscriber</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Subscriber ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.subscriber_id || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Mobile</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.mobile}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.email || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  subscriber.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : subscriber.status === 'expired'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {subscriber.status}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.address}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">City</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.city}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">District</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.district}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.state}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Pincode</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.pincode}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Details</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Start Date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(subscriber.subscription_start_date), 'MMM dd, yyyy')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">End Date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(subscriber.subscription_end_date), 'MMM dd, yyyy')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Number of Copies</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.number_of_copies}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Delivery Method</dt>
            <dd className="mt-1 text-sm text-gray-900 capitalize">{subscriber.delivery_method}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.payment_method || '-'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Bulk</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.bulk ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Samiti</dt>
            <dd className="mt-1 text-sm text-gray-900">{subscriber.samiti || '-'}</dd>
          </div>
        </dl>
      </div>

      {subscriptionHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Renewal Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Previous End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    New End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptionHistory.map((history) => (
                  <tr key={history.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(history.renewal_date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(history.previous_end_date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(history.new_end_date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.amount_paid ? `₹${history.amount_paid}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.payment_method || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

